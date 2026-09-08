(() => {
  const config = window.BUSINESS_TEMPLATE || {};
  const dictionaries = window.BUSINESS_I18N || {};
  const components = window.TemplateComponents;
  const page = document.body.dataset.page || "home";
  const root = document.body.dataset.root || "./";
  const routes = {
    home: "",
    about: "about/",
    interests: "business-interests/",
    companies: "companies/",
    markets: "markets/",
    projects: "projects/",
    insights: "insights/",
    partnership: "partnership/",
    contact: "contact/"
  };

  let language = localStorage.getItem("business-template-language") || config.defaultLanguage || "en";
  let theme = localStorage.getItem("business-template-theme") || config.defaultTheme || "midnight";

  const get = (object, path) => path.split(".").reduce((value, key) => value && value[key], object);
  const t = (key) => get(dictionaries[language] || dictionaries.en || {}, key) ?? get(dictionaries.en || {}, key) ?? key;

  function applyTheme(nextTheme) {
    theme = nextTheme || "midnight";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("business-template-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    const colors = { midnight: "#0b0d10", ivory: "#f2eee5", emerald: "#07130f", slate: "#111821" };
    if (meta) meta.setAttribute("content", colors[theme] || colors.midnight);
  }

  function applyLanguage(nextLanguage) {
    language = dictionaries[nextLanguage] ? nextLanguage : "en";
    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
    localStorage.setItem("business-template-language", language);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.placeholder = t(element.dataset.i18nPlaceholder);
    });
    document.querySelectorAll("[data-role]").forEach((element) => {
      element.textContent = (config.role && (config.role[language] || config.role.en)) || "";
    });
    document.querySelectorAll("[data-location]").forEach((element) => {
      element.textContent = (config.location && (config.location[language] || config.location.en)) || "";
    });
    renderShell();
    hydrateProfile();
    updateSeo();
  }

  function renderShell() {
    if (!components) return;
    const headerHost = document.getElementById("site-header");
    const footerHost = document.getElementById("site-footer");
    if (headerHost) headerHost.innerHTML = components.header({ root, t, active: page, lang: language, theme, config });
    if (footerHost) footerHost.innerHTML = components.footer({ root, t, config });
    bindShellEvents();
  }

  function bindShellEvents() {
    const menuButton = document.querySelector("[data-menu]");
    const nav = document.querySelector("[data-nav]");
    if (menuButton && nav) {
      menuButton.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        menuButton.classList.toggle("open", open);
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute("aria-label", t(open ? "ui.closeMenu" : "ui.openMenu"));
      });
    }

    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.addEventListener("click", () => applyLanguage(button.dataset.lang));
    });

    const themeSelect = document.querySelector("[data-theme-select]");
    if (themeSelect) themeSelect.addEventListener("change", (event) => applyTheme(event.target.value));
  }

  function hydrateProfile() {
    document.querySelectorAll("[data-owner]").forEach((element) => element.textContent = config.ownerName || "Your Name");
    document.querySelectorAll("[data-initials]").forEach((element) => element.textContent = config.initials || "YN");
    document.querySelectorAll("[data-year]").forEach((element) => element.textContent = new Date().getFullYear());
    document.querySelectorAll("[data-email]").forEach((element) => {
      element.textContent = config.email || "hello@example.com";
      if (element.tagName === "A") element.href = `mailto:${config.email || "hello@example.com"}`;
    });
    document.querySelectorAll("[data-phone]").forEach((element) => {
      element.textContent = config.phone || "";
      if (element.tagName === "A") element.href = `tel:${(config.phone || "").replace(/\s+/g, "")}`;
    });
    document.querySelectorAll("[data-linkedin]").forEach((element) => element.href = config.linkedin || "#");
    document.querySelectorAll("[data-whatsapp]").forEach((element) => element.href = config.whatsapp || "#");
    document.querySelectorAll("[data-role]").forEach((element) => element.textContent = (config.role && (config.role[language] || config.role.en)) || "");
    document.querySelectorAll("[data-location]").forEach((element) => element.textContent = (config.location && (config.location[language] || config.location.en)) || "");
    document.querySelectorAll("[data-hero-image]").forEach((image) => {
      if (config.heroImage) image.src = config.heroImage;
      image.alt = "";
    });
  }

  function updateSeo() {
    const titleKey = `seo.${page}Title`;
    const descriptionKey = `seo.${page}Description`;
    const title = `${t(titleKey)} | ${config.ownerName || "Your Name"}`;
    const description = t(descriptionKey);
    document.title = title;

    const setMeta = (selector, value, attr = "content") => {
      const element = document.querySelector(selector);
      if (element && value) element.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[property="og:image"]', config.socialImage);
    setMeta('meta[name="twitter:image"]', config.socialImage);

    const base = (config.baseUrl || "").replace(/\/?$/, "/");
    const canonicalUrl = base ? `${base}${routes[page] || ""}` : window.location.href;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = canonicalUrl;
    setMeta('meta[property="og:url"]', canonicalUrl);

    const schemaHost = document.getElementById("structured-data");
    if (schemaHost) {
      schemaHost.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": config.schemaType || "Person",
        name: config.ownerName || "Your Name",
        url: config.website || config.baseUrl || canonicalUrl,
        email: config.email ? `mailto:${config.email}` : undefined,
        jobTitle: config.role && (config.role.en || config.role[language]),
        sameAs: [config.linkedin].filter((value) => value && value !== "#")
      });
    }
  }

  function setupReveal() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  }

  function setupContactForm() {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = `${data.get("subject") || "Business enquiry"} — ${data.get("name") || "Website contact"}`;
      const body = [
        `Name: ${data.get("name") || ""}`,
        `Email: ${data.get("email") || ""}`,
        `Company: ${data.get("company") || ""}`,
        "",
        data.get("message") || ""
      ].join("\n");
      window.location.href = `mailto:${encodeURIComponent(config.email || "hello@example.com")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const status = form.querySelector("[data-form-status]");
      if (status) status.textContent = t("contact.success");
    });
  }

  function setupAnalytics() {
    if (!config.analyticsId || !config.analyticsId.startsWith("G-")) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.analyticsId}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", config.analyticsId);
  }

  applyTheme(theme);
  renderShell();
  hydrateProfile();
  applyLanguage(language);
  setupReveal();
  setupContactForm();
  setupAnalytics();
})();
