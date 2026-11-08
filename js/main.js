/* ==========================================================================
   Tavola — all behaviour of the site.
   Order of business: language, theme, navigation, opening hours, menu,
   booking, other forms, gallery, reveal-on-scroll.

   Everything degrades: with JavaScript off the pages still show their
   English text, the menu page shows a note, and every phone number and
   address is a real link in the HTML.
   ========================================================================== */

(function () {
  'use strict';

  const LS_LANG = 'tavola-lang';
  const LS_THEME = 'tavola-theme';
  const root = document.documentElement;

  let lang = 'en';

  /* ---------------------------------------------------------- helpers */

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => [...(ctx || document).querySelectorAll(sel)];

  /* Looks a key up in the current language and fills {placeholders}. */
  function t(key, vars) {
    let s = (I18N[lang] && I18N[lang][key]) || (I18N.en && I18N.en[key]) || key;
    if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
    return s;
  }

  /* Which locale formats the money and the dates. Add a line here for every
     language added to i18n.js — without it the new language would print
     English dates. */
  const LOCALES = { en: 'en-GB', pl: 'pl-PL', uk: 'uk-UA' };
  const locale = () => LOCALES[lang] || 'en-GB';

  /* Plurals. English has two forms and switches at one; Polish and
     Ukrainian have three and switch on the last digit — "1 гість",
     "3 гості", "5 гостей". Getting this wrong is the first thing a native
     speaker notices, and a template that ships "3 гостей" looks machine
     translated no matter how good the rest of the text is.

     A key like 'book.guest' needs three entries: book.guest1 (one),
     book.guest2 (few), book.guest5 (many). Languages with two forms point
     the last two at the same string. */
  const SLAVIC = n => {
    const d = n % 10, h = n % 100;
    if (d === 1 && h !== 11) return '1';
    if (d >= 2 && d <= 4 && (h < 12 || h > 14)) return '2';
    return '5';
  };
  const PLURAL = { en: n => (n === 1 ? '1' : '5'), pl: SLAVIC, uk: SLAVIC };

  function plural(key, n) {
    const rule = PLURAL[lang] || PLURAL.en;
    return t(key + rule(n), { n: n });
  }

  /* Prices are plain numbers; the language decides how they are written. */
  function money(n) {
    if (!n) return t('menu.free');
    try {
      return new Intl.NumberFormat(locale(), {
        style: 'currency',
        currency: CFG.currency,
        minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
        maximumFractionDigits: 2
      }).format(n);
    } catch (e) {
      return n + ' ' + CFG.currency;     // very old browser, no Intl
    }
  }

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /* A picture slot. The blocks built in JS — the signature plates and the
     gallery — carry their file in the data, exactly like the slots written
     by hand in the HTML carry it in a style attribute. No file: the slot
     keeps its gradient instead of showing a broken image. */
  function photo(cls, src, alt) {
    return '<div class="photo ' + cls + '"' +
      (src ? ' style="background-image:url(\'' + src + '\')"' : '') +
      (alt ? ' role="img" aria-label="' + esc(alt) + '"' : '') +
      '></div>';
  }

  const pad = n => String(n).padStart(2, '0');
  const hhmm = d => pad(d.getHours()) + ':' + pad(d.getMinutes());
  const minutes = s => (+s.slice(0, 2)) * 60 + (+s.slice(3, 5));
  const iso = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());

  /* ------------------------------------------------------------- theme */

  (function theme() {
    let saved = null;
    try { saved = localStorage.getItem(LS_THEME); } catch (e) { /* private mode */ }
    if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
  })();

  function toggleTheme() {
    const dark = root.getAttribute('data-theme') === 'dark' ||
      (!root.hasAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    const next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem(LS_THEME, next); } catch (e) { /* ignore */ }
  }

  /* -------------------------------------------------------- language */

  function pickLang() {
    let saved = null;
    try { saved = localStorage.getItem(LS_LANG); } catch (e) { /* ignore */ }
    if (LANGS.indexOf(saved) > -1) return saved;
    const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return LANGS.indexOf(nav) > -1 ? nav : 'en';
  }

  function setLang(next, remember) {
    lang = LANGS.indexOf(next) > -1 ? next : 'en';
    root.setAttribute('lang', lang);
    if (remember) { try { localStorage.setItem(LS_LANG, lang); } catch (e) { /* ignore */ } }

    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });

    /* data-i18n-attr="placeholder:book.notesPh; aria-label:nav.open" */
    $$('[data-i18n-attr]').forEach(el => {
      el.dataset.i18nAttr.split(';').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        if (attr && key) el.setAttribute(attr, t(key));
      });
    });

    const titleKey = document.body.dataset.title;
    if (titleKey) document.title = t(titleKey);

    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));

    /* anything that is built from data rather than written in the HTML */
    renderCfg();
    renderHours();
    renderOpenBadge();
    renderPlates();
    renderFilters();
    renderMenu();
  }

  /* ------------------------------------------------------ opening hours */

  function todayRule(d) { return CFG.hours[d.getDay()] || null; }

  function renderOpenBadge() {
    const badge = $('[data-open-badge]');
    if (!badge) return;
    const now = new Date();
    const rule = todayRule(now);
    const label = $('.open-label', badge);
    const open = rule && minutes(hhmm(now)) >= minutes(rule.from) && minutes(hhmm(now)) < minutes(rule.to);

    badge.classList.toggle('is-open', !!open);
    if (open) {
      label.textContent = t('hours.openNow') + ' · ' + t('hours.until', { time: rule.to });
      return;
    }
    /* find the next day we are open — at most a week ahead */
    for (let i = 0; i < 8; i++) {
      const d = new Date(now); d.setDate(now.getDate() + i);
      const r = CFG.hours[d.getDay()];
      if (!r) continue;
      if (i === 0 && minutes(hhmm(now)) >= minutes(r.to)) continue;
      label.textContent = t('hours.closed') + ' · ' +
        t('hours.opensAt', { day: t('day.' + d.getDay()).toLowerCase(), time: r.from });
      return;
    }
    label.textContent = t('hours.closed');
  }

  function renderHours() {
    $$('[data-hours-table]').forEach(table => {
      const today = new Date().getDay();
      /* Monday first: that is how a European reads a week. */
      const order = [1, 2, 3, 4, 5, 6, 0];
      table.innerHTML = order.map(d => {
        const r = CFG.hours[d];
        return '<tr' + (d === today ? ' class="today"' : '') + '><td>' + t('day.' + d) + '</td>' +
          '<td>' + (r ? r.from + ' — ' + r.to : t('day.closed')) + '</td></tr>';
      }).join('');
    });
  }

  /* --------------------------------------------------------- navigation */

  function initNav() {
    const burger = $('[data-nav-toggle]');
    const close = $('.nav-close');
    if (burger) burger.addEventListener('click', () => document.body.classList.add('nav-open'));
    if (close) close.addEventListener('click', () => document.body.classList.remove('nav-open'));
    $$('.nav a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('nav-open')));
    addEventListener('keydown', e => {
      if (e.key === 'Escape') document.body.classList.remove('nav-open');
    });

    const themeBtn = $('[data-theme-toggle]');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    $$('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang, true)));

    /* mark the current page in the navigation */
    const here = location.pathname.split('/').pop() || 'index.html';
    $$('.nav a[href]').forEach(a => {
      if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
    });

  }

  /* Contacts and the tagline come from js/config.js, so a new owner edits
     one file instead of hunting through eight pages. Re-run on language
     change: the city and the tagline are translated. */
  function renderCfg() {
    $$('[data-cfg]').forEach(el => {
      const key = el.dataset.cfg;
      let val;
      if (key === 'address') {
        val = CFG.address.street + ', ' + CFG.address.zip + ' ' + CFG.address.city[lang];
      } else if (key === 'tagline') {
        val = CFG.tagline[lang];
      } else {
        val = key.split('.').reduce((o, k) => (o || {})[k], CFG);
      }
      if (typeof val === 'string') el.textContent = val;
    });
    $$('[data-cfg-href]').forEach(el => {
      const k = el.dataset.cfgHref;
      if (k === 'phone') el.href = 'tel:' + CFG.phone.replace(/\s/g, '');
      else if (k === 'email') el.href = 'mailto:' + CFG.email;
      else if (k === 'map') el.href = 'https://www.openstreetmap.org/?mlat=' + CFG.address.lat +
        '&mlon=' + CFG.address.lng + '#map=17/' + CFG.address.lat + '/' + CFG.address.lng;
      else if (k === 'instagram') el.href = CFG.social.instagram;
      else if (k === 'facebook') el.href = CFG.social.facebook;
    });
  }

  /* -------------------------------------------------------------- menu */

  const CATS = ['starters', 'mains', 'sides', 'desserts', 'drinks'];
  const DIETS = ['veg', 'vegan', 'gf', 'spicy'];
  let cat = 'all';
  let diets = [];

  /* A dish missing the current language falls back to English instead of
     throwing — one forgotten translation should not blank the whole menu. */
  const dish = d => d[lang] || d.en;

  function dishRow(d) {
    const tags = (d.tags || []).map(x =>
      '<span class="tag ' + x + '">' + t('menu.tag.' + x) + '</span>').join('');
    return '<article class="dish">' +
      '<div class="dish-name">' + dish(d).n + '</div>' +
      '<div class="dish-price' + (d.price ? '' : ' free') + '">' + money(d.price) + '</div>' +
      '<p class="dish-desc">' + dish(d).d + '</p>' +
      (tags ? '<div class="dish-tags">' + tags + '</div>' : '') +
      '</article>';
  }

  function renderMenu() {
    const host = $('[data-menu]');
    if (!host) return;

    const shown = MENU.filter(d =>
      (cat === 'all' || d.cat === cat) &&
      diets.every(x => (d.tags || []).indexOf(x) > -1));

    const counter = $('[data-menu-count]');
    if (counter) counter.textContent = t('menu.count', { n: shown.length, total: MENU.length });

    const reset = $('[data-menu-reset]');
    if (reset) reset.hidden = cat === 'all' && !diets.length;

    if (!shown.length) {
      host.innerHTML = '<p class="menu-empty" data-i18n-skip>' + t('menu.empty') + '</p>';
      return;
    }

    host.innerHTML = CATS.filter(c => shown.some(d => d.cat === c)).map(c =>
      '<section class="dish-group"><h2>' + t('menu.cat.' + c) + '</h2>' +
      shown.filter(d => d.cat === c).map(dishRow).join('') +
      '</section>').join('');
  }

  /* Rebuilt on every language change, so the chips keep their own labels.
     The click handler sits on the bar, not on the buttons, and survives. */
  function renderFilters() {
    const bar = $('[data-filters]');
    if (!bar) return;
    bar.innerHTML =
      '<div class="filter-group">' +
        '<button class="chip" data-cat="all" aria-pressed="' + (cat === 'all') + '">' + t('menu.all') + '</button>' +
        CATS.map(c => '<button class="chip" data-cat="' + c + '" aria-pressed="' + (cat === c) + '">' +
          t('menu.cat.' + c) + '</button>').join('') +
      '</div>' +
      '<div class="filter-group"><span>' + t('menu.diet') + '</span>' +
        DIETS.map(x => '<button class="chip diet" data-diet="' + x + '" aria-pressed="' +
          (diets.indexOf(x) > -1) + '">' + t('menu.tag.' + x) + '</button>').join('') +
      '</div>';
  }

  function initMenuFilters() {
    const bar = $('[data-filters]');
    if (!bar) return;

    bar.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.cat) {
        cat = b.dataset.cat;
        $$('[data-cat]', bar).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      } else if (b.dataset.diet) {
        const x = b.dataset.diet;
        const on = diets.indexOf(x) > -1;
        diets = on ? diets.filter(y => y !== x) : diets.concat(x);
        b.setAttribute('aria-pressed', String(!on));
      }
      renderMenu();
    });

    const reset = $('[data-menu-reset]');
    if (reset) reset.addEventListener('click', () => {
      cat = 'all'; diets = [];
      $$('[data-cat]', bar).forEach(x => x.setAttribute('aria-pressed', String(x.dataset.cat === 'all')));
      $$('[data-diet]', bar).forEach(x => x.setAttribute('aria-pressed', 'false'));
      renderMenu();
    });
  }

  /* three or four dishes on the home page */
  function renderPlates() {
    const host = $('[data-plates]');
    if (!host) return;
    const arts = ['photo-a', 'photo-e', 'photo-c', 'photo-g'];
    host.innerHTML = MENU.filter(d => d.star).slice(0, 4).map((d, i) =>
      '<article class="plate">' +
        photo(arts[i % arts.length], d.img, dish(d).n) +
        '<div class="plate-body">' +
          '<h3>' + dish(d).n + '</h3>' +
          '<p>' + dish(d).d + '</p>' +
          '<div class="plate-price">' + money(d.price) + '</div>' +
        '</div>' +
      '</article>').join('');
  }

  /* "from 180 per guest" — the number from the config, the sentence from
     the language file, so neither is written into the HTML. */
  /* ------------------------------------------------------------ reveal */

  function initReveal() {
    const els = $$('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: .12 });
    els.forEach(el => io.observe(el));
  }

  /* --------------------------------------------------------------- go */

  addEventListener('DOMContentLoaded', () => {
    initNav();
    initMenuFilters();
    setLang(pickLang(), false);
    initReveal();
    /* the badge is the only thing that goes stale while the page is open */
    setInterval(renderOpenBadge, 60000);
  });
})();
