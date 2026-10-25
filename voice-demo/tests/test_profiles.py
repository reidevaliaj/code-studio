import unittest

from profiles import PROFILES, instructions


class ProfileTests(unittest.TestCase):
    def test_only_three_allowlisted_demo_tenants(self):
        self.assertEqual(set(PROFILES), {"physio", "dental", "general"})
        self.assertEqual(len({x["extension"] for x in PROFILES.values()}), 3)
        for profile in PROFILES.values():
            self.assertTrue(profile["slug"].startswith("demo-"))

    def test_every_profile_has_explicit_demo_and_medical_boundaries(self):
        for key in PROFILES:
            prompt = instructions(key)
            for boundary in [
                "keine echten Termine",
                "keine medizinische Beratung",
                "112",
                "fiktive",
                "Deutsch",
            ]:
                self.assertIn(boundary, prompt)

    def test_customer_tenant_cannot_be_selected(self):
        with self.assertRaises(KeyError):
            instructions("quintact")

    def test_short_named_greetings_and_complete_front_desk_knowledge(self):
        for key, profile in PROFILES.items():
            self.assertLessEqual(len(profile["greeting"].split()), 20)
            self.assertIn(profile["assistant"], profile["greeting"])
            self.assertNotIn("demo", profile["greeting"].lower())
            self.assertGreaterEqual(len(profile["knowledge"]), 8)
            for topic in [
                "Anfahrt",
                "Termine",
                "Unterlagen",
                "Absagen",
                "Kosten",
                "Team",
                "Barrierefreiheit",
            ]:
                self.assertIn(topic, profile["knowledge"])
            self.assertIn("eine Frage", instructions(key))
            self.assertIn("keine echten Termine", instructions(key))


if __name__ == "__main__":
    unittest.main()
