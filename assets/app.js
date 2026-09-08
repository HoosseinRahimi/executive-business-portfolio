const menuButton = document.querySelector('[data-menu]');
const nav = document.querySelector('[data-nav]');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const templateConfig = window.BUSINESS_TEMPLATE || {};
document.querySelectorAll('[data-owner]').forEach((el) => {
  if (templateConfig.ownerName) el.textContent = templateConfig.ownerName;
});
document.querySelectorAll('[data-initials]').forEach((el) => {
  if (templateConfig.initials) el.textContent = templateConfig.initials;
});
document.querySelectorAll('[data-email]').forEach((el) => {
  if (templateConfig.email) {
    el.textContent = templateConfig.email;
    el.href = `mailto:${templateConfig.email}`;
  }
});
document.querySelectorAll('[data-linkedin]').forEach((el) => {
  if (templateConfig.linkedin) el.href = templateConfig.linkedin;
});
document.querySelectorAll('[data-whatsapp]').forEach((el) => {
  if (templateConfig.whatsapp) el.href = templateConfig.whatsapp;
});
