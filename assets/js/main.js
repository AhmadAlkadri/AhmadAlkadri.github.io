(function () {
  "use strict";

  var button = document.getElementById("site-nav-toggle");
  var links = document.getElementById("site-nav-links");

  if (button && links) {
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
  }

  var copyButtons = document.querySelectorAll("[data-copy-link]");

  function announceCopy(button, message) {
    var feedback = button.querySelector("[data-copy-feedback]");
    if (feedback) feedback.textContent = message;
    window.setTimeout(function () {
      if (feedback) feedback.textContent = "";
    }, 2500);
  }

  function copyWithFallback(text, onSuccess, onFailure) {
    var input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();

    var copied = false;
    try {
      copied = document.execCommand("copy");
    } finally {
      document.body.removeChild(input);
    }

    if (copied) onSuccess();
    else onFailure();
  }

  Array.prototype.forEach.call(copyButtons, function (copyButton) {
    copyButton.addEventListener("click", function () {
      var url = copyButton.getAttribute("data-copy-url") || window.location.href;
      var success = function () { announceCopy(copyButton, "Link copied"); };
      var failure = function () { announceCopy(copyButton, "Copy failed; select the page URL manually"); };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(success).catch(function () {
          copyWithFallback(url, success, failure);
        });
      } else {
        copyWithFallback(url, success, failure);
      }
    });
  });
}());
