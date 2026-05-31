(function () {
  'use strict';

  var STORAGE_KEY = 'eatz_cookie_consent';

  function getConsent() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
  }

  var CSS = [
    '#__eatz_cookie_overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9000;',
      'display:flex;align-items:center;justify-content:center;padding:16px;',
      'animation:__eatz_ck_fade_in 220ms cubic-bezier(.16,1,.3,1)}',
    '@keyframes __eatz_ck_fade_in{from{opacity:0}to{opacity:1}}',
    '#__eatz_cookie_modal{background:#fff;border-radius:20px;width:100%;max-width:560px;',
      'max-height:90vh;display:flex;flex-direction:column;overflow:hidden;',
      'box-shadow:0 24px 64px rgba(0,0,0,.18),0 4px 16px rgba(0,0,0,.08);',
      'animation:__eatz_ck_slide_up 280ms cubic-bezier(.34,1.56,.64,1)}',
    '@keyframes __eatz_ck_slide_up{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}',
    '#__eatz_cookie_body{padding:28px 28px 0;overflow-y:auto;flex:1;scrollbar-width:thin;scrollbar-color:#e1c0b1 transparent}',
    '#__eatz_cookie_body::-webkit-scrollbar{width:5px}',
    '#__eatz_cookie_body::-webkit-scrollbar-track{background:transparent}',
    '#__eatz_cookie_body::-webkit-scrollbar-thumb{background:#e1c0b1;border-radius:4px}',
    '.__eatz_ck_title{font-family:"Manrope",sans-serif;font-size:22px;font-weight:800;',
      'color:#1b1c1c;margin-bottom:14px;line-height:1.25}',
    '.__eatz_ck_para{font-family:"Manrope",sans-serif;font-size:14px;color:#594236;',
      'line-height:1.65;margin-bottom:10px}',
    '.__eatz_ck_link{color:#f66d09;font-weight:600;text-decoration:none;',
      'border-bottom:1px solid transparent;transition:border-color 150ms}',
    '.__eatz_ck_link:hover{border-bottom-color:#f66d09}',
    '.__eatz_ck_section{margin-top:20px}',
    '.__eatz_ck_section_title{font-family:"Manrope",sans-serif;font-size:16px;font-weight:800;',
      'color:#1b1c1c;margin-bottom:6px}',
    '.__eatz_ck_section_desc{font-family:"Manrope",sans-serif;font-size:13px;color:#594236;line-height:1.6}',
    '#__eatz_cookie_footer{padding:20px 28px 24px;border-top:1px solid #f0eded;',
      'display:flex;gap:10px;flex-wrap:wrap;margin-top:20px}',
    '.__eatz_ck_btn{flex:1;min-width:120px;font-family:"Manrope",sans-serif;font-size:13px;font-weight:700;',
      'padding:12px 10px;border-radius:10px;border:2px solid #f66d09;background:#fff;',
      'color:#f66d09;cursor:pointer;letter-spacing:.01em;transition:all 150ms cubic-bezier(.16,1,.3,1);',
      'line-height:1.2;text-align:center}',
    '.__eatz_ck_btn:hover{background:#fff8f4;box-shadow:0 4px 16px rgba(246,109,9,.15)}',
    '.__eatz_ck_btn:active{transform:scale(.97)}',
    '.__eatz_ck_btn_primary{background:#f66d09;color:#fff}',
    '.__eatz_ck_btn_primary:hover{background:#e05e00;border-color:#e05e00;box-shadow:0 8px 24px rgba(246,109,9,.3)}',
    /* Manage panel */
    '#__eatz_ck_manage_panel{display:none;padding:0 28px 20px}',
    '#__eatz_ck_manage_panel.open{display:block}',
    '.__eatz_ck_toggle_row{display:flex;align-items:center;justify-content:space-between;',
      'padding:14px 0;border-bottom:1px solid #f0eded}',
    '.__eatz_ck_toggle_row:last-child{border-bottom:none}',
    '.__eatz_ck_toggle_label{font-family:"Manrope",sans-serif;font-size:14px;font-weight:700;color:#1b1c1c}',
    '.__eatz_ck_toggle_sub{font-family:"Manrope",sans-serif;font-size:12px;color:#8d7164;margin-top:2px}',
    '.__eatz_ck_switch{position:relative;width:42px;height:24px;flex-shrink:0}',
    '.__eatz_ck_switch input{opacity:0;width:0;height:0;position:absolute}',
    '.__eatz_ck_slider{position:absolute;inset:0;background:#efeded;border-radius:24px;',
      'cursor:pointer;transition:background 200ms}',
    '.__eatz_ck_slider::before{content:"";position:absolute;width:18px;height:18px;',
      'background:#fff;border-radius:50%;top:3px;left:3px;',
      'transition:transform 200ms cubic-bezier(.34,1.56,.64,1);',
      'box-shadow:0 1px 4px rgba(0,0,0,.18)}',
    '.__eatz_ck_switch input:checked + .__eatz_ck_slider{background:#f66d09}',
    '.__eatz_ck_switch input:checked + .__eatz_ck_slider::before{transform:translateX(18px)}',
    '.__eatz_ck_switch input:disabled + .__eatz_ck_slider{opacity:.5;cursor:not-allowed}',
    '@media(max-width:480px){#__eatz_cookie_footer{flex-direction:column}.__eatz_ck_btn{min-width:unset}}'
  ].join('');

  function injectStyles() {
    if (document.getElementById('__eatz_ck_css')) return;
    var s = document.createElement('style');
    s.id = '__eatz_ck_css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function dismiss() {
    var overlay = document.getElementById('__eatz_cookie_overlay');
    if (!overlay) return;
    overlay.style.animation = 'none';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 200ms';
    requestAnimationFrame(function () {
      overlay.style.opacity = '0';
      setTimeout(function () { overlay.remove(); }, 210);
    });
  }

  function saveAndDismiss(value) {
    setConsent(value);
    dismiss();
  }

  function buildModal() {
    injectStyles();

    var overlay = document.createElement('div');
    overlay.id = '__eatz_cookie_overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', '__eatz_ck_title');

    overlay.innerHTML =
      '<div id="__eatz_cookie_modal">' +
        '<div id="__eatz_cookie_body">' +
          '<h2 class="__eatz_ck_title" id="__eatz_ck_title">We value your privacy</h2>' +
          '<p class="__eatz_ck_para">We use cookies to improve your shopping experience and show you relevant offers. ' +
            'Necessary cookies keep the site running, while others help us personalize your experience. ' +
            'Learn more in our <a class="__eatz_ck_link" href="#" tabindex="0">Privacy Policy</a></p>' +
          '<p class="__eatz_ck_para">you can check also check our &nbsp;<a class="__eatz_ck_link" href="#" tabindex="0">Cookie Notice</a></p>' +
          '<p class="__eatz_ck_para">You can always change your cookie preference from help menu, or change your preferences from this ' +
            '<a class="__eatz_ck_link" href="#" id="__eatz_ck_pref_link" tabindex="0">cookie preferences link</a></p>' +
          '<div class="__eatz_ck_section">' +
            '<div class="__eatz_ck_section_title">Essential cookies</div>' +
            '<div class="__eatz_ck_section_desc">Essential for the website to function. Enable shopping cart, secure checkout, and account access.</div>' +
          '</div>' +
          '<div class="__eatz_ck_section" style="margin-bottom:4px">' +
            '<div class="__eatz_ck_section_title">Optional Cookies</div>' +
            '<div class="__eatz_ck_section_desc">These cookies help us personalize your experience, show you relevant offers, ' +
              'and improve our services based on your preferences and browsing behavior.</div>' +
          '</div>' +
        '</div>' +
        /* Manage panel (hidden by default) */
        '<div id="__eatz_ck_manage_panel">' +
          '<div class="__eatz_ck_toggle_row">' +
            '<div><div class="__eatz_ck_toggle_label">Essential cookies</div>' +
              '<div class="__eatz_ck_toggle_sub">Always active — required for the site to work</div></div>' +
            '<label class="__eatz_ck_switch"><input type="checkbox" checked disabled>' +
              '<span class="__eatz_ck_slider"></span></label>' +
          '</div>' +
          '<div class="__eatz_ck_toggle_row">' +
            '<div><div class="__eatz_ck_toggle_label">Optional cookies</div>' +
              '<div class="__eatz_ck_toggle_sub">Personalization, analytics &amp; relevant offers</div></div>' +
            '<label class="__eatz_ck_switch"><input type="checkbox" id="__eatz_ck_optional_toggle" checked>' +
              '<span class="__eatz_ck_slider"></span></label>' +
          '</div>' +
        '</div>' +
        '<div id="__eatz_cookie_footer">' +
          '<button class="__eatz_ck_btn" id="__eatz_ck_manage">Manage Cookies</button>' +
          '<button class="__eatz_ck_btn" id="__eatz_ck_reject">Reject Optional Cookies</button>' +
          '<button class="__eatz_ck_btn __eatz_ck_btn_primary" id="__eatz_ck_accept">Accept All Cookies</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);

    /* Button bindings */
    document.getElementById('__eatz_ck_accept').addEventListener('click', function () {
      saveAndDismiss('all');
    });

    document.getElementById('__eatz_ck_reject').addEventListener('click', function () {
      saveAndDismiss('essential');
    });

    var manageBtn = document.getElementById('__eatz_ck_manage');
    var managePanel = document.getElementById('__eatz_ck_manage_panel');
    manageBtn.addEventListener('click', function () {
      var isOpen = managePanel.classList.contains('open');
      if (isOpen) {
        managePanel.classList.remove('open');
        manageBtn.textContent = 'Manage Cookies';
        /* Save with current toggle state */
        var optionalOn = document.getElementById('__eatz_ck_optional_toggle').checked;
        saveAndDismiss(optionalOn ? 'all' : 'essential');
      } else {
        managePanel.classList.add('open');
        manageBtn.textContent = 'Save Preferences';
        /* Scroll manage panel into view */
        managePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    /* Preferences link re-opens manage panel */
    var prefLink = document.getElementById('__eatz_ck_pref_link');
    if (prefLink) {
      prefLink.addEventListener('click', function (e) {
        e.preventDefault();
        if (!managePanel.classList.contains('open')) {
          managePanel.classList.add('open');
          manageBtn.textContent = 'Save Preferences';
        }
      });
    }

    /* Trap focus inside modal */
    overlay.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusable = overlay.querySelectorAll('button:not([disabled]),a[href],input:not([disabled])');
      var first = focusable[0];
      var last  = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    });

    /* Focus first button on open */
    setTimeout(function () {
      var first = overlay.querySelector('button');
      if (first) first.focus();
    }, 50);
  }

  function init() {
    if (getConsent()) return;
    buildModal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
