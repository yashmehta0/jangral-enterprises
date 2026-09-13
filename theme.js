// Light/dark theme toggle + current year — shared across all pages
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('themeBtn');
  function current() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  if (btn) {
    btn.addEventListener('click', function () {
      root.setAttribute('data-theme', current() === 'dark' ? 'light' : 'dark');
    });
  }
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
