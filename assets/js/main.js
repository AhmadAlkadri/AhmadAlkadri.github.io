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

  var toc = document.querySelector("[data-article-toc]");

  if (toc) {
    var articleContent = document.querySelector(".article__content");
    var headings = articleContent ? Array.prototype.slice.call(articleContent.querySelectorAll("h2")) : [];
    var tocLists = toc.querySelectorAll("[data-article-toc-list]");
    var activeHeading = null;
    var ticking = false;

    if (headings.length && tocLists.length) {
      Array.prototype.forEach.call(tocLists, function (list) {
        headings.forEach(function (heading) {
          if (!heading.id) return;

          var item = document.createElement("li");
          var link = document.createElement("a");
          link.href = "#" + heading.id;
          link.textContent = heading.textContent;
          item.appendChild(link);
          list.appendChild(item);
        });
      });

      toc.hidden = false;

      function setActiveHeading(heading) {
        if (!heading || heading === activeHeading) return;
        activeHeading = heading;

        Array.prototype.forEach.call(toc.querySelectorAll("a"), function (link) {
          var isActive = link.getAttribute("href") === "#" + heading.id;
          link.classList.toggle("is-active", isActive);
          if (isActive) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }

      function updateActiveHeading() {
        ticking = false;
        var masthead = document.querySelector(".masthead");
        var mastheadOffset = (masthead ? masthead.getBoundingClientRect().height : 0) + 24;
        var headingStyle = headings[0] ? window.getComputedStyle(headings[0]) : null;
        var scrollMargin = headingStyle ? parseFloat(headingStyle.scrollMarginTop) || 0 : 0;
        var offset = Math.max(mastheadOffset, scrollMargin);
        var current = headings[0];

        headings.forEach(function (heading) {
          if (heading.getBoundingClientRect().top <= offset) current = heading;
        });

        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
          current = headings[headings.length - 1];
        }

        setActiveHeading(current);
      }

      function requestActiveHeadingUpdate() {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(updateActiveHeading);
      }

      if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(requestActiveHeadingUpdate, {
          rootMargin: "-15% 0px -70% 0px",
          threshold: 0
        });
        headings.forEach(function (heading) { observer.observe(heading); });
      }

      window.addEventListener("scroll", requestActiveHeadingUpdate, { passive: true });
      window.addEventListener("resize", requestActiveHeadingUpdate);
      window.addEventListener("hashchange", requestActiveHeadingUpdate);
      requestActiveHeadingUpdate();
    }
  }
}());
