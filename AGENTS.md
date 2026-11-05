<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep shared site navigation and footer in the root route using the site-shell module so every public page has consistent navigation.
- Use the shared CaseStudy component for property detail pages so project narratives and enquiry links remain consistent.
- Contact enquiries go through the EnquiryForm and the submitEnquiry server function in src/lib/enquiry.ts. Delivery is mocked until Resend or Plunk is wired up; keep ENQUIRY_DELIVERY_LIVE false (the form then tells visitors to email directly) until it really sends.
- Property content lives in src/lib/portfolio.ts and every image slot in src/lib/media.ts; property pages render through CaseStudy at /portfolio/$slug.
- The first-visit loading screen lives in src/components/site-loader.tsx; EditorialMotion waits for its bf:loaded event before page motion starts.
- Enhance page motion through EditorialMotion at the root using IntersectionObserver and the Web Animations API; keep content visible by default and skip motion for reduced-motion preferences.
- The Brickfield Group wordmark is outlined SVG (src/components/wordmark-paths.ts, rendered by Wordmark): Caviar Dreams Regular at +18.5% tracking and Inter Regular at -8%, sharing one cap height. Don't serve the Caviar Dreams font file; its licence forbids redistributing the font data. The B monograms in the concepts deck are not approved yet. The favicon and app icons (public/favicon.svg, favicon.ico, apple-touch-icon.png, icon-*.png) use the provisional doorway mark (rectangular door swung open, from the 32px Figma drawing; the opening is left unfilled). favicon.svg inverts under prefers-color-scheme: dark so it stays visible on dark tabs. Swap these when a mark is approved. Every logo renders through BrandLockup (src/components/brand-lockup.tsx): the wordmark alone or with the provisional doorway mark, a rectangular or arched door, an open or gold-lit doorway, and an ink, gold-mark or all-gold tone. Ink is #3A3A3C on light backgrounds and #F8F4EC on dark; gold is #D6B060. Which lockup the header, footer and footer watermark use is set in LOGOS in src/lib/brand.ts and rendered by HeaderLogo, FooterLogo and FooterWatermark (src/components/brand-logos.tsx). The dev-only Logo panel (src/components/lockup-switcher.tsx; shown in `vite dev`, or after `?lockups=1`, hidden again with `?lockups=0`) overrides each slot for review, and its Copy config button copies the picks in the LOGOS format. Delete the panel once the logos are final.
- Text over photos must use Legible/LegibleScrim (src/components/legible.tsx), which samples the photo and picks a scrim that meets WCAG AA. Never put gold text on photos; gold text is only allowed on charcoal (CI guide).
- Page heroes are HeroSlideshow (pass `slides` to PageHero); a shot with a `video` field plays it muted and looped. Photo blur previews live in src/lib/media-lqip.ts; regenerate with `python3 scripts/generate-lqip.py` after adding photos.
