#!/usr/bin/python3
"""Acquire a shared demo slot before connecting an internal Asterisk caller."""

import json
import sys
import urllib.request
from pathlib import Path

env = {}
for line in sys.stdin:
    if not line.strip():
        break
    if ":" in line:
        key, value = line.split(":", 1)
        env[key] = value.strip()


def setvar(key, value):
    print(f'SET VARIABLE {key} "{value}"', flush=True)
    sys.stdin.readline()


try:
    key = Path("/etc/asterisk/codst-demo.key").read_text().strip()
    profile = {"2101": "physio", "2102": "dental", "2103": "general"}[env["agi_extension"]]
    payload = json.dumps({"profile": profile, "unique": env["agi_uniqueid"]}).encode()
    request = urllib.request.Request(
        "http://127.0.0.1:8011/internal/sip-admit",
        data=payload,
        headers={"Authorization": "Bearer " + key, "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(request, timeout=5) as response:
        result = json.load(response)
    setvar("DEMO_SESSION", result["id"])
    setvar(
        "DEMO_TENANT",
        {"physio": "demo-physio-de", "dental": "demo-dental-de", "general": "demo-general-de"}[
            profile
        ],
    )
except (OSError, KeyError, ValueError):
    setvar("DEMO_SESSION", "")
