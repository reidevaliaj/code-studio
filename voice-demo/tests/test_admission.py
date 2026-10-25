import concurrent.futures
import tempfile
import unittest
from pathlib import Path

from admission import Admission, Denied


class AdmissionTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.now = 1000.0
        self.store = Admission(Path(self.tmp.name) / "queue.db", clock=lambda: self.now)

    def tearDown(self):
        self.tmp.cleanup()

    def join(self, client, profile="physio"):
        return self.store.join(client, "ip-" + client, profile)

    def test_shared_limit_and_fifo_across_profiles(self):
        a, b, c = self.join("a"), self.join("b", "dental"), self.join("c", "general")
        self.assertEqual([a["state"], b["state"], c["state"]], ["reserved", "reserved", "waiting"])
        self.assertEqual(c["position"], 1)
        self.store.cancel("a")
        self.assertEqual(self.store.status("c")["state"], "reserved")

    def test_parallel_requests_never_admit_more_than_two(self):
        with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
            result = list(pool.map(lambda i: self.join(str(i)), range(10)))
        self.assertEqual(sum(x["state"] == "reserved" for x in result), 2)

    def test_duplicate_join_is_idempotent(self):
        first = self.join("a")
        second = self.join("a")
        self.assertEqual(first["id"], second["id"])
        self.assertEqual(self.store.count_active(), 1)

    def test_reservations_expire_even_with_status_polling(self):
        self.join("a")
        self.join("b")
        self.join("c")
        self.now += 20
        self.store.status("a")
        self.store.status("c")
        self.now += 11
        self.assertEqual(self.store.status("a")["state"], "ended")
        self.assertEqual(self.store.status("c")["state"], "reserved")

    def test_abandoned_queue_entry_does_not_block(self):
        self.join("a")
        self.join("b")
        self.join("c")
        self.now += 46
        self.assertEqual(self.store.status("c")["state"], "ended")

    def test_connect_requires_ownership_and_reservation(self):
        self.join("a")
        self.join("b")
        self.join("c")
        with self.assertRaises(Denied):
            self.store.connect("c")
        with self.assertRaises(Denied):
            self.store.connect("unknown")
        result = self.store.connect("a")
        self.assertTrue(result["room"].startswith("codst-demo-"))
        self.assertEqual(result["state"], "connecting")

    def test_connected_calls_hold_slot_until_room_cleanup(self):
        self.join("a")
        self.join("b")
        self.join("c")
        a = self.store.connect("a")
        self.store.cancel("a")
        self.assertEqual(self.store.status("c")["state"], "waiting")
        self.store.finish_cleanup(a["id"])
        self.assertEqual(self.store.status("c")["state"], "reserved")

    def test_worker_claim_rejects_forged_room_or_session(self):
        a = self.join("a")
        a = self.store.connect("a")
        with self.assertRaises(Denied):
            self.store.claim(a["id"], "other-room")
        with self.assertRaises(Denied):
            self.store.claim("missing", a["room"])
        self.assertEqual(self.store.claim(a["id"], a["room"])["profile"], "physio")
        with self.assertRaises(Denied):
            self.store.claim(a["id"], a["room"])

    def test_duration_is_enforced_despite_heartbeats(self):
        self.join("a")
        a = self.store.connect("a")
        self.store.claim(a["id"], a["room"])
        for _ in range(6):
            self.now += 29
            self.store.status("a")
            self.store.worker_ping(a["id"])
        self.now += 7
        self.assertEqual(self.store.status("a")["state"], "closing")

    def test_worker_crash_expires_call(self):
        self.join("a")
        a = self.store.connect("a")
        self.store.claim(a["id"], a["room"])
        self.now += 36
        self.assertEqual(self.store.status("a")["state"], "closing")

    def test_repeated_worker_shutdown_does_not_reopen_a_cleaned_session(self):
        self.join("a")
        a = self.store.connect("a")
        self.store.end_by_id(a["id"])
        self.store.finish_cleanup(a["id"])
        self.store.end_by_id(a["id"])
        self.assertEqual(self.store.count_active(), 0)

    def test_cancel_during_room_creation_holds_slot_until_provisioning_finishes(self):
        self.join("a")
        row = self.store.connect("a")
        self.store.cancel("a", row["id"], "close_button")
        self.assertEqual(self.store.cleanup_rooms(), [])
        self.assertEqual(self.store.count_active(), 1)
        self.store.room_ready(row["id"])
        self.assertEqual(len(self.store.cleanup_rooms()), 1)
        self.store.finish_cleanup(row["id"])
        self.assertEqual(self.store.count_active(), 0)

    def test_late_cancel_for_old_lease_cannot_end_a_new_call(self):
        old = self.join("a")
        self.store.cancel("a", old["id"], "close_button")
        new = self.join("a")
        self.assertNotEqual(old["id"], new["id"])
        self.store.cancel("a", old["id"], "close_button")
        self.assertEqual(self.store.status("a")["id"], new["id"])
        self.assertEqual(self.store.status("a")["state"], "reserved")

    def test_invalid_profile_and_queue_flood_rejected(self):
        with self.assertRaises(Denied):
            self.join("a", "codestudio")
        for i in range(6):
            self.store.join("x" + str(i), "same-ip", "physio")
        with self.assertRaises(Denied):
            self.store.join("x7", "same-ip", "physio")


if __name__ == "__main__":
    unittest.main()
