(() => {
  // --- Current year in footer ---
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // --- Mouse-following glass highlight ---
  document
    .querySelectorAll(
      ".btn, .skill-card, .project-card, .experience-card, .chip, .footer__bar",
    )
    .forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });

  // --- Shrink topbar on scroll ---
  const onScroll = () => {
    document.body.classList.toggle("is-scrolled", window.scrollY > 30);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // --- Active section indicator (sliding pill in nav) ---
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));
  const navList = document.querySelector(".nav__links");
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const linkFor = new Map();
  navLinks.forEach((a) => linkFor.set(a.getAttribute("href").slice(1), a));

  const setActiveLink = (id) => {
    const link = id ? linkFor.get(id) : null;
    navLinks.forEach((a) => a.classList.toggle("is-active", a === link));
    if (!link || !navList) {
      navList?.style.setProperty("--active-o", "0");
      return;
    }
    const listRect = navList.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    navList.style.setProperty(
      "--active-x",
      `${linkRect.left - listRect.left}px`,
    );
    navList.style.setProperty("--active-w", `${linkRect.width}px`);
    navList.style.setProperty("--active-o", "1");
  };

  let currentActive = null;
  const refreshActive = () => {
    // Pick the section whose top is above the 35% mark — that's the one the
    // user is currently reading.
    const offset = window.innerHeight * 0.35;
    let activeId = sections[0]?.id ?? null;
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= offset) activeId = s.id;
    }
    if (activeId !== currentActive) {
      currentActive = activeId;
    }
    setActiveLink(activeId);
  };

  window.addEventListener("scroll", refreshActive, { passive: true });
  window.addEventListener("resize", refreshActive);

  // Keep the pill aligned while the nav itself resizes (scroll-shrink, font load).
  if (navList) {
    const ro = new ResizeObserver(refreshActive);
    ro.observe(navList);
    navLinks.forEach((a) => ro.observe(a));
  }

  refreshActive();

  // --- Theme switcher: directional stretch on selection ---
  const switcher = document.querySelector(".switcher");
  if (!switcher) return;

  const options = switcher.querySelector(".switcher__options");
  const order = ["light", "dark", "dim"];
  let prevIdx = order.indexOf(
    switcher.querySelector('input[name="theme"]:checked')?.value ?? "light",
  );

  options.addEventListener("change", (e) => {
    const target = e.target;
    if (!target.matches('input[name="theme"]')) return;

    const nextIdx = order.indexOf(target.value);
    if (nextIdx === prevIdx) return;

    const dir = nextIdx > prevIdx ? "right" : "left";
    const hop = Math.abs(nextIdx - prevIdx);
    options.removeAttribute("data-dir");
    options.removeAttribute("data-hop");
    void options.offsetWidth;
    options.setAttribute("data-dir", dir);
    options.setAttribute("data-hop", String(hop));
    prevIdx = nextIdx;
  });
})();
