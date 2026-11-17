"""
Write public/sitemap.xml from the site's pages and the property slugs in src/lib/portfolio.ts.

Usage: python3 scripts/generate-sitemap.py   (re-run after adding a page or a property)
"""
import datetime
import re

SITE = "https://brickfieldgroup.co.za"
PAGES = ["/", "/about", "/portfolio", "/sustainability", "/services", "/contact"]

slugs = re.findall(r'^    slug: "([^"]+)"', open("src/lib/portfolio.ts").read(), re.M)
today = datetime.date.today().isoformat()
urls = [(p, "1.0" if p == "/" else "0.8") for p in PAGES] + [(f"/portfolio/{s}", "0.7") for s in slugs]
rows = "\n".join(
    f"  <url>\n    <loc>{SITE}{p}</loc>\n    <lastmod>{today}</lastmod>\n    <priority>{pr}</priority>\n  </url>"
    for p, pr in urls
)
open("public/sitemap.xml", "w").write(
    f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{rows}\n</urlset>\n'
)
print(f"{len(urls)} URLs written to public/sitemap.xml")
