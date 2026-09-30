/* Theme only. The single entrance animation is pure CSS, so nothing here
   observes scroll and nothing repeats an effect down the page. */
(function () {
  var btn = document.querySelector('.themetoggle');
  if (!btn) return;
  var root = document.documentElement;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function current() { return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }

  function apply(theme) {
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }

  apply(current());

  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    if (!reduced && document.startViewTransition) document.startViewTransition(function () { apply(next); });
    else apply(next);
  });

  try {
    if (!localStorage.getItem('theme')) {
      matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        apply(e.matches ? 'dark' : 'light');
        try { localStorage.removeItem('theme'); } catch (err) {}
      });
    }
  } catch (e) {}
})();
