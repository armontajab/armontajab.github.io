/* ==========================================================
   Alireza Montajab — motion
   Scroll reveal, staggering and stat counters.
   All effects are skipped when the user prefers reduced motion.
   ========================================================== */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var SELECTOR = 'section, .tile, .ccard, .stat, .work, .company, .roles, .act, .band, .ielts, .detail-head, .page .lead, .page .chips';
  var targets = Array.prototype.slice.call(document.querySelectorAll(SELECTOR));

  /* ---------- if motion is off, show everything immediately ---------- */
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  /* ---------- stagger siblings inside a grid ---------- */
  function stagger(list, step) {
    list.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i, 6) * step + 'ms';
    });
  }
  stagger(Array.prototype.slice.call(document.querySelectorAll('.tiles .tile')), 70);
  stagger(Array.prototype.slice.call(document.querySelectorAll('.cards .ccard')), 80);
  stagger(Array.prototype.slice.call(document.querySelectorAll('.stats .stat')), 90);
  stagger(Array.prototype.slice.call(document.querySelectorAll('.work')), 80);
  stagger(Array.prototype.slice.call(document.querySelectorAll('.band')), 110);

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      if (entry.target.classList.contains('stat')) countUp(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  targets.forEach(function (el) { io.observe(el); });

  /* ---------- count the stat numbers up ---------- */
  function countUp(stat) {
    var b = stat.querySelector('b');
    if (!b) return;

    var node = b.firstChild;
    if (!node || node.nodeType !== 3) return;

    var target = parseFloat(node.nodeValue);
    if (isNaN(target)) return;

    var decimals = (node.nodeValue.split('.')[1] || '').trim().length;
    var duration = 900;
    var start = null;

    function frame(now) {
      if (start === null) start = now;
      var t = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      node.nodeValue = (target * eased).toFixed(decimals);
      if (t < 1) requestAnimationFrame(frame);
      else node.nodeValue = target.toFixed(decimals);
    }
    node.nodeValue = (0).toFixed(decimals);
    requestAnimationFrame(frame);
  }
})();

/* ==========================================================
   Theme toggle
   The initial theme is applied by an inline script in <head>
   so the page never flashes the wrong colours.
   ========================================================== */
(function () {
  var btn = document.querySelector('.themetoggle');
  if (!btn) return;

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function current() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function apply(theme) {
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }

  apply(current());

  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';

    /* crossfade the whole page instead of a hard colour jump */
    if (!reduced && document.startViewTransition) {
      root.classList.add('theme');
      var t = document.startViewTransition(function () { apply(next); });
      t.finished.then(function () { root.classList.remove('theme'); });
    } else {
      apply(next);
    }
  });

  /* follow the system setting until the visitor picks one themselves */
  try {
    if (!localStorage.getItem('theme')) {
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', function (e) {
          if (root.getAttribute('data-theme') === null || true) {
            try { localStorage.removeItem('theme'); } catch (err) {}
            apply(e.matches ? 'dark' : 'light');
            try { localStorage.removeItem('theme'); } catch (err) {}
          }
        });
    }
  } catch (e) {}
})();
