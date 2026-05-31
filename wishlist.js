(function () {
  'use strict';

  var WISH_KEY = 'eatz_wishlist';
  var USER_KEY = 'eatz_user';

  // ── Storage helpers ────────────────────────────────────────────
  function getUser() {
    try { return JSON.parse(localStorage.getItem(USER_KEY)) || null; } catch (e) { return null; }
  }

  function getWishlist() {
    try { return JSON.parse(localStorage.getItem(WISH_KEY)) || []; } catch (e) { return []; }
  }

  function saveWishlist(list) {
    try { localStorage.setItem(WISH_KEY, JSON.stringify(list)); } catch (e) {}
  }

  function hasItem(name) {
    return getWishlist().some(function (i) { return i.name === name; });
  }

  function addItem(name, price, img, desc, cat) {
    var list = getWishlist();
    if (!list.some(function (i) { return i.name === name; })) {
      list.push({ name: name, price: price || 0, img: img || '', desc: desc || '', cat: cat || '' });
      saveWishlist(list);
    }
  }

  function removeItem(name) {
    saveWishlist(getWishlist().filter(function (i) { return i.name !== name; }));
  }

  function toggleItem(name, price, img, desc, cat) {
    if (hasItem(name)) { removeItem(name); return false; }
    addItem(name, price, img, desc, cat);
    return true;
  }

  // ── Toast ─────────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('__eatz_wish_css')) return;
    var s = document.createElement('style');
    s.id = '__eatz_wish_css';
    s.textContent = [
      '@keyframes eatzWishIn{from{opacity:0;transform:translateX(-50%) translateY(14px) scale(.94)}',
        'to{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}}',
      '@keyframes eatzWishOut{from{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}',
        'to{opacity:0;transform:translateX(-50%) translateY(10px) scale(.96)}}',
      '.eatz-wish-toast{position:fixed;bottom:108px;left:50%;',
        'background:#1b1c1c;color:#fff;border-radius:14px;padding:12px 20px 12px 14px;',
        'display:flex;align-items:center;gap:10px;font-family:"Manrope",sans-serif;',
        'font-size:14px;font-weight:600;z-index:9999;pointer-events:none;white-space:nowrap;',
        'box-shadow:0 10px 48px rgba(0,0,0,.32);',
        'animation:eatzWishIn 300ms cubic-bezier(.16,1,.3,1) forwards}',
      '.eatz-wish-toast.out{animation:eatzWishOut 240ms ease forwards}',
      '.eatz-wt-icon{width:24px;height:24px;border-radius:50%;',
        'display:flex;align-items:center;justify-content:center;flex-shrink:0}',
      '.eatz-wt-icon.add{background:#ef4444}',
      '.eatz-wt-icon.rem{background:#6b7280}'
    ].join('');
    document.head.appendChild(s);
  }

  var toastTimer = null;
  function showToast(added) {
    var old = document.getElementById('__eatz_wish_toast');
    if (old) { clearTimeout(toastTimer); old.remove(); }

    var heartSvg = '<svg width="11" height="11" viewBox="0 0 24 24" fill="#fff" stroke="none" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
    var minusSvg = '<svg width="10" height="2" viewBox="0 0 10 2" fill="#fff" aria-hidden="true"><rect width="10" height="2" rx="1"/></svg>';

    var t = document.createElement('div');
    t.id = '__eatz_wish_toast';
    t.className = 'eatz-wish-toast';
    t.setAttribute('role', 'status');
    t.setAttribute('aria-live', 'polite');
    t.innerHTML =
      '<div class="eatz-wt-icon ' + (added ? 'add' : 'rem') + '">' +
        (added ? heartSvg : minusSvg) +
      '</div>' +
      (added ? 'Added to Wishlist' : 'Removed from Wishlist');
    document.body.appendChild(t);

    toastTimer = setTimeout(function () {
      t.classList.add('out');
      t.addEventListener('animationend', function () { if (t.parentNode) t.remove(); }, { once: true });
    }, 2400);
  }

  // ── Sync button states from localStorage ──────────────────────
  function syncButtons() {
    var list = getWishlist();
    var nameSet = {};
    list.forEach(function (i) { nameSet[i.name] = true; });

    document.querySelectorAll('.food-wish').forEach(function (btn) {
      var card = btn.closest('.food-card');
      if (!card) return;
      var nameEl = card.querySelector('.food-name');
      if (!nameEl) return;
      var liked = !!nameSet[nameEl.textContent.trim()];
      btn.dataset.liked = liked ? 'true' : 'false';
      btn.classList.toggle('liked', liked);
    });

    // food-detail page wish button
    var detailWish = document.getElementById('detail-wish');
    var detailName = document.getElementById('detail-name');
    if (detailWish && detailName) {
      var n = detailName.textContent.trim();
      if (n) {
        var liked = !!nameSet[n];
        detailWish.dataset.liked = liked ? 'true' : 'false';
        detailWish.classList.toggle('liked', liked);
      }
    }
  }

  // ── Hook food card wish buttons ───────────────────────────────
  function hookWishButtons() {
    document.querySelectorAll('.food-wish:not([data-wish-hooked])').forEach(function (btn) {
      btn.dataset.wishHooked = '1';
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (!getUser()) {
          window.location.href = 'signin.html?redirect=' + encodeURIComponent(window.location.pathname + window.location.search);
          return;
        }
        var card = btn.closest('.food-card');
        if (!card) return;
        var nameEl  = card.querySelector('.food-name');
        var priceEl = card.querySelector('.food-price');
        var imgEl   = card.querySelector('img');
        var descEl  = card.querySelector('.food-desc');
        var catEl   = card.querySelector('.food-cat');
        var name  = nameEl  ? nameEl.textContent.trim() : '';
        var price = priceEl ? parseFloat(priceEl.textContent.replace(/[^\d.]/g, '')) || 0 : 0;
        var img   = imgEl   ? imgEl.src : '';
        var desc  = descEl  ? descEl.textContent.trim() : '';
        var cat   = catEl   ? catEl.textContent.trim() : '';
        if (!name) return;

        var added = toggleItem(name, price, img, desc, cat);
        btn.dataset.liked = added ? 'true' : 'false';
        btn.classList.toggle('liked', added);
        showToast(added);
      });
    });
  }

  // ── Hook food-detail wish button ──────────────────────────────
  function hookDetailWish() {
    var btn = document.getElementById('detail-wish');
    if (!btn || btn.dataset.wishHooked) return;
    btn.dataset.wishHooked = '1';
    btn.addEventListener('click', function () {
      if (!getUser()) {
        window.location.href = 'signin.html?redirect=' + encodeURIComponent(window.location.pathname + window.location.search);
        return;
      }
      var nameEl  = document.getElementById('detail-name');
      var priceEl = document.getElementById('detail-price');
      var imgEl   = document.getElementById('detail-img');
      var descEl  = document.getElementById('detail-desc');
      var catEl   = document.querySelector('.food-detail-cat');
      var name  = nameEl  ? nameEl.textContent.trim() : '';
      var price = priceEl ? parseFloat(priceEl.textContent.replace(/[^\d.]/g, '')) || 0 : 0;
      var img   = imgEl   ? imgEl.src : '';
      var desc  = descEl  ? descEl.textContent.trim() : '';
      var cat   = catEl   ? catEl.textContent.trim() : '';
      if (!name) return;

      var added = toggleItem(name, price, img, desc, cat);
      btn.dataset.liked = added ? 'true' : 'false';
      btn.classList.toggle('liked', added);
      showToast(added);
    });
  }

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    injectStyles();
    syncButtons();
    hookWishButtons();
    hookDetailWish();

    var grid = document.getElementById('menu-grid');
    if (grid) {
      new MutationObserver(function () {
        hookWishButtons();
        syncButtons();
      }).observe(grid, { childList: true });
    }
  }

  // ── Public API ─────────────────────────────────────────────────
  window.__eatzWishHas    = hasItem;
  window.__eatzWishToggle = toggleItem;
  window.__eatzWishGetAll = getWishlist;
  window.__eatzWishRemove = removeItem;
  window.__eatzWishSync   = syncButtons;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
