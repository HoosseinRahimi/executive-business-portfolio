# Template Customization Checklist

## 1. Identity

Edit `assets/config.js`:
- owner name and initials
- role in English and Persian
- location
- email and phone
- LinkedIn / WhatsApp
- website and base URL
- hero image and social image
- default theme and language

## 2. Brand

Edit the four theme blocks at the top of `assets/styles.css`. Keep semantic tokens such as `--bg`, `--text`, `--accent` and `--line` so every component updates consistently.

## 3. Content

Replace placeholders in:
- `about/index.html`
- `business-interests/index.html`
- `companies/index.html`
- `markets/index.html`
- `projects/index.html`
- `insights/index.html`
- `partnership/index.html`
- `contact/index.html`

Then update equivalent English/Persian strings in `assets/i18n.js`.

## 4. SEO

Update `baseUrl` in `assets/config.js`, canonical URLs in HTML, `robots.txt` and `sitemap.xml` if the deployment URL changes.

For best social sharing support, use a permanent 1200×630 PNG/JPG URL for `socialImage`.

## 5. Publishing

The included GitHub Pages workflow deploys every push to `main`. The repository may require a one-time Pages source selection in GitHub Settings.
