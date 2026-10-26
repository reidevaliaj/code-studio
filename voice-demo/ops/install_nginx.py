"""Add only the demo gateway location; preserve all existing voice routes."""

import shutil
import subprocess
from pathlib import Path

path = Path("/etc/nginx/sites-enabled/voice-assistant").resolve()
original = path.read_text()
marker = "    # cod-st isolated browser demo gateway"
if marker not in original:
    backup = Path("/root/codst-demo-backups")
    backup.mkdir(mode=0o700, exist_ok=True)
    target = backup / "nginx-voice-assistant.before"
    if not target.exists():
        shutil.copy2(path, target)
    location = """    # cod-st isolated browser demo gateway
    location ^~ /demo-api/internal/ { return 404; }
    location ^~ /demo-api/ {
        client_max_body_size 8k;
        proxy_pass http://127.0.0.1:8011/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_read_timeout 25s;
        proxy_connect_timeout 3s;
        access_log off;
        add_header Cache-Control "no-store" always;
    }

"""
    if "    location / {" not in original:
        raise RuntimeError("Unexpected nginx configuration")
    path.write_text(original.replace("    location / {", location + "    location / {", 1))
    result = subprocess.run(["nginx", "-t"], check=False)
    if result.returncode:
        path.write_text(original)
        raise RuntimeError("Nginx check failed; original restored")
    subprocess.run(["systemctl", "reload", "nginx"], check=True)
    print("Demo gateway added; existing voice routes preserved.")
else:
    print("Demo gateway already installed.")
