"""Install demo extensions without modifying existing tenant routes or credentials."""

import grp
import json
import os
import shutil
import subprocess
from pathlib import Path

from dotenv import dotenv_values

BASE = Path("/home/rei/apps/codst-demo")
RELEASE = BASE / "releases/20261025-v1"
BACKUP = Path("/root/codst-demo-backups")
BACKUP.mkdir(mode=0o700, exist_ok=True)
data = json.loads((BASE / "sip-config.json").read_text())
env = dotenv_values(BASE / "shared.env")
sip_host = "4xqezis1h25.sip.livekit.cloud"

for filename in ("pjsip_custom.conf", "extensions_custom.conf"):
    path = Path("/etc/asterisk") / filename
    target = BACKUP / (filename + ".before")
    if not target.exists():
        shutil.copy2(path, target)
        os.chmod(target, 0o600)

path = Path("/etc/asterisk/pjsip_custom.conf")
text = path.read_text()
if "[codst-demo-trunk]" not in text:
    text += f"""

; cod-st isolated demo trunk; no public telephone numbers
[codst-demo-trunk]
type=endpoint
transport=transport-udp
context=codst-internal
disallow=all
allow=ulaw,alaw
direct_media=no
outbound_auth=codst-demo-auth
aors=codst-demo-aor
from_domain={sip_host}

[codst-demo-auth]
type=auth
auth_type=userpass
username={data["username"]}
password={data["password"]}

[codst-demo-aor]
type=aor
contact=sip:{sip_host}
qualify_frequency=60
"""
    path.write_text(text)
os.chown(path, 0, grp.getgrnam("asterisk").gr_gid)
os.chmod(path, 0o640)
path = Path("/etc/asterisk/extensions_custom.conf")
text = path.read_text()
if "; cod-st public demo extensions" not in text:
    if any(f"exten => {ext}," in text for ext in ("2101", "2102", "2103")):
        raise RuntimeError("Demo extension conflict")
    block = "\n; cod-st public demo extensions (internal only)\n"
    for ext in ("2101", "2102", "2103"):
        block += f"""exten => {ext},1,NoOp(cod-st isolated demo {ext})
 same => n,AGI(/var/lib/asterisk/agi-bin/codst-demo.py)
 same => n,GotoIf($["${{DEMO_SESSION}}" = ""]?busy)
 same => n,Dial(PJSIP/{ext}@codst-demo-trunk,35,b(codst-demo-headers^s^1(${{DEMO_SESSION}},${{DEMO_TENANT}})))
 same => n,Hangup()
 same => n(busy),Busy(3)
 same => n,Hangup()

"""
    marker = "[codst-livekit-headers]"
    if marker not in text:
        raise RuntimeError("Unexpected dialplan structure")
    text = text.replace(marker, block + marker, 1)
    text += """

[codst-demo-headers]
exten => s,1,Set(PJSIP_HEADER(add,X-Demo-Session)=${ARG1})
 same => n,Set(PJSIP_HEADER(add,X-Tenant-Slug)=${ARG2})
 same => n,Return()
"""
    path.write_text(text)
text = path.read_text()
if "AGI(codst-demo.py)" in text:
    path.write_text(
        text.replace("AGI(codst-demo.py)", "AGI(/var/lib/asterisk/agi-bin/codst-demo.py)")
    )
key = Path("/etc/asterisk/codst-demo.key")
key.write_text(env["DEMO_WORKER_KEY"] + "\n")
os.chown(key, 0, grp.getgrnam("asterisk").gr_gid)
os.chmod(key, 0o640)
agi = Path("/var/lib/asterisk/agi-bin/codst-demo.py")
agi.parent.mkdir(parents=True, exist_ok=True)
shutil.copy2(RELEASE / "ops/asterisk_agi.py", agi)
os.chown(agi, 0, 0)
os.chmod(agi, 0o755)
subprocess.run(["asterisk", "-rx", "pjsip reload"], check=True)
subprocess.run(["asterisk", "-rx", "dialplan reload"], check=True)
print(
    "Internal demo extensions 2101, 2102, 2103 installed; shared two-call admission enforced before SIP dialing."
)
