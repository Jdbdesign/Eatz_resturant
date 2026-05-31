(function () {
  'use strict';

  var CART_KEY = 'eatz_cart';

  // ── Styles ────────────────────────────────────────────────────
  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '.cart-fab{position:fixed;bottom:32px;right:32px;width:56px;height:56px;background:var(--primary);color:#fff;border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 24px rgba(246,109,9,.4);z-index:200;transition:transform 150ms cubic-bezier(.34,1.56,.64,1),background 150ms,box-shadow 150ms;flex-shrink:0}',
    '.cart-fab:hover{background:var(--primary-dark);transform:scale(1.08);box-shadow:0 8px 32px rgba(246,109,9,.5)}',
    '.cart-fab:active{transform:scale(.94)}',
    '.cart-badge{position:absolute;top:-5px;right:-5px;background:#ef4444;color:#fff;font-size:11px;font-weight:700;min-width:20px;height:20px;border-radius:10px;display:flex;align-items:center;justify-content:center;padding:0 5px;font-family:"Manrope",sans-serif;border:2px solid #fff;line-height:1;pointer-events:none}',
    '@keyframes cartPop{0%{transform:scale(1)}40%{transform:scale(1.5)}70%{transform:scale(.88)}100%{transform:scale(1)}}',
    '.cart-badge.pop{animation:cartPop 320ms cubic-bezier(.34,1.56,.64,1)}',
    '.cart-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:300;opacity:0;pointer-events:none;transition:opacity 280ms}',
    '.cart-overlay.open{opacity:1;pointer-events:all}',
    '.cart-drawer{position:fixed;top:0;right:0;width:100%;max-width:400px;height:100%;background:#fff;z-index:301;transform:translateX(105%);transition:transform 300ms cubic-bezier(.16,1,.3,1);display:flex;flex-direction:column;box-shadow:-8px 0 40px rgba(0,0,0,.15)}',
    '.cart-drawer.open{transform:translateX(0)}',
    '.cart-drawer-header{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--outline-v);flex-shrink:0}',
    '.cart-drawer-title{display:flex;align-items:center;gap:10px;font-size:18px;font-weight:700;color:var(--dark);font-family:"Manrope",sans-serif}',
    '.cart-close-btn{width:36px;height:36px;background:var(--surface-mid);border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--dark);transition:background 150ms;flex-shrink:0}',
    '.cart-close-btn:hover{background:var(--outline-v)}',
    '.cart-empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:40px 24px;text-align:center}',
    '.cart-empty p{font-size:17px;font-weight:700;color:var(--dark);font-family:"Manrope",sans-serif;margin:0}',
    '.cart-empty span{font-size:14px;color:var(--outline);font-family:"Manrope",sans-serif}',
    '.cart-items-list{flex:1;overflow-y:auto;padding:4px 24px}',
    '.cart-item{display:flex;align-items:center;gap:12px;padding:14px 0;border-bottom:1px solid var(--surface-mid)}',
    '.cart-item:last-child{border-bottom:none}',
    '.cart-item-info{flex:1;min-width:0}',
    '.cart-item-name{font-size:14px;font-weight:600;color:var(--dark);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:"Manrope",sans-serif}',
    '.cart-item-price{font-size:13px;font-weight:700;color:var(--primary);margin-top:3px;font-family:"Manrope",sans-serif}',
    '.cart-item-controls{display:flex;align-items:center;gap:5px;flex-shrink:0}',
    '.cart-qty-btn{width:28px;height:28px;background:var(--surface-low);border:1.5px solid var(--outline-v);border-radius:6px;cursor:pointer;font-size:16px;font-weight:700;display:flex;align-items:center;justify-content:center;color:var(--dark);transition:all 150ms;line-height:1;font-family:"Manrope",sans-serif}',
    '.cart-qty-btn:hover{background:var(--outline-v)}',
    '.cart-qty{min-width:20px;text-align:center;font-size:14px;font-weight:700;color:var(--dark);font-family:"Manrope",sans-serif}',
    '.cart-remove-btn{width:28px;height:28px;background:transparent;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--outline);border-radius:6px;transition:all 150ms;flex-shrink:0}',
    '.cart-remove-btn:hover{background:#fef2f2;color:#ef4444}',
    '.cart-footer{padding:20px 24px;border-top:1px solid var(--outline-v);flex-shrink:0}',
    '.cart-total-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}',
    '.cart-total-label{font-size:15px;font-weight:600;color:var(--dark);font-family:"Manrope",sans-serif}',
    '.cart-total-amount{font-size:22px;font-weight:800;color:var(--primary);font-family:"Manrope",sans-serif}',
    '.cart-checkout-btn{width:100%;background:var(--primary);color:#fff;border:none;border-radius:12px;padding:16px;font-family:"Manrope",sans-serif;font-size:15px;font-weight:700;cursor:pointer;transition:all 150ms;min-height:52px;letter-spacing:.01em}',
    '.cart-checkout-btn:hover{background:var(--primary-dark);box-shadow:0 8px 30px rgba(246,109,9,.3)}',
    '.cart-checkout-btn:active{transform:scale(.98)}'
  ].join('');
  document.head.appendChild(styleEl);

  // ── HTML ──────────────────────────────────────────────────────
  function injectHTML() {
    if (document.getElementById('cart-fab')) return;
    var cartIcon = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>';
    var cartIconLg = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--outline)"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>';
    var closeIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';
    var trashIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';

    document.body.insertAdjacentHTML('beforeend',
      '<div id="cart-overlay" class="cart-overlay"></div>' +
      '<aside id="cart-drawer" class="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart" aria-hidden="true">' +
        '<div class="cart-drawer-header">' +
          '<div class="cart-drawer-title">' + cartIcon + ' Your Cart</div>' +
          '<button id="cart-close-btn" class="cart-close-btn" aria-label="Close cart">' + closeIcon + '</button>' +
        '</div>' +
        '<div id="cart-empty" class="cart-empty">' +
          cartIconLg +
          '<p>Your cart is empty</p>' +
          '<span>Browse the menu and add something delicious</span>' +
        '</div>' +
        '<div id="cart-items-list" class="cart-items-list"></div>' +
        '<div id="cart-footer" class="cart-footer" style="display:none">' +
          '<div class="cart-total-row">' +
            '<span class="cart-total-label">Total</span>' +
            '<span id="cart-total" class="cart-total-amount">$0.00</span>' +
          '</div>' +
          '<button id="cart-checkout-btn" class="cart-checkout-btn">Proceed to Checkout</button>' +
        '</div>' +
      '</aside>' +
      '<button id="cart-fab" class="cart-fab" aria-label="Open cart">' +
        cartIcon +
        '<span id="cart-badge" class="cart-badge" style="display:none" aria-live="polite"></span>' +
      '</button>'
    );
  }

  // ── State ─────────────────────────────────────────────────────
  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }

  function saveCart(cart) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
    catch (e) {}
  }

  function addItem(name, price) {
    var cart = getCart();
    var found = null;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].name === name) { found = cart[i]; break; }
    }
    if (found) {
      found.qty++;
    } else {
      cart.push({ name: name, price: price, qty: 1 });
    }
    saveCart(cart);
    refreshUI(true);
  }

  function changeQty(name, delta) {
    var cart = getCart();
    var item = null;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].name === name) { item = cart[i]; break; }
    }
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      saveCart(cart.filter(function (x) { return x.name !== name; }));
    } else {
      saveCart(cart);
    }
    refreshUI(false);
  }

  function removeItem(name) {
    saveCart(getCart().filter(function (x) { return x.name !== name; }));
    refreshUI(false);
  }

  function totalCount() {
    return getCart().reduce(function (s, i) { return s + i.qty; }, 0);
  }

  function totalPrice() {
    return getCart().reduce(function (s, i) { return s + i.price * i.qty; }, 0);
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ── Render ────────────────────────────────────────────────────
  function refreshUI(popBadge) {
    var count = totalCount();
    var badge = document.getElementById('cart-badge');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
      if (popBadge && count > 0) {
        badge.classList.remove('pop');
        void badge.offsetWidth;
        badge.classList.add('pop');
        badge.addEventListener('animationend', function () { badge.classList.remove('pop'); }, { once: true });
      }
    }
    renderItems();
  }

  function renderItems() {
    var list = document.getElementById('cart-items-list');
    if (!list) return;
    var cart = getCart();
    var emptyEl = document.getElementById('cart-empty');
    var footerEl = document.getElementById('cart-footer');
    var totalEl = document.getElementById('cart-total');

    if (cart.length === 0) {
      list.innerHTML = '';
      if (emptyEl) emptyEl.style.display = 'flex';
      if (footerEl) footerEl.style.display = 'none';
      return;
    }
    if (emptyEl) emptyEl.style.display = 'none';
    if (footerEl) footerEl.style.display = 'block';

    list.innerHTML = cart.map(function (item) {
      var n = esc(item.name);
      return '<div class="cart-item">' +
        '<div class="cart-item-info">' +
          '<div class="cart-item-name">' + n + '</div>' +
          '<div class="cart-item-price">$' + (item.price * item.qty).toFixed(2) + (item.qty > 1 ? ' <span style="font-weight:400;color:var(--outline)">× ' + item.qty + '</span>' : '') + '</div>' +
        '</div>' +
        '<div class="cart-item-controls">' +
          '<button class="cart-qty-btn" data-action="dec" data-name="' + n + '" aria-label="Remove one">−</button>' +
          '<span class="cart-qty">' + item.qty + '</span>' +
          '<button class="cart-qty-btn" data-action="inc" data-name="' + n + '" aria-label="Add one">+</button>' +
          '<button class="cart-remove-btn" data-action="del" data-name="' + n + '" aria-label="Remove ' + n + '">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>';
    }).join('');

    if (totalEl) totalEl.textContent = '$' + totalPrice().toFixed(2);
  }

  // ── Open / Close ──────────────────────────────────────────────
  function openCart() {
    var drawer = document.getElementById('cart-drawer');
    var overlay = document.getElementById('cart-overlay');
    if (!drawer) return;
    drawer.classList.add('open');
    overlay.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    var drawer = document.getElementById('cart-drawer');
    var overlay = document.getElementById('cart-overlay');
    if (!drawer) return;
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // ── Hook add buttons ──────────────────────────────────────────
  var CHECK_SVG = '<svg class="cart-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  var PLUS_SVG  = '<svg class="cart-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>';

  function hookAddButtons() {
    document.querySelectorAll('.food-add:not([data-cart-hooked])').forEach(function (btn) {
      btn.dataset.cartHooked = '1';
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var card = btn.closest('.food-card');
        if (!card) return;
        var nameEl  = card.querySelector('.food-name');
        var priceEl = card.querySelector('.food-price');
        var name  = nameEl  ? nameEl.textContent.trim() : 'Item';
        var price = priceEl ? parseFloat(priceEl.textContent.replace(/[^\d.]/g, '')) || 0 : 0;
        addItem(name, price);
        btn.innerHTML = CHECK_SVG;
        btn.style.background = '#22c55e';
        setTimeout(function () { btn.innerHTML = PLUS_SVG; btn.style.background = ''; }, 1200);
      });
    });
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    injectHTML();

    // FAB
    document.getElementById('cart-fab').addEventListener('click', openCart);

    // Close controls
    document.getElementById('cart-close-btn').addEventListener('click', closeCart);
    document.getElementById('cart-overlay').addEventListener('click', closeCart);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCart(); });

    // Cart item actions (delegated)
    document.getElementById('cart-items-list').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;
      // data-name was HTML-escaped when rendered; decode it back
      var name = btn.dataset.name.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'");
      var action = btn.dataset.action;
      if (action === 'inc') changeQty(name, 1);
      else if (action === 'dec') changeQty(name, -1);
      else if (action === 'del') removeItem(name);
    });

    // Checkout
    document.getElementById('cart-checkout-btn').addEventListener('click', function () {
      closeCart();
      window.location.href = 'checkout.html';
    });

    // Hook existing add buttons
    hookAddButtons();

    // Re-hook dynamically loaded cards (Load More on menu page)
    var grid = document.getElementById('menu-grid');
    if (grid) {
      new MutationObserver(hookAddButtons).observe(grid, { childList: true });
    }

    // Sync badge on load
    refreshUI(false);

    // Expose addItem for pages that can't use .food-add buttons (e.g. food-detail.html)
    window.__eatzCartAdd = addItem;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
