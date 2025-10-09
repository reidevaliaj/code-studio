# Code Studio — Static Website Brief

Goal
- Fast, static Next.js (App Router) site with Tailwind.
- Two languages: English (default, no prefix) and German (`/de` prefix).
- Strong SEO (metadata, sitemap, hreflang, canonical) and clean UX.

Pages
- Home (/)
- More About Us (/about)
- Become Our Partner (/partners)
- Services (/services) + detail pages:
  - /services/ai-agents-automations
  - /services/web-applications
  - /services/wordpress
  - /services/shopify
  - /services/typo3
  - /services/seo-adwords
- Contact Us (/contact)

Internationalization
- Use `next-intl` **provider-only** (no middleware, no next.config i18n).
- EN served at root; DE served under `/de/*` by adding parallel pages in `app/[locale]`.
- All page text loaded from `src/messages/*.json`.
- Add `<link rel="alternate" hreflang="...">` (including x-default) via page metadata.
- Sitemap includes both EN + DE routes.

Design
- Modern, minimal, responsive, accessible (AA contrast).
- Reusable components: Header, Footer, LocaleSwitcher, Section, Button.
- Clear CTAs (“Get a quote”, “Become our partner”, “Contact”).

Rules
- **Static only**: `output: "export"`, no server actions, no runtime fetch.
- Constrain edits to `src/app`, `src/components`, `src/lib`, `src/messages`, `public`, `styles`.
- Always propose file-by-file diffs with a short rationale.
