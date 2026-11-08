/* ==========================================================================
   Tavola — the menu.

   This file has two halves, and they are kept apart on purpose.

   1. MENU — what a dish IS. Course, price, diet tags, whether it goes on
      the home page, which photograph it uses. No words a guest reads.

   2. MENU_TEXT — what a dish is CALLED, one block per language. Each block
      is a whole menu you can read from top to bottom in that language, and
      hand to a native speaker without the English sitting next to it.

   That second point is the reason for the split. When the three languages
   sit inside one dish, side by side, you stop writing a menu and start
   translating line by line — and a translated menu always reads like one.
   Written apart, each language gets to use its own words.

   The two halves are joined by `id` at the bottom of this file.

   MENU fields
     id      the key that ties a dish to its text. Lowercase, no spaces.
     cat     starters | mains | sides | desserts | drinks
     price   a plain number. The currency comes from CFG.currency and is
             formatted per language, so write 48, never "48 zł".
     tags    veg · vegan · gf · spicy   (any, in any order, or none)
     star    true puts the dish in the "signature plates" block on the home
             page. Keep it to three or four, or that block stops meaning
             anything. The row fits whatever number you choose.
     img     the photograph for that block. Only a starred dish needs one —
             the menu page itself is a printed-style list with no pictures.
             Leave it out and the slot falls back to its gradient.

   MENU_TEXT
     n       the name on the menu
     d       the one line under it
   A dish missing from a language block falls back to English and is named
   in a console warning, so nothing breaks and nothing goes unnoticed.
   ========================================================================== */

const MENU = [
  /* ---------- starters ---------- */
  { id: 'bread',       cat: 'starters', price: 16, tags: ['veg'] },
  { id: 'burrata',     cat: 'starters', price: 42, tags: ['veg', 'gf'], star: true, img: 'img/dish-burrata.jpg' },
  { id: 'nduja',       cat: 'starters', price: 36, tags: ['spicy'] },

  /* ---------- mains ---------- */
  { id: 'cacio',       cat: 'mains', price: 54, tags: ['veg'], star: true, img: 'img/dish-cacio.jpg' },
  { id: 'turbot',      cat: 'mains', price: 98, tags: ['gf'], star: true, img: 'img/dish-turbot.jpg' },
  { id: 'cauliflower', cat: 'mains', price: 52, tags: ['vegan', 'gf'] },

  /* ---------- sides ---------- */
  { id: 'potatoes',    cat: 'sides', price: 24, tags: ['veg', 'gf'] },
  { id: 'greens',      cat: 'sides', price: 22, tags: ['vegan', 'gf'] },

  /* ---------- desserts ---------- */
  { id: 'tiramisu',    cat: 'desserts', price: 32, tags: ['veg'], star: true, img: 'img/dish-tiramisu.jpg' },
  { id: 'sorbet',      cat: 'desserts', price: 22, tags: ['vegan', 'gf'] },

  /* ---------- drinks ---------- */
  { id: 'glass-red',   cat: 'drinks', price: 36, tags: ['vegan', 'gf'] },
  { id: 'water',       cat: 'drinks', price: 0, tags: ['vegan', 'gf'] }
];

