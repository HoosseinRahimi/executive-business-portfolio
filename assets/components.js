window.TemplateComponents = (() => {
  const navItems = [
    ["home", "", "ui.nav.home"],
    ["about", "about/", "ui.nav.about"],
    ["interests", "business-interests/", "ui.nav.interests"],
    ["companies", "companies/", "ui.nav.companies"],
    ["markets", "markets/", "ui.nav.markets"],
    ["projects", "projects/", "ui.nav.projects"],
    ["insights", "insights/", "ui.nav.insights"],
    ["partnership", "partnership/", "ui.nav.partnership"],
    ["contact", "contact/", "ui.nav.contact"]
  ];

  const themes = [
    ["midnight", "Midnight"],
    ["ivory", "Ivory"],
    ["emerald", "Emerald"],
    ["slate", "Slate"]
  ];

  function header({ root, t, active, lang, theme, config }) {
    const nav = navItems.map(([key, path, labelKey]) => {
      const current = active === key ? ' aria-current="page"' : "";
      const cls = key === "contact" ? ' class="nav-cta"' : "";
      return `<a${cls}${current} href="${root}${path}">${t(labelKey)}</a>`;
    }).join("");

    const themeOptions = themes.map(([value, label]) => `<option value="${value}"${theme === value ? " selected" : ""}>${label}</option>`).join("");

    return `
      <header class="site-header">
        <div class="container nav-wrap">
          <a class="brand" href="${root}" aria-label="${config.ownerName}">
            <span class="brand-mark" data-initials>${config.initials}</span>
            <span class="brand-copy"><strong data-owner>${config.ownerName}</strong><small data-role></small></span>
          </a>
          <button class="menu-btn" data-menu aria-expanded="false" aria-label="${t("ui.openMenu")}"><span></span><span></span></button>
          <nav class="nav" data-nav aria-label="Primary navigation">${nav}</nav>
          <div class="utility-nav">
            <div class="lang-switch" aria-label="${t("ui.language")}">
              <button type="button" data-lang="en" class="${lang === "en" ? "active" : ""}">EN</button>
              <button type="button" data-lang="fa" class="${lang === "fa" ? "active" : ""}">فا</button>
            </div>
            <label class="theme-control"><span class="sr-only">${t("ui.theme")}</span><select data-theme-select aria-label="${t("ui.theme")}">${themeOptions}</select></label>
          </div>
        </div>
      </header>`;
  }

  function footer({ root, t, config }) {
    return `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <p class="footer-title" data-owner>${config.ownerName}</p>
            <p class="footer-note">${t("ui.footer")} • © <span data-year></span></p>
          </div>
          <div class="footer-links">
            <a href="${root}about/">${t("ui.nav.about")}</a>
            <a href="${root}insights/">${t("ui.nav.insights")}</a>
            <a href="${root}partnership/">${t("ui.nav.partnership")}</a>
            <a href="${root}contact/">${t("ui.nav.contact")}</a>
          </div>
        </div>
      </footer>`;
  }

  return { header, footer };
})();
