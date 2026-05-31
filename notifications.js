/* Guard against double-load */
if (!window.eatzNotify) {
  (function () {
    'use strict';

    var KEY        = 'eatz_notifications';
    var SEEDED_KEY = 'eatz_notif_seeded_v1';

    /* ── Storage helpers ───────────────────────────────────────── */
    function getAll() {
      try { return JSON.parse(localStorage.getItem(KEY)) || []; }
      catch (e) { return []; }
    }

    function save(list) {
      try { localStorage.setItem(KEY, JSON.stringify(list)); }
      catch (e) {}
    }

    /* ── Public API ─────────────────────────────────────────────── */
    function add(type, title, body, href) {
      var list = getAll();
      var now  = Date.now();
      /* Prevent exact-duplicate within 10 seconds */
      var dup = list.some(function (n) {
        return n.type === type && n.title === title && (now - n.timestamp) < 10000;
      });
      if (dup) return;
      list.unshift({
        id:        now + '-' + Math.random().toString(36).substr(2, 9),
        type:      type,
        title:     title,
        body:      body  || '',
        href:      href  || '#',
        timestamp: now,
        read:      false
      });
      save(list);
    }

    function getUnreadCount() {
      return getAll().filter(function (n) { return !n.read; }).length;
    }

    function markAllRead() {
      var list    = getAll();
      var changed = false;
      list.forEach(function (n) { if (!n.read) { n.read = true; changed = true; } });
      if (changed) save(list);
    }

    function markRead(id) {
      var list    = getAll();
      var changed = false;
      list.forEach(function (n) {
        if (n.id === id && !n.read) { n.read = true; changed = true; }
      });
      if (changed) save(list);
    }

    /* ── Seed welcome promo once ─────────────────────────────────── */
    function seedPromo() {
      try {
        if (localStorage.getItem(SEEDED_KEY)) return;
        localStorage.setItem(SEEDED_KEY, '1');
      } catch (e) { return; }
      var list = getAll();
      list.push({
        id:        'promo-welcome-eatz',
        type:      'promo',
        title:     'Welcome to Eatz! Grab 10% off',
        body:      'Use code EATZ10 at checkout for 10% off your first order. Valid for 7 days.',
        href:      'menu.html',
        timestamp: Date.now(),
        read:      false
      });
      save(list);
    }

    seedPromo();

    /* ── Process any pending notification set by page scripts ────── */
    if (window._eatzPendingNotif) {
      var p = window._eatzPendingNotif;
      add(p.type, p.title, p.body, p.href);
      window._eatzPendingNotif = null;
    }

    window.eatzNotify = {
      add:            add,
      getAll:         getAll,
      getUnreadCount: getUnreadCount,
      markAllRead:    markAllRead,
      markRead:       markRead
    };
  })();
}
