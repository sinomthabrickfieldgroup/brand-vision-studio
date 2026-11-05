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
- The Brickfield Group wordmark is outlined SVG (src/components/wordmark-paths.ts, rendered by Wordmark): Caviar Dreams Regular at +18.5% tracking and Inter Regular at -8%, sharing one cap height. Don't serve the Caviar Dreams font file; its licence forbids redistributing the font data. The B monograms in the concepts deck are not approved yet. The favicon and app icons (public/favicon.svg, favicon.ico, apple-touch-icon.png, icon-*.png) use the provisional BG flow-lines mark (small-size cut: solid ribbon, two stripes, gold thread on icons ≥180px). favicon.svg flips to a paper tile under prefers-color-scheme: dark. Swap these when a mark is approved.
- Text over photos must use Legible/LegibleScrim (src/components/legible.tsx), which samples the photo and picks a scrim that meets WCAG AA. Never put gold text on photos; gold text is only allowed on charcoal (CI guide).
- Page heroes are HeroSlideshow (pass `slides` to PageHero); a shot with a `video` field plays it muted and looped. Photo blur previews live in src/lib/media-lqip.ts; regenerate with `python3 scripts/generate-lqip.py` after adding photos.
