# Businessman / Entrepreneur Portfolio Template

A reusable multi-page website template for traders, entrepreneurs, investors, business operators and executives. It is intentionally generic and contains no personal business claims.

## Pages

- Home
- About
- Business Interests
- Companies
- Markets
- Projects / Deals
- Insights
- Partnership
- Contact

## Stack

- Semantic HTML5
- Modern responsive CSS
- Vanilla JavaScript
- No framework
- No build step
- GitHub Pages friendly

## Customize first

Edit `assets/config.js`:

```js
window.BUSINESS_TEMPLATE = {
  ownerName: "Your Name",
  initials: "YN",
  email: "hello@example.com",
  linkedin: "#",
  whatsapp: "#"
};
```

Then replace the sample copy and placeholders in each page with verified information.

## Theme

The design tokens are at the top of `assets/styles.css` under `:root`. Change `--accent`, background, text and spacing variables to rebrand the whole site.

## Local preview

```bash
python -m http.server 8080
```

Open `http://localhost:8080`.

## Content rule

Do not turn placeholders into claims unless they are accurate and publishable. Company relationships, market presence and deals should be described precisely.
