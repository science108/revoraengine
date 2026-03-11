/* ══════════════════════════════════════════════════════════════
   SCROLL REVEAL — Phase 5
   IntersectionObserver-based section animations
   1. Fade-in / slide-up on section enter
   2. Number counting animations
   3. Navigation progress indicator
   4. Parallax-like blueprint grid movement
══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ────────────────────────────────────────────────
     1. SECTION FADE-IN / SLIDE-UP
  ──────────────────────────────────────────────── */
  const revealSections = document.querySelectorAll(
    '#wizja, #gameChanger, #problemSilnikow, #siemensHalske, ' +
    '#przelom, #ps3Prototyp, #porscheVsRcpm, #trendRynkowy, ' +
    '#wszyscyWygrywaja, #energia, #problem, #technologia, ' +
    '#animacja, #ewolucja, #rynek, #kontakt, #interactiveDemos'
  );

  const revealElements = document.querySelectorAll(
    '.prob-card, .tech-card, .seg-card, .mkt-card, .flow-item, ' +
    '.mkt-data-col, .kontakt-item, .eb-row, .anim-col'
  );

  function addRevealClass(el) {
    if (!el.classList.contains('sr-init')) {
      el.classList.add('sr-init');
    }
  }

  revealSections.forEach(addRevealClass);
  revealElements.forEach(function (el, i) {
    addRevealClass(el);
    el.style.transitionDelay = (i % 6) * 80 + 'ms';
  });

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('sr-visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealSections.forEach(function (s) { sectionObserver.observe(s); });

  const elementObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('sr-visible');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(function (el) { elementObserver.observe(el); });


  /* ────────────────────────────────────────────────
     2. NUMBER COUNTING ANIMATIONS
  ──────────────────────────────────────────────── */
  const counterElements = document.querySelectorAll('.tech-num-v, .ps3-chip-val');
  const countedSet = new Set();

  function parseTarget(text) {
    text = text.trim();
    var prefix = '';
    var suffix = '';
    var num = 0;

    if (text.charAt(0) === '>' || text.charAt(0) === '<' || text.charAt(0) === '~') {
      prefix = text.charAt(0);
      text = text.substring(1).trim();
    }

    var numMatch = text.match(/[\d,.\s]+/);
    if (numMatch) {
      var raw = numMatch[0].replace(/[\s,]/g, '');
      num = parseFloat(raw) || 0;
      suffix = text.substring(numMatch.index + numMatch[0].length).trim();
      if (numMatch.index > 0 && !prefix) {
        prefix = text.substring(0, numMatch.index);
      }
    }
    return { prefix: prefix, num: num, suffix: suffix, hasDecimal: raw && raw.indexOf('.') !== -1 };
  }

  function animateCounter(el) {
    var target = parseTarget(el.textContent);
    if (target.num === 0) return;

    var duration = 1800;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      var current = target.num * ease;

      var display;
      if (target.hasDecimal) {
        display = current.toFixed(1);
      } else if (target.num >= 1000) {
        display = Math.round(current).toLocaleString('en-US').replace(/,/g, ' ');
      } else {
        display = Math.round(current).toString();
      }

      el.textContent = target.prefix + display + (target.suffix ? ' ' + target.suffix : '');

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !countedSet.has(entry.target)) {
        countedSet.add(entry.target);
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(function (el) { counterObserver.observe(el); });


  /* ────────────────────────────────────────────────
     3. NAVIGATION SECTION PROGRESS INDICATOR
  ──────────────────────────────────────────────── */
  var progressBar = document.createElement('div');
  progressBar.id = 'scrollProgressBar';
  document.body.appendChild(progressBar);

  var navLinks = document.querySelectorAll('#nav a[href^="#"]');
  var navSections = [];
  navLinks.forEach(function (link) {
    var target = document.querySelector(link.getAttribute('href'));
    if (target) navSections.push({ el: target, link: link });
  });

  var activeIndicator = document.createElement('div');
  activeIndicator.id = 'navActiveIndicator';
  var nav = document.getElementById('nav');
  if (nav) nav.appendChild(activeIndicator);

  function updateScrollProgress() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? scrollTop / docHeight : 0;
    progressBar.style.width = (progress * 100) + '%';

    var currentSection = null;
    navSections.forEach(function (s) {
      var rect = s.el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4) {
        currentSection = s;
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('nav-link-active');
    });

    if (currentSection) {
      currentSection.link.classList.add('nav-link-active');
    }
  }

  var scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      requestAnimationFrame(function () {
        updateScrollProgress();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });
  updateScrollProgress();


  /* ────────────────────────────────────────────────
     4. PARALLAX BLUEPRINT GRID
  ──────────────────────────────────────────────── */
  var bodyBg = document.body;
  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var scrollY = window.pageYOffset;
    if (Math.abs(scrollY - lastScroll) < 2) return;
    lastScroll = scrollY;
    var offset = Math.round(scrollY * 0.08);
    bodyBg.style.backgroundPosition = '0 ' + offset + 'px';
  }, { passive: true });

})();
