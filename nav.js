(function () {
  'use strict';

  var USER_KEY = 'eatz_user';

  function getUser() {
    try { return JSON.parse(localStorage.getItem(USER_KEY)) || null; }
    catch (e) { return null; }
  }

  // ── Inject styles ─────────────────────────────────────────────
  var CSS = [
    /* Desktop user button */
    '.nav-user{position:relative;display:flex;align-items:center}',
    '.nav-user-btn{display:flex;align-items:center;gap:8px;background:transparent;border:none;cursor:pointer;',
      'padding:6px 10px 6px 8px;border-radius:10px;transition:background 150ms;font-family:"Manrope",sans-serif;min-height:44px}',
    '.nav-user-btn:hover{background:rgba(255,255,255,.1)}',
    '.nav-user-btn:active{background:rgba(255,255,255,.06)}',
    '.nav-avatar{width:34px;height:34px;background:#f66d09;border-radius:50%;display:flex;align-items:center;',
      'justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0;user-select:none;letter-spacing:0}',
    '.nav-greeting{font-size:14px;font-weight:600;color:rgba(255,255,255,.9);white-space:nowrap;',
      'max-width:130px;overflow:hidden;text-overflow:ellipsis}',
    '.nav-chevron-icon{color:rgba(255,255,255,.6);flex-shrink:0;transition:transform 200ms;display:flex;align-items:center}',
    '.nav-user-btn[aria-expanded="true"] .nav-chevron-icon{transform:rotate(180deg)}',
    /* Dropdown panel */
    '.nav-dropdown{position:absolute;top:calc(100% + 10px);right:0;background:#fff;border-radius:16px;',
      'box-shadow:0 12px 40px rgba(0,0,0,.15),0 2px 8px rgba(0,0,0,.06);border:1px solid #e1c0b1;',
      'min-width:220px;padding:8px;opacity:0;pointer-events:none;',
      'transform:translateY(-6px) scale(.97);transition:opacity 180ms cubic-bezier(.16,1,.3,1),transform 180ms cubic-bezier(.16,1,.3,1);',
      'z-index:300;transform-origin:top right}',
    '.nav-dropdown.open{opacity:1;pointer-events:all;transform:translateY(0) scale(1)}',
    '.nav-dd-user-info{padding:12px 14px 10px;border-bottom:1px solid #efeded;margin-bottom:6px}',
    '.nav-dd-full-name{font-size:14px;font-weight:800;color:#1b1c1c;font-family:"Manrope",sans-serif;line-height:1.3}',
    '.nav-dd-email{font-size:12px;color:#8d7164;font-family:"Manrope",sans-serif;margin-top:2px}',
    '.nav-dd-item{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;',
      'color:#1b1c1c;text-decoration:none;font-size:14px;font-weight:600;',
      'transition:background 150ms,color 150ms;width:100%;border:none;background:transparent;',
      'cursor:pointer;font-family:"Manrope",sans-serif;text-align:left;line-height:1.3}',
    '.nav-dd-item:hover{background:#f5f3f3;color:#f66d09}',
    '.nav-dd-item svg{flex-shrink:0;color:#8d7164;transition:color 150ms}',
    '.nav-dd-item:hover svg{color:#f66d09}',
    '.nav-dd-divider{height:1px;background:#e1c0b1;margin:6px 0}',
    '.nav-dd-logout{color:#ef4444!important}',
    '.nav-dd-logout:hover{background:#fef2f2!important;color:#dc2626!important}',
    '.nav-dd-logout svg{color:#ef4444!important}',
    '.nav-dd-logout:hover svg{color:#dc2626!important}',
    /* Sign In rectangle button (unauthenticated state) */
    '.nav-signin-btn{display:inline-flex;align-items:center;gap:7px;background:transparent;color:rgba(255,255,255,.85);',
      'border:2px solid rgba(255,255,255,.28);border-radius:8px;padding:9px 18px;',
      'font-family:"Manrope",sans-serif;font-size:14px;font-weight:600;letter-spacing:.01em;',
      'text-decoration:none;cursor:pointer;transition:all 150ms cubic-bezier(.16,1,.3,1);min-height:44px}',
    '.nav-signin-btn:hover{background:rgba(255,255,255,.09);color:#fff;border-color:rgba(255,255,255,.45)}',
    '.nav-signin-btn:active{transform:scale(.97)}',
    /* Mobile user bar */
    '.mob-user-bar{padding:14px 16px 12px;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:4px;',
      'display:flex;align-items:center;gap:12px}',
    '.mob-avatar{width:42px;height:42px;background:#f66d09;border-radius:50%;display:flex;align-items:center;',
      'justify-content:center;font-size:15px;font-weight:800;color:#fff;flex-shrink:0}',
    '.mob-user-name{font-size:15px;font-weight:700;color:#fff;font-family:"Manrope",sans-serif}',
    '.mob-user-email{font-size:12px;color:rgba(255,255,255,.45);font-family:"Manrope",sans-serif;margin-top:1px}',
    '.mob-auth-divider{height:1px;background:rgba(255,255,255,.08);margin:4px 16px}',
    '.mob-logout-btn{display:block;width:100%;text-align:left;color:#ef4444;background:none;border:none;',
      'font-family:"Manrope",sans-serif;font-size:15px;font-weight:500;padding:12px 16px;',
      'border-radius:8px;cursor:pointer;transition:background 150ms}',
    '.mob-logout-btn:hover{background:rgba(239,68,68,.1)}',
    /* Mobile sign-in button */
    'a.mob-signin-btn{display:flex!important;align-items:center;justify-content:center;',
      'width:calc(100% - 32px);margin:8px 16px;padding:13px 20px!important;',
      'background:transparent!important;color:rgba(255,255,255,.85)!important;border:2px solid rgba(255,255,255,.28);',
      'border-radius:10px!important;font-family:"Manrope",sans-serif;font-size:15px;font-weight:600;',
      'text-decoration:none;letter-spacing:.01em;transition:all 150ms}',
    'a.mob-signin-btn:hover{background:rgba(255,255,255,.08)!important;color:#fff!important;border-color:rgba(255,255,255,.45)}'
  ].join('');

  function injectStyles() {
    if (document.getElementById('__eatz_nav_css')) return;
    var s = document.createElement('style');
    s.id = '__eatz_nav_css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  // ── SVG helpers ───────────────────────────────────────────────
  function svg(paths) {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
           'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>';
  }

  var IC = {
    account:  svg('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),
    orders:   svg('<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>'),
    inbox:    svg('<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>'),
    wishlist: svg('<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>'),
    voucher:  svg('<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>'),
    logout:   svg('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>'),
    chevron: '<svg class="nav-chevron-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>'
  };

  function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  function ddLink(ic, label, href) {
    return '<a href="' + esc(href) + '" class="nav-dd-item" role="menuitem">' + ic + esc(label) + '</a>';
  }

  // ── Desktop nav ───────────────────────────────────────────────
  function updateDesktopNav(user) {
    var navActions = document.querySelector('.nav-actions');
    var navLinks   = document.querySelector('.nav-links');
    if (!navActions) return;

    // Clear existing Sign In / Order Now buttons
    navActions.innerHTML = '';

    // Remove any previously injected Sign In link
    if (navLinks) {
      var prev = navLinks.querySelector('[data-nav-signin]');
      if (prev && prev.parentElement) prev.parentElement.remove();
    }

    if (!user) {
      // Show Sign In as a rectangle button in nav-actions
      navActions.style.display = 'flex';
      navActions.innerHTML =
        '<a href="signin.html" class="nav-signin-btn" aria-label="Sign in to your account">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>' +
          'Sign In' +
        '</a>';
    } else {
      // Show avatar + dropdown in nav-actions
      navActions.style.display = 'flex';
      var initial  = (user.firstName || 'U').charAt(0).toUpperCase();
      var greeting = 'Hi, ' + esc(user.firstName || 'User');
      var fullName = esc(((user.firstName || '') + ' ' + (user.lastName || '')).trim());
      var email    = esc(user.email || '');

      navActions.innerHTML =
        '<div class="nav-user" id="__nav_user">' +
          '<button class="nav-user-btn" id="__nav_user_btn"' +
            ' aria-haspopup="menu" aria-expanded="false" aria-label="Account menu">' +
            '<div class="nav-avatar" aria-hidden="true">' + esc(initial) + '</div>' +
            '<span class="nav-greeting">' + greeting + '</span>' +
            IC.chevron +
          '</button>' +
          '<div class="nav-dropdown" id="__nav_dropdown" role="menu" aria-hidden="true">' +
            '<div class="nav-dd-user-info">' +
              '<div class="nav-dd-full-name">' + fullName + '</div>' +
              (email ? '<div class="nav-dd-email">' + email + '</div>' : '') +
            '</div>' +
            ddLink(IC.account,  'My Account', '#') +
            ddLink(IC.orders,   'Orders',     'orders.html') +
            ddLink(IC.inbox,    'Inbox',       '#') +
            ddLink(IC.wishlist, 'Wishlist',    '#') +
            ddLink(IC.voucher,  'Voucher',     '#') +
            '<div class="nav-dd-divider" aria-hidden="true"></div>' +
            '<button class="nav-dd-item nav-dd-logout" role="menuitem" onclick="eatzSignOut()">' +
              IC.logout + 'Logout' +
            '</button>' +
          '</div>' +
        '</div>';

      bindDropdown();
    }
  }

  function bindDropdown() {
    var btn  = document.getElementById('__nav_user_btn');
    var drop = document.getElementById('__nav_dropdown');
    var wrap = document.getElementById('__nav_user');
    if (!btn || !drop) return;

    function open()  { drop.classList.add('open');    btn.setAttribute('aria-expanded','true');  drop.setAttribute('aria-hidden','false'); }
    function close() { drop.classList.remove('open'); btn.setAttribute('aria-expanded','false'); drop.setAttribute('aria-hidden','true');  }

    btn.addEventListener('click', function (e) { e.stopPropagation(); drop.classList.contains('open') ? close() : open(); });
    document.addEventListener('click', function (e) { if (wrap && !wrap.contains(e.target)) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  // ── Mobile menu ───────────────────────────────────────────────
  function updateMobileMenu(user) {
    var mm = document.getElementById('mobile-menu');
    if (!mm) return;

    // Remove the old Sign In + Order Now buttons block
    var oldActions = mm.querySelector('.mobile-actions');
    if (oldActions) oldActions.remove();

    // Remove previously injected items
    mm.querySelectorAll('[data-mob-nav]').forEach(function (el) { el.remove(); });

    var list = mm.querySelector('ul');
    if (!list) return;

    function tryClose() { if (typeof closeMenu === 'function') closeMenu(); }

    if (!user) {
      var li = document.createElement('li');
      li.setAttribute('data-mob-nav', '');
      li.innerHTML = '<a href="signin.html" class="mob-signin-btn">Sign In</a>';
      li.querySelector('a').addEventListener('click', tryClose);
      list.appendChild(li);
    } else {
      // User bar above the list
      var bar = document.createElement('div');
      bar.className = 'mob-user-bar';
      bar.setAttribute('data-mob-nav', '');
      var initial = (user.firstName || 'U').charAt(0).toUpperCase();
      bar.innerHTML =
        '<div class="mob-avatar" aria-hidden="true">' + esc(initial) + '</div>' +
        '<div>' +
          '<div class="mob-user-name">' + esc('Hi, ' + (user.firstName || 'User')) + '</div>' +
          '<div class="mob-user-email">' + esc(user.email || '') + '</div>' +
        '</div>';
      mm.insertBefore(bar, mm.firstChild);

      // Divider
      var divLi = document.createElement('li');
      divLi.setAttribute('data-mob-nav', '');
      divLi.innerHTML = '<div class="mob-auth-divider" aria-hidden="true"></div>';
      list.appendChild(divLi);

      // Auth link items
      [['My Account','#'],['Orders','orders.html'],['Inbox','#'],['Wishlist','#'],['Voucher','#']].forEach(function (pair) {
        var al = document.createElement('li');
        al.setAttribute('data-mob-nav', '');
        al.innerHTML = '<a href="' + esc(pair[1]) + '">' + esc(pair[0]) + '</a>';
        al.querySelector('a').addEventListener('click', tryClose);
        list.appendChild(al);
      });

      // Logout
      var logoutLi = document.createElement('li');
      logoutLi.setAttribute('data-mob-nav', '');
      var logoutBtn = document.createElement('button');
      logoutBtn.className = 'mob-logout-btn';
      logoutBtn.textContent = 'Logout';
      logoutBtn.addEventListener('click', function () { tryClose(); eatzSignOut(); });
      logoutLi.appendChild(logoutBtn);
      list.appendChild(logoutLi);
    }
  }

  // ── Sign out ──────────────────────────────────────────────────
  window.eatzSignOut = function () {
    try { localStorage.removeItem(USER_KEY); } catch (e) {}
    window.location.reload();
  };

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    injectStyles();
    var user = getUser();
    updateDesktopNav(user);
    updateMobileMenu(user);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
