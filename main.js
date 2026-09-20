(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Preloader ---------- */
  const preloader = $(".preloader");
  const hidePreloader = () => {
    if (!preloader) return;
    preloader.classList.add("is-done");
    setTimeout(() => preloader.remove(), 900);
  };
  const onReady = () => setTimeout(hidePreloader, reduceMotion ? 0 : 500);
  if (document.readyState === "complete") onReady();
  else window.addEventListener("load", onReady);

  /* ---------- Footer year ---------- */
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Header: solid background after scrolling ---------- */
  const header = $("#header");
  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ---------- Mobile menu ---------- */
  const toggle = $("#menuToggle");
  const nav = $("#nav");
  const setMenu = (open) => {
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- Hero slideshow ---------- */
  const slides = $$(".hero__slide");
  if (slides.length > 1 && !reduceMotion) {
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove("is-active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("is-active");
    }, 6000);
  }

  /* ---------- Tour filtering ---------- */
  const destSelect = $("#f-destination");
  const expSelect = $("#f-experience");
  const tours = $$(".tour");
  const emptyState = $("#toursEmpty");

  const applyFilters = () => {
    const dest = destSelect.value;
    const exp = expSelect.value;
    let visible = 0;

    tours.forEach((tour) => {
      const match =
        (dest === "all" || tour.dataset.destination === dest) &&
        (exp === "all" || tour.dataset.experience === exp);
      tour.hidden = !match;
      if (match) visible++;
    });

    emptyState.hidden = visible !== 0;
  };

  const setFilters = (dest = "all", exp = "all") => {
    destSelect.value = dest;
    expSelect.value = exp;
    applyFilters();
  };

  // Search form
  $("#finder").addEventListener("submit", (e) => {
    e.preventDefault();
    applyFilters();
    $("#tours").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });
  destSelect.addEventListener("change", applyFilters);
  expSelect.addEventListener("change", applyFilters);

  // Any link with data-destination / data-experience sets the filters
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-destination], a[data-experience]");
    if (!link) return;
    setFilters(link.dataset.destination || "all", link.dataset.experience || "all");
  });

  // "View all tours" + "Show all tours"
  ["showAll", "resetFilters"].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener("click", () => setFilters());
  });
})();
