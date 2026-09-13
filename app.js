// ===== Category shortcut tiles -> apply filter + scroll to grid =====
(function () {
  var tiles = document.getElementById('catTiles');
  if (!tiles) return;
  tiles.addEventListener('click', function (e) {
    var tile = e.target.closest('.cat-tile');
    if (!tile) return;
    var f = tile.getAttribute('data-filter');
    var btn = document.querySelector('.filter-btn[data-filter="' + f + '"]');
    if (btn) btn.click();
    var target = document.getElementById('products');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();

// ===== Per-product photo galleries (thumbnail swap) =====
(function () {
  document.querySelectorAll('#prodGrid .pcard').forEach(function (card) {
    var thumbs = card.querySelector('.thumbs');
    if (!thumbs) return;
    var main = card.querySelector('.photo > img');
    thumbs.addEventListener('click', function (e) {
      var btn = e.target.closest('.thumb');
      if (!btn) return;
      var img = btn.querySelector('img');
      main.src = img.src;
      main.alt = img.alt || main.alt;
      thumbs.querySelectorAll('.thumb').forEach(function (t) { t.classList.remove('active'); });
      btn.classList.add('active');
    });
  });
})();

// ===== Click-to-zoom lightbox =====
(function () {
  var lb = document.getElementById('lightbox');
  if (!lb) return;
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var lbThumbs = document.getElementById('lbThumbs');
  var prev = document.getElementById('lbPrev');
  var next = document.getElementById('lbNext');
  var close = document.getElementById('lbClose');
  var imgs = [], idx = 0, title = '';

  function render() {
    lbImg.src = imgs[idx];
    lbImg.alt = title + ' — photo ' + (idx + 1);
    var multi = imgs.length > 1;
    lbCap.innerHTML = title + (multi ? '<span class="lb-count">' + (idx + 1) + ' / ' + imgs.length + '</span>' : '');
    prev.hidden = !multi; next.hidden = !multi;
    lbThumbs.innerHTML = '';
    if (multi) {
      imgs.forEach(function (src, i) {
        var b = document.createElement('button');
        if (i === idx) b.className = 'active';
        var im = document.createElement('img'); im.src = src; im.alt = '';
        b.appendChild(im);
        b.addEventListener('click', function () { idx = i; render(); });
        lbThumbs.appendChild(b);
      });
    }
  }
  function open(card, startSrc) {
    var thumbs = card.querySelectorAll('.thumbs .thumb img');
    imgs = thumbs.length ? Array.prototype.map.call(thumbs, function (t) { return t.src; })
                         : [card.querySelector('.photo > img').src];
    var h = card.querySelector('h3');
    title = h ? h.textContent : '';
    idx = Math.max(0, imgs.indexOf(startSrc));
    render();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function shut() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  function go(n) { idx = (n + imgs.length) % imgs.length; render(); }

  document.querySelectorAll('#prodGrid .pcard .photo > img').forEach(function (img) {
    img.addEventListener('click', function () { open(img.closest('.pcard'), img.src); });
  });
  prev.addEventListener('click', function () { go(idx - 1); });
  next.addEventListener('click', function () { go(idx + 1); });
  close.addEventListener('click', shut);
  lb.addEventListener('click', function (e) { if (e.target === lb) shut(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') shut();
    else if (e.key === 'ArrowLeft' && imgs.length > 1) go(idx - 1);
    else if (e.key === 'ArrowRight' && imgs.length > 1) go(idx + 1);
  });
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
