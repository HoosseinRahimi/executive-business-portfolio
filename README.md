# Executive Business Portfolio Template

A premium, reusable static portfolio template for entrepreneurs, traders, investors, executives and business operators.

## Features

- 9 purpose-built pages: Home, About, Business Interests, Companies, Markets, Projects / Deals, Insights, Partnership and Contact
- English + Persian language switcher
- Full RTL support for Persian
- Four built-in themes: Midnight, Ivory, Emerald and Slate
- Shared reusable header/footer components
- Central profile configuration in `assets/config.js`
- Responsive layouts and mobile navigation
- Accessible focus states, skip link and reduced-motion support
- SEO metadata, canonical URLs, Open Graph, Twitter Cards and JSON-LD
- `robots.txt`, `sitemap.xml`, web manifest and favicon
- GitHub Pages deployment workflow
- Optional Google Analytics 4 support through config
- Static contact form that prepares a structured email without requiring a backend

## Quick start

1. Edit `assets/config.js`.
2. Replace placeholder claims in the nine HTML pages with verified information.
3. Update the `baseUrl` / `website` values if you use another domain or repository.
4. Replace the default hero/social image URLs if desired.
5. Push to `main`.

## GitHub Pages

A workflow is included at `.github/workflows/pages.yml` and deploys the repository root as a static site.

If Pages has not been enabled for the repository yet, open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions** once. After that, pushes to `main` deploy automatically.

## Central configuration

```js
window.BUSINESS_TEMPLATE = {
  ownerName: "Your Name",
  initials: "YN",
  role: { en: "Entrepreneur & Investor", fa: "کارآفرین و سرمایه‌گذار" },
  email: "hello@example.com",
  linkedin: "#",
  whatsapp: "#",
  baseUrl: "https://example.com/",
  defaultLanguage: "en",
  defaultTheme: "midnight"
};
```

## Themes

Theme tokens live in `assets/styles.css` under:

- `html[data-theme="midnight"]`
- `html[data-theme="ivory"]`
- `html[data-theme="emerald"]`
- `html[data-theme="slate"]`

## Translation

All shared and page content translations live in `assets/i18n.js`. Add another top-level language object and expose it in the language UI if you want more languages.

## Contact form

The included form is deliberately backend-free and creates a `mailto:` draft. For production lead capture, connect the form to your own endpoint or a form service.

## Content rule

Do not publish placeholder claims as facts. Company relationships, market activity, investment history, deal outcomes and titles should be accurate and publishable.