const MENU_TEXT = {

  /* ======================================================= ENGLISH ===== */
  en: {
    bread:       { n: 'Bread & cultured butter',          d: 'Baked this morning, salted butter churned in-house.' },
    burrata:     { n: 'Burrata, roast grapes, hazelnut',  d: 'Grapes blistered over the fire, brown butter, aged balsamic.' },
    nduja:       { n: "'Nduja toast, honey, pecorino",    d: 'Calabrian sausage on grilled sourdough. Properly hot.' },

    cacio:       { n: 'Tonnarelli cacio e pepe',          d: 'Rolled this morning, pecorino romano, black pepper toasted to order.' },
    turbot:      { n: 'Whole turbot over the fire',       d: 'For two. Brown butter, capers, whatever green is best that week.' },
    cauliflower: { n: 'Whole charred cauliflower, tahini', d: 'Cooked in the embers for an hour, pomegranate, toasted seeds.' },

    potatoes:    { n: 'Fire potatoes, rosemary salt',     d: 'Crushed, crisped in beef fat. Ask and we make them vegan.' },
    greens:      { n: 'Grilled greens, lemon, chilli',    d: 'Whatever came in that morning, hard-grilled.' },

    tiramisu:    { n: 'Tiramisù',                         d: 'Soft and cold, with mascarpone and espresso. We make it every morning.' },
    sorbet:      { n: 'Seasonal sorbet',                  d: 'One fruit, sugar, nothing else. Ask what it is today.' },

    'glass-red':   { n: 'Red, by the glass',              d: 'Six on the list. Two of them are served cool, on purpose.' },
    water:       { n: 'Filtered water',                   d: 'Still or sparkling, no charge, as much as you like.' }
  },

  /* ======================================================== POLSKI ===== */
  pl: {
    bread:       { n: 'Chleb i masło',                    d: 'Pieczony dziś rano, masło ubijamy sami.' },
    burrata:     { n: 'Burrata, pieczone winogrona, orzech laskowy', d: 'Winogrona przypieczone na ogniu, masło noisette, leżakowany ocet balsamiczny.' },
    nduja:       { n: "Grzanka z 'ndują, miód, pecorino", d: 'Kalabryjska kiełbasa na grillowanym chlebie na zakwasie. Naprawdę ostra.' },

    cacio:       { n: 'Tonnarelli cacio e pepe',          d: 'Wałkowane dziś rano, pecorino romano, pieprz prażony na zamówienie.' },
    turbot:      { n: 'Turbot z ognia, w całości',        d: 'Dla dwojga. Masło noisette, kapary i najlepsza zielenina tego tygodnia.' },
    cauliflower: { n: 'Kalafior pieczony w całości, tahini', d: 'Godzina w żarze, granat, prażone pestki.' },

    potatoes:    { n: 'Ziemniaki z ognia, sól rozmarynowa', d: 'Zgniatane, przypieczone na wołowym tłuszczu. Na życzenie wersja wegańska.' },
    greens:      { n: 'Grillowana zielenina, cytryna, chilli', d: 'To, co przyjechało rano, mocno przypieczone.' },

    tiramisu:    { n: 'Tiramisù',                         d: 'Delikatne, zimne, z mascarpone i espresso. Robimy je co rano.' },
    sorbet:      { n: 'Sorbet sezonowy',                  d: 'Jeden owoc, cukier i nic więcej. Zapytajcie, jaki jest dziś.' },

    'glass-red':   { n: 'Wino czerwone, kieliszek',       d: 'Sześć pozycji. Dwa podajemy schłodzone — celowo.' },
    water:       { n: 'Woda filtrowana',                  d: 'Gazowana lub nie, bez opłat, do woli.' }
  },

  /* ==================================================== УКРАЇНСЬКА ===== */
  uk: {
    bread:       { n: 'Хліб і масло',                     d: 'Спечений сьогодні вранці, солоне масло збиваємо самі.' },
    burrata:     { n: 'Бурата, печений виноград, фундук', d: 'Виноград підпечений на вогні, підрум’янене масло, витриманий бальзамік.' },
    nduja:       { n: 'Грінка з ндуєю, мед, пекоріно',    d: 'Калабрійська ковбаса на хлібі із закваски, просто з грилю. Справді гостра.' },

    cacio:       { n: 'Тоннареллі качо е пепе',           d: 'Розкачані сьогодні вранці, пекоріно романо, перець обсмажуємо на замовлення.' },
    turbot:      { n: 'Тюрбо на вогні, цілий',            d: 'На двох. Підрум’янене масло, каперси і найкраща зелень цього тижня.' },
    cauliflower: { n: 'Цвітна капуста, запечена цілою, тахіні', d: 'Година в жарі, гранат, підсмажене насіння.' },

    potatoes:    { n: 'Картопля з вогню, розмаринова сіль', d: 'Прим’ята, підсмажена на яловичому жирі. На прохання зробимо веганською.' },
    greens:      { n: 'Зелень на грилі, лимон, чилі',     d: 'Те, що приїхало зранку, добре підпечене.' },

    tiramisu:    { n: 'Тірамісу',                         d: 'Ніжне, холодне, з маскарпоне й еспресо. Готуємо щоранку.' },
    sorbet:      { n: 'Сезонний сорбет',                  d: 'Один фрукт, цукор і нічого більше. Запитайте, який він сьогодні.' },

    'glass-red':   { n: 'Червоне вино, келих',            d: 'Шість позицій. Два з них подаємо прохолодними — свідомо.' },
    water:       { n: 'Фільтрована вода',                 d: 'З газом або без, безкоштовно, скільки завгодно.' }
  }
};

/* --------------------------------------------------------------------------
   Joining the two halves. Every dish gets d.en / d.pl / d.uk, which is what
   the rest of the site reads — so nothing else in the template knows that
   the text lives in its own blocks.

   Anything that does not line up is reported once, by name, in the console:
   a dish with no text in some language (it falls back to English), and text
   written for an id that no dish has (a typo, or a dish you deleted).
   -------------------------------------------------------------------------- */
(function joinMenuText() {
  const codes = Object.keys(MENU_TEXT);
  const ids = MENU.map(d => d.id);
  const missing = [];

  MENU.forEach(d => codes.forEach(c => {
    const text = MENU_TEXT[c][d.id];
    if (text) d[c] = text;
    else missing.push(c + ' → ' + d.id);
  }));

  const orphans = [];
  codes.forEach(c => Object.keys(MENU_TEXT[c]).forEach(id => {
    if (ids.indexOf(id) === -1) orphans.push(c + ' → ' + id);
  }));

  if (typeof console === 'undefined') return;
  if (missing.length) {
    console.warn('Tavola: no menu text for ' + missing.length +
      ' dish/language pair(s); English is used instead.\n  ' + missing.join('\n  '));
  }
  if (orphans.length) {
    console.warn('Tavola: menu text written for ' + orphans.length +
      ' id(s) that no dish uses — check the spelling.\n  ' + orphans.join('\n  '));
  }
})();
