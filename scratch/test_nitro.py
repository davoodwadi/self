"""Stream one chat request through OpenRouter the way Copilot BYOK does, and time the gaps.

Usage:
  OPENROUTER_API_KEY=sk-or-... python3 scratch/test_nitro.py             # nitro (default)
  OPENROUTER_API_KEY=sk-or-... python3 scratch/test_nitro.py --regular   # regular routing
  Options: --model google/gemini-4-argon  --prompt "..."  --idle-limit 30
"""

import argparse
import json
import os
import sys
import time
import urllib.request

parser = argparse.ArgumentParser(description="Time an OpenRouter stream the way Copilot BYOK sees it.")
parser.add_argument("--regular", action="store_true", help="test regular routing instead of :nitro")
parser.add_argument("--model", default="google/gemini-4-argon", help="base model id, without :nitro")
parser.add_argument("--prompt", default=(
    "Think carefully, then explain in about 200 words why the sky is blue at noon and red at sunset."
))
parser.add_argument("--idle-limit", type=float, default=30,
                    help="seconds of silence assumed to trip Copilot's idle timeout")
args = parser.parse_args()

base = args.model.removesuffix(":nitro")
MODEL = base if args.regular else f"{base}:nitro"
PROMPT = args.prompt
IDLE_LIMIT = args.idle_limit

key = os.environ.get("OPENROUTER_API_KEY")
if not key:
    sys.exit("Set OPENROUTER_API_KEY first.")

body = json.dumps({
    "model": MODEL,
    "stream": True,
    "messages": [{"role": "user", "content": PROMPT}],
}).encode()

req = urllib.request.Request(
    "https://openrouter.ai/api/v1/chat/completions",
    data=body,
    headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
)

start = time.monotonic()
last_data = start
first_data = None
max_gap = 0.0
comments = data_events = 0
provider = None
text = []

print(f"Model: {MODEL}\n")
try:
    resp = urllib.request.urlopen(req, timeout=300)
except urllib.error.HTTPError as e:
    sys.exit(f"HTTP {e.code}: {e.read().decode(errors='replace')}")

print(f"[{time.monotonic() - start:6.2f}s] headers received (HTTP {resp.status})")

for raw in resp:
    now = time.monotonic()
    line = raw.decode(errors="replace").rstrip("\n")
    if not line:
        continue
    if line.startswith(":"):
        comments += 1
        print(f"[{now - start:6.2f}s] comment: {line}  (silent for {now - last_data:.1f}s)")
        continue
    if not line.startswith("data: "):
        continue
    payload = line[6:]
    if payload == "[DONE]":
        break

    gap = now - last_data
    max_gap = max(max_gap, gap)
    last_data = now
    data_events += 1
    if first_data is None:
        first_data = now - start
        print(f"[{first_data:6.2f}s] first data chunk")

    chunk = json.loads(payload)
    if "error" in chunk:
        print(f"[{now - start:6.2f}s] ERROR in stream: {chunk['error']}")
        break
    provider = chunk.get("provider", provider)
    for choice in chunk.get("choices", []):
        piece = (choice.get("delta") or {}).get("content") or ""
        text.append(piece)
    if gap > 5:
        print(f"[{now - start:6.2f}s] data after {gap:.1f}s silence")

total = time.monotonic() - start
print("\n--- reply ---")
print("".join(text).strip() or "(no text)")
print("\n--- timing ---")
print(f"provider:            {provider}")
print(f"first data chunk:    {first_data:.2f}s" if first_data else "first data chunk:    never")
print(f"longest data gap:    {max_gap:.2f}s")
print(f"comment pings:       {comments}")
print(f"data events:         {data_events}")
print(f"total:               {total:.2f}s")
verdict = "OK" if max_gap < IDLE_LIMIT else "WOULD LIKELY TIME OUT"
print(f"vs {IDLE_LIMIT:g}s idle limit:  {verdict}")
