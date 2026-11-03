"""Regenerate src/lib/media-lqip.ts: tiny blurred previews for every photo in src/assets.
Run: python3 scripts/generate-lqip.py"""
import glob, os, base64, io, json
from PIL import Image
out = {}
for f in sorted(glob.glob("src/assets/photos/*.webp") + glob.glob("src/assets/stand-in/*.webp")):
    im = Image.open(f).convert("RGB"); im.thumbnail((20, 20), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, "WEBP", quality=40)
    out[os.path.basename(f)[:-5]] = "data:image/webp;base64," + base64.b64encode(b.getvalue()).decode()
open("src/lib/media-lqip.ts", "w").write(
    "/* Generated: ~20px blurred previews shown while each photo loads. Regenerate when photos change. */\n"
    "export const LQIP: Record<string, string> = " + json.dumps(out, indent=2) + ";\n")
print(len(out), "previews")
