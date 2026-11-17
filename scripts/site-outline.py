"""
Outline the part of a photo we own and dim everything around it.

Usage: python3 scripts/site-outline.py
Reads SITES below (polygon points as percentages of the photo's width and height) and writes
<name>-site.webp next to each source photo. Adjust a polygon and re-run to move the outline.
"""
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import os

PHOTOS = "src/assets/photos"
GOLD = (214, 176, 96)

SITES = {
    # 9 Loop Street, Maitland
    "loop-aerial.webp": [(27, 50), (70, 23.5), (79, 27.5), (83, 31), (74, 60), (61, 87), (50, 79), (28, 63)],
    "loop-before-aerial.jpg": [(29, 53), (70, 24.5), (75, 26.5), (79, 36), (70, 60), (61, 84), (50, 76), (29, 68)],
    "loop-aerial-angle.webp": [(25, 33), (30, 21), (48, 21), (92, 62), (91, 74), (69, 97), (48, 98), (40, 80), (26, 42)],
    "loop-top-down.webp": [(22, 35), (94, 35), (94, 80), (22, 80)],
}


def outline(name: str, pts: list[tuple[float, float]]) -> str:
    im = Image.open(os.path.join(PHOTOS, name)).convert("RGB")
    if im.width > 1800:
        im = im.resize((1800, round(1800 * im.height / im.width)), Image.LANCZOS)
    w, h = im.size
    poly = [(x * w / 100, y * h / 100) for x, y in pts]
    # Surroundings: darker and quieter, so the eye goes to the site.
    around = ImageEnhance.Color(im).enhance(0.45)
    around = ImageEnhance.Brightness(around).enhance(0.58)
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).polygon(poly, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(1.2))
    out = Image.composite(im, around, mask)
    # A soft glow, then a crisp gold line on the boundary.
    lw = max(3, round(w / 450))
    glow = Image.new("L", (w, h), 0)
    ImageDraw.Draw(glow).line(poly + [poly[0]], fill=255, width=lw * 4, joint="curve")
    glow = glow.filter(ImageFilter.GaussianBlur(lw * 2)).point(lambda v: int(v * 0.45))
    out = Image.composite(Image.new("RGB", (w, h), GOLD), out, glow)
    ImageDraw.Draw(out).line(poly + [poly[0]], fill=GOLD, width=lw, joint="curve")
    base, _ = os.path.splitext(name)
    dest = os.path.join(PHOTOS, f"{base}-site.webp")
    out.save(dest, quality=82, method=6)
    return dest


if __name__ == "__main__":
    for n, p in SITES.items():
        print(outline(n, p))
