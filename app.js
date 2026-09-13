// ===== Featured carousel =====
(function () {
  var frame = document.getElementById('carFrame');
  if (!frame) return;
  var slides = Array.prototype.slice.call(frame.querySelectorAll('.slide'));
  var dotsWrap = document.getElementById('carDots');
  var prev = document.getElementById('carPrev');
  var next = document.getElementById('carNext');
  var i = 0, timer = null;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // build dots
  slides.forEach(function (_, idx) {
    var b = document.createElement('button');
    b.setAttribute('aria-label', 'Go to slide ' + (idx + 1));
    if (idx === 0) b.className = 'active';
    b.addEventListener('click', function () { go(idx); });
    dotsWrap.appendChild(b);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);

  function go(n) {
    slides[i].classList.remove('active');
    dots[i].classList.remove('active');
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('active');
    dots[i].classList.add('active');
    restart();
  }
  function restart() {
    if (reduce) return;
    if (timer) clearInterval(timer);
    timer = setInterval(function () { go(i + 1); }, 5000);
  }

  prev.addEventListener('click', function () { go(i - 1); });
  next.addEventListener('click', function () { go(i + 1); });
  frame.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
  frame.addEventListener('mouseleave', restart);
  restart();
})();

// ===== Product filters =====
(function () {
  var bar = document.getElementById('filterBar');
  if (!bar) return;
  var btns = Array.prototype.slice.call(bar.querySelectorAll('.filter-btn'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('#prodGrid .pcard'));
  var empty = document.getElementById('filterEmpty');

  // show live counts on each button
  btns.forEach(function (btn) {
    var f = btn.getAttribute('data-filter');
    var n = f === 'all' ? cards.length : cards.filter(function (c) { return c.getAttribute('data-cat') === f; }).length;
    var s = document.createElement('span');
    s.className = 'count';
    s.textContent = n;
    btn.appendChild(s);
  });

  bar.addEventListener('click', function (e) {
    var btn = e.target.closest('.filter-btn');
    if (!btn) return;
    btns.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    var f = btn.getAttribute('data-filter');
    var shown = 0;
    cards.forEach(function (c) {
      var match = f === 'all' || c.getAttribute('data-cat') === f;
      c.classList.toggle('hide', !match);
      if (match) shown++;
    });
    empty.style.display = shown === 0 ? 'block' : 'none';
  });
})();
