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
- Contact enquiries use explicit mailto and telephone links, not a simulated submission form, because no message delivery service is connected.
- Enhance page motion through EditorialMotion at the root using IntersectionObserver and the Web Animations API; keep content visible by default and skip motion for reduced-motion preferences.
