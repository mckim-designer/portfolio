const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    });
  });
}

const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    projectCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

document.querySelectorAll(".placeholder-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Replace this placeholder with your real portfolio or social profile URL in index.html.");
  });
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Accessible selectable dropdowns for Work, About, and Services navigation.
const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
function closeDropdowns(except = null) {
  dropdownToggles.forEach((toggle) => {
    const menu = document.getElementById(toggle.getAttribute('aria-controls'));
    if (toggle !== except && menu) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    }
  });
}
dropdownToggles.forEach((toggle) => {
  const menu = document.getElementById(toggle.getAttribute('aria-controls'));
  if (!menu) return;
  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const opening = toggle.getAttribute('aria-expanded') !== 'true';
    closeDropdowns(toggle);
    toggle.setAttribute('aria-expanded', String(opening));
    menu.hidden = !opening;
  });
  toggle.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDropdowns();
      toggle.focus();
    }
  });
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-dropdown')) closeDropdowns();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeDropdowns();
});

document.querySelectorAll('[data-nav-filter]').forEach((link) => {
  link.addEventListener('click', () => {
    const filter = link.dataset.navFilter;
    const targetButton = document.querySelector(`.filter[data-filter="${filter}"]`);
    if (targetButton) targetButton.click();
    closeDropdowns();
  });
});

// Close the dropdown after selecting a section link, including on mobile.
document.querySelectorAll('.dropdown-menu a:not([data-nav-filter])').forEach((link) => {
  link.addEventListener('click', () => closeDropdowns());
});
