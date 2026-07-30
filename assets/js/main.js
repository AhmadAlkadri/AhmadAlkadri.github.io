(function () {
  "use strict";

  var button = document.getElementById("site-nav-toggle");
  var links = document.getElementById("site-nav-links");

  if (!button || !links) return;

  function closeMenu() {
    links.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
  }

  button.addEventListener("click", function () {
    var isOpen = links.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
      button.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) closeMenu();
  });
}());
