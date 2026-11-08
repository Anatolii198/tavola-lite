/* ==========================================================================
   Tavola — one place to change everything a new owner needs to change.
   Edit this file first: name, contacts, currency, opening hours.
   No build step — the pages read these values at load.
   ========================================================================== */

const CFG = {
  /* ---- the restaurant ------------------------------------------------- */
  name: 'Tavola',
  tagline: { en: 'Kitchen & Wine', pl: 'Kuchnia i Wino', uk: 'Кухня і Вино' },

  /* ---- contacts ------------------------------------------------------- */
  phone: '+48 22 123 45 67',
  email: 'hello@tavola.example',
  address: {
    street: 'ul. Nowogrodzka 42',
    city: { en: 'Warsaw', pl: 'Warszawa', uk: 'Варшава' },
    zip: '00-695',
    /* Used to build the map link. Replace with your own coordinates. */
    lat: 52.2287,
    lng: 21.0075
  },
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/'
  },

  /* ---- money ----------------------------------------------------------
     One ISO code for the whole site. Prices live as plain numbers in
     js/menu.js; each language formats that same number its own way
     (PLN → "48,00 zł" in Polish, "PLN 48.00" in English). To sell in euro,
     change this to 'EUR' and nothing else. */
  currency: 'PLN',

  /* ---- opening hours ---------------------------------------------------
     0 = Sunday … 6 = Saturday. `null` means closed that day.
     `last` is the latest reservation slot, not the closing time — it is
     what the booking form offers, and the "open now" badge uses `to`. */
  hours: {
    0: { from: '12:00', to: '21:00', last: '19:30' },
    1: null,
    2: { from: '12:00', to: '22:00', last: '20:30' },
    3: { from: '12:00', to: '22:00', last: '20:30' },
    4: { from: '12:00', to: '22:00', last: '20:30' },
    5: { from: '12:00', to: '23:00', last: '21:30' },
    6: { from: '11:00', to: '23:00', last: '21:30' }
  },

  /* ---- group prices shown on the events page ---------------------------
     Same rule as the menu: plain numbers, formatted per language. */
  events: { large: 180, room: 260 },

  /* ---- booking rules --------------------------------------------------- */
  booking: {
    slotMinutes: 30,      // step between offered times
    maxGuests: 10,        // larger parties are sent to the events page
    daysAhead: 60,        // how far ahead the date picker allows
    minNoticeMinutes: 90  // no booking for right now
  }
};
