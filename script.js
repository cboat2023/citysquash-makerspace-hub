// SITE LINKS — paste public destination URLs here. Never add a classroom code.
const SITE_LINKS = {
  tinkercadClassroom: "https://www.tinkercad.com/learn/circuits",
  projectApprovalForm: "#",
  reflectionForm: "#"
};

document.addEventListener("DOMContentLoaded", () => {
  // Give archived week and guide pages the same focused navigation without
  // duplicating navigation edits across every preserved content file.
  const navbar = document.querySelector(".navbar");
  if (navbar && !navbar.querySelector('a[href="this-week.html"]')) {
    navbar.innerHTML = `<a class="brand" href="index.html"><span class="brand-mark">CS</span><span><strong>CitySquash</strong><small>Makerspace</small></span></a><button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-menu"><span></span><span></span><span></span></button><ul class="nav-menu" id="nav-menu"><li><a href="index.html">Home</a></li><li><a href="this-week.html">This Week</a></li><li><a href="projects.html">Projects</a></li><li><a href="guides.html">Guides</a></li><li><a class="nav-cta" href="#" data-site-link="tinkercadClassroom" target="_blank" rel="noopener">Open Tinkercad</a></li></ul>`;
  }

  document.querySelectorAll("[data-site-link]").forEach((link) => {
    const destination = SITE_LINKS[link.dataset.siteLink];
    if (destination && destination !== "#") link.href = destination;
    if (!destination || destination === "#") {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        window.alert("This link is not available yet. Please ask your instructor.");
      });
    }
  });

  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    if (link.getAttribute("href") === page) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
});
