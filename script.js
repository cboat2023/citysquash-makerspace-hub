// Shared navigation behavior for the CitySquash Makerspace Hub.
// Paste the Progress Tracker Google Form URL between these quotation marks.
const PROGRESS_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScvC7nYNiKPkaMv7DnLX3DlNKgqOmzQBb04qJAeUNtEC07WJQ/viewform?usp=publish-editor";

// Paste the read-only, published Google Sheet embed URL between these quotation marks.
const PROGRESS_DASHBOARD_URL = "PASTE_PUBLISHED_GOOGLE_SHEET_EMBED_LINK_HERE";

document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  function closeDropdowns() {
    dropdownToggles.forEach(function (toggle) {
      const dropdown = toggle.closest(".dropdown");
      dropdown.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

      if (!isOpen) {
        closeDropdowns();
      }
    });
  }

  // Highlight the link that matches the current page file.
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach(function (link) {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");

      const parentDropdown = link.closest(".dropdown");
      const parentToggle = parentDropdown ? parentDropdown.querySelector(".dropdown-toggle") : null;

      if (parentToggle) {
        parentToggle.classList.add("active");
      }
    }

    link.addEventListener("click", function () {
      if (navMenu && navToggle) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
        closeDropdowns();
      }
    });
  });

  dropdownToggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      const dropdown = toggle.closest(".dropdown");
      const isOpen = dropdown.classList.toggle("open");

      dropdownToggles.forEach(function (otherToggle) {
        const otherDropdown = otherToggle.closest(".dropdown");

        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove("open");
          otherToggle.setAttribute("aria-expanded", "false");
        }
      });

      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".dropdown")) {
      closeDropdowns();
    }
  });

  // Projects Lab difficulty filters.
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach(function (filterButton) {
        filterButton.classList.remove("active");
        filterButton.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      projectCards.forEach(function (card) {
        const matchesFilter = selectedFilter === "all" || card.dataset.difficulty === selectedFilter;
        card.classList.toggle("is-hidden", !matchesFilter);
      });
    });
  });

  // Progress dashboard links and read-only class board.
  const progressFormLinks = document.querySelectorAll(".progress-form-link");
  const hasProgressForm = PROGRESS_FORM_URL && !PROGRESS_FORM_URL.startsWith("PASTE_");

  progressFormLinks.forEach(function (link) {
    if (hasProgressForm) {
      link.href = PROGRESS_FORM_URL;
      return;
    }

    link.addEventListener("click", function (event) {
      event.preventDefault();
      window.alert("The Progress Tracker is not available yet. Please ask your instructor.");
    });
  });

  const progressBoard = document.querySelector("#progress-board");
  const progressBoardLink = document.querySelector("#progress-board-link");
  const hasProgressDashboard = PROGRESS_DASHBOARD_URL && !PROGRESS_DASHBOARD_URL.startsWith("PASTE_");

  if (progressBoard && progressBoardLink && hasProgressDashboard) {
    const dashboardFrame = document.createElement("iframe");
    dashboardFrame.src = PROGRESS_DASHBOARD_URL;
    dashboardFrame.title = "Read-only CitySquash class progress board";
    dashboardFrame.loading = "lazy";
    progressBoard.replaceChildren(dashboardFrame);
    progressBoardLink.href = PROGRESS_DASHBOARD_URL;
    progressBoardLink.hidden = false;
  }
});
