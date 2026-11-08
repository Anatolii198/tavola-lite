/* ==========================================================================
   Tavola — every piece of text on the site, in both languages.

   How it works: an element carries data-i18n="key" and gets its text from
   here. For an attribute, use data-i18n-attr="placeholder:key" (several
   pairs separated by ';'). The <title> of each page comes from the key in
   <body data-title="…">.

   Adding a language: copy the `pl` block, translate it, add the code to
   LANGS below and a button in the header of every page. Nothing else.

   ⚠️ Polish is longer than English — usually 10-20%, sometimes much more
   ("Reservations" → "Rezerwacje" is shorter, but "Book a table" →
   "Zarezerwuj stolik" is 40% longer). Check buttons and table headers in
   Polish before shipping a change, not only in English.
   ========================================================================== */

const LANGS = ['en', 'pl', 'uk'];

const I18N = {
  en: {
    /* ---- shell ---- */
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.open': 'Open menu',
    'nav.theme': 'Switch theme',

    'hours.openNow': 'Open now',
    'hours.closed': 'Closed now',
    'hours.until': 'until {time}',
    'hours.opensAt': 'opens {day} at {time}',
    'hours.closedToday': 'Closed today',

    'foot.hours': 'Opening hours',
    'foot.find': 'Find us',
    'foot.follow': 'Follow',
    'foot.rights': 'All rights reserved.',
    'foot.built': 'Tavola — restaurant website template. No tracking, no external fonts.',
    'foot.map': 'Open in maps',

    'day.0': 'Sunday',
    'day.1': 'Monday',
    'day.2': 'Tuesday',
    'day.3': 'Wednesday',
    'day.4': 'Thursday',
    'day.5': 'Friday',
    'day.6': 'Saturday',
    'day.closed': 'Closed',

    /* ---- home ---- */
    'title.home': 'Tavola — Kitchen & Wine, Warsaw',
    'home.eyebrow': 'Warsaw · since 2014',
    'home.h1': 'Food worth\nsitting down for.',
    'home.lead': 'A small kitchen with an open fire, a short menu that changes with the season, and a wine list built from growers we have actually met.',
    'home.cta2': 'See the menu',
    'home.scroll': 'Scroll',

    'home.marqueeA': 'Open fire',
    'home.marqueeB': 'Seasonal menu',
    'home.marqueeC': 'Natural wine',
    'home.marqueeD': 'Daily bread',

    'home.aboutEyebrow': 'The kitchen',
    'home.aboutH': 'Twelve dishes. All of them finished at the pass, none of them waiting.',
    'home.aboutP': 'We cook what the market gives us that week, so the menu is short on purpose. Bread is baked every morning, pasta is rolled by hand, and the fire does most of the rest. If a dish is on the board, it is because it is worth the space.',

    'home.statYears': 'Years open',
    'home.statSeats': 'Seats',
    'home.statDishes': 'Dishes on the board',
    'home.statWines': 'Wines by the glass',

    'home.menuEyebrow': 'This week',
    'home.menuH': 'Signature plates',
    'home.menuP': 'A handful from the current board. The full menu changes every few weeks.',
    'home.menuLink': 'Full menu',


    'home.quote': 'The kind of place you book for Thursday and end up returning to on Saturday.',
    'home.quoteBy': 'Warsaw Food Guide',


    /* ---- menu page ---- */
    'title.menu': 'Menu — Tavola',
    'menu.eyebrow': 'The board',
    'menu.h1': 'Menu',
    'menu.lead': 'Prices include VAT. Tell us about allergies when you order — the kitchen will tell you honestly what can and cannot be changed.',
    'menu.all': 'Everything',
    'menu.cat.starters': 'Starters',
    'menu.cat.mains': 'Mains',
    'menu.cat.sides': 'Sides',
    'menu.cat.desserts': 'Desserts',
    'menu.cat.drinks': 'Wine & drinks',
    'menu.diet': 'Dietary',
    'menu.tag.veg': 'Vegetarian',
    'menu.tag.vegan': 'Vegan',
    'menu.tag.gf': 'Gluten-free',
    'menu.tag.spicy': 'Spicy',
    'menu.empty': 'Nothing on the board matches those filters. Try removing one.',
    'menu.count': '{n} of {total} dishes',
    'menu.free': 'no charge',
    'menu.reset': 'Clear filters',
    'menu.note': 'A 10% service charge is added for parties of six or more. It goes to the team.',

    /* ---- reservations ---- */
    /* three plural forms — see `plural()` in main.js */

    /* ---- about ---- */

    /* ---- gallery ---- */

    /* ---- events ---- */

    /* ---- contact ---- */

    /* ---- 404 ---- */
    'title.404': 'Page not found — Tavola',
    'e404.h1': 'This page is off the menu.',
    'e404.p': 'The link is wrong or the page has moved. The dishes, however, are all still here.',
    'e404.home': 'Back to the start',
    'e404.menu': 'Go to the menu',

    /* ---- shared form words ---- */
  },

  pl: {
    /* ---- shell ---- */
    'nav.home': 'Start',
    'nav.menu': 'Menu',
    'nav.open': 'Otwórz menu',
    'nav.theme': 'Zmień motyw',

    'hours.openNow': 'Otwarte',
    'hours.closed': 'Zamknięte',
    'hours.until': 'do {time}',
    'hours.opensAt': 'otwieramy w {day} o {time}',
    'hours.closedToday': 'Dziś nieczynne',

    'foot.hours': 'Godziny otwarcia',
    'foot.find': 'Znajdź nas',
    'foot.follow': 'Obserwuj',
    'foot.rights': 'Wszelkie prawa zastrzeżone.',
    'foot.built': 'Tavola — szablon strony restauracji. Bez śledzenia i bez zewnętrznych czcionek.',
    'foot.map': 'Otwórz w mapach',

    'day.0': 'Niedziela',
    'day.1': 'Poniedziałek',
    'day.2': 'Wtorek',
    'day.3': 'Środa',
    'day.4': 'Czwartek',
    'day.5': 'Piątek',
    'day.6': 'Sobota',
    'day.closed': 'Nieczynne',

    /* ---- home ---- */
    'title.home': 'Tavola — Kuchnia i Wino, Warszawa',
    'home.eyebrow': 'Warszawa · od 2014',
    'home.h1': 'Jedzenie, dla którego\nwarto usiąść.',
    'home.lead': 'Mała kuchnia z otwartym ogniem, krótkie menu, które zmienia się z sezonem, i karta win od winiarzy, których naprawdę poznaliśmy.',
    'home.cta2': 'Zobacz menu',
    'home.scroll': 'Przewiń',

    'home.marqueeA': 'Otwarty ogień',
    'home.marqueeB': 'Menu sezonowe',
    'home.marqueeC': 'Wino naturalne',
    'home.marqueeD': 'Chleb codziennie',

    'home.aboutEyebrow': 'Kuchnia',
    'home.aboutH': 'Dwanaście dań. Każde kończone na wydawce, żadne nie czeka.',
    'home.aboutP': 'Gotujemy z tego, co w danym tygodniu daje targ, dlatego menu jest krótkie — i tak ma być. Chleb pieczemy każdego ranka, makaron wałkujemy ręcznie, resztę robi ogień. Jeśli danie jest na tablicy, to znaczy, że warte jest tego miejsca.',

    'home.statYears': 'Lat działalności',
    'home.statSeats': 'Miejsc',
    'home.statDishes': 'Dań na tablicy',
    'home.statWines': 'Win na kieliszki',

    'home.menuEyebrow': 'W tym tygodniu',
    'home.menuH': 'Dania, z których nas znacie',
    'home.menuP': 'Kilka pozycji z bieżącej tablicy. Całe menu zmienia się co kilka tygodni.',
    'home.menuLink': 'Pełne menu',


    'home.quote': 'Miejsce, które rezerwujesz na czwartek, a wracasz do niego w sobotę.',
    'home.quoteBy': 'Warsaw Food Guide',


    /* ---- menu page ---- */
    'title.menu': 'Menu — Tavola',
    'menu.eyebrow': 'Tablica',
    'menu.h1': 'Menu',
    'menu.lead': 'Ceny zawierają VAT. Powiedzcie nam o alergiach przy zamówieniu — kuchnia uczciwie powie, co da się zmienić, a czego nie.',
    'menu.all': 'Wszystko',
    'menu.cat.starters': 'Przystawki',
    'menu.cat.mains': 'Dania główne',
    'menu.cat.sides': 'Dodatki',
    'menu.cat.desserts': 'Desery',
    'menu.cat.drinks': 'Wino i napoje',
    'menu.diet': 'Dieta',
    'menu.tag.veg': 'Wegetariańskie',
    'menu.tag.vegan': 'Wegańskie',
    'menu.tag.gf': 'Bezglutenowe',
    'menu.tag.spicy': 'Ostre',
    'menu.empty': 'Nic nie pasuje do tych filtrów. Spróbujcie usunąć jeden.',
    'menu.count': '{n} z {total} dań',
    'menu.free': 'bez opłaty',
    'menu.reset': 'Wyczyść filtry',
    'menu.note': 'Przy stolikach od sześciu osób doliczamy 10% serwisu. W całości trafia do zespołu.',

    /* ---- reservations ---- */
    /* "osoba" instead of "gość": with numerals the masculine-personal
       "gość" would need "dwóch gości / trzech gości", which reads wrong on
       a plain number. Every restaurant form in Poland counts osoby. */

    /* ---- about ---- */

    /* ---- gallery ---- */

    /* ---- events ---- */

    /* ---- contact ---- */

    /* ---- 404 ---- */
    'title.404': 'Nie znaleziono strony — Tavola',
    'e404.h1': 'Tej strony nie ma w menu.',
    'e404.p': 'Link jest błędny albo strona się przeniosła. Dania natomiast są na swoim miejscu.',
    'e404.home': 'Wróć na start',
    'e404.menu': 'Przejdź do menu',

    /* ---- shared form words ---- */
  },

  uk: {
    /* ---- shell ---- */
    'nav.home': 'Головна',
    'nav.menu': 'Меню',
    'nav.open': 'Відкрити меню',
    'nav.theme': 'Змінити тему',

    'hours.openNow': 'Відчинено',
    'hours.closed': 'Зачинено',
    'hours.until': 'до {time}',
    'hours.opensAt': 'відчиняємо у {day} о {time}',
    'hours.closedToday': 'Сьогодні зачинено',

    'foot.hours': 'Години роботи',
    'foot.find': 'Як нас знайти',
    'foot.follow': 'Стежте за нами',
    'foot.rights': 'Усі права захищено.',
    'foot.built': 'Tavola — шаблон сайту ресторану. Без стеження і без зовнішніх шрифтів.',
    'foot.map': 'Відкрити на карті',

    'day.0': 'Неділя',
    'day.1': 'Понеділок',
    'day.2': 'Вівторок',
    'day.3': 'Середа',
    'day.4': 'Четвер',
    'day.5': "П'ятниця",
    'day.6': 'Субота',
    'day.closed': 'Зачинено',

    /* ---- home ---- */
    'title.home': 'Tavola — Кухня і Вино, Варшава',
    'home.eyebrow': 'Варшава · від 2014',
    'home.h1': 'Їжа, заради якої\nварто сісти за стіл.',
    'home.lead': 'Невелика кухня з відкритим вогнем, коротке меню, що змінюється із сезоном, і карта вин від виноробів, з якими ми справді знайомі.',
    'home.cta2': 'Переглянути меню',
    'home.scroll': 'Гортайте',

    'home.marqueeA': 'Відкритий вогонь',
    'home.marqueeB': 'Сезонне меню',
    'home.marqueeC': 'Натуральне вино',
    'home.marqueeD': 'Щоденний хліб',

    'home.aboutEyebrow': 'Кухня',
    'home.aboutH': 'Дванадцять страв. Кожну доводять на роздачі, жодна не чекає.',
    'home.aboutP': 'Готуємо з того, що того тижня дає ринок, тому меню коротке — і так і задумано. Хліб печемо щоранку, пасту розкачуємо руками, решту робить вогонь. Якщо страва на дошці, отже вона варта цього місця.',

    'home.statYears': 'Років працюємо',
    'home.statSeats': 'Місць',
    'home.statDishes': 'Страв на дошці',
    'home.statWines': 'Вин келихами',

    'home.menuEyebrow': 'Цього тижня',
    'home.menuH': 'Страви, за якими нас знають',
    'home.menuP': 'Кілька позицій із нинішньої дошки. Усе меню змінюється кожні кілька тижнів.',
    'home.menuLink': 'Повне меню',


    'home.quote': 'Те місце, яке бронюєш на четвер, а повертаєшся до нього в суботу.',
    'home.quoteBy': 'Warsaw Food Guide',


    /* ---- menu page ---- */
    'title.menu': 'Меню — Tavola',
    'menu.eyebrow': 'Дошка',
    'menu.h1': 'Меню',
    'menu.lead': 'Ціни з ПДВ. Скажіть нам про алергії, коли замовляєте — кухня чесно скаже, що можна змінити, а чого ні.',
    'menu.all': 'Усе',
    'menu.cat.starters': 'Закуски',
    'menu.cat.mains': 'Основні страви',
    'menu.cat.sides': 'Гарніри',
    'menu.cat.desserts': 'Десерти',
    'menu.cat.drinks': 'Вино і напої',
    'menu.diet': 'Дієта',
    'menu.tag.veg': 'Вегетаріанське',
    'menu.tag.vegan': 'Веганське',
    'menu.tag.gf': 'Без глютену',
    'menu.tag.spicy': 'Гостре',
    'menu.empty': 'Нічого не підходить під ці фільтри. Спробуйте прибрати один.',
    'menu.count': '{n} з {total} страв',
    'menu.free': 'без оплати',
    'menu.reset': 'Скинути фільтри',
    'menu.note': 'За столами від шести осіб додаємо 10% сервісу. Він повністю йде команді.',

    /* ---- reservations ---- */

    /* ---- about ---- */

    /* ---- gallery ---- */

    /* ---- events ---- */

    /* ---- contact ---- */

    /* ---- 404 ---- */
    'title.404': 'Сторінку не знайдено — Tavola',
    'e404.h1': 'Цієї сторінки немає в меню.',
    'e404.p': 'Посилання хибне або сторінка переїхала. Страви, натомість, усі на місці.',
    'e404.home': 'Повернутися на початок',
    'e404.menu': 'Перейти до меню',

    /* ---- shared form words ---- */
  }
};
