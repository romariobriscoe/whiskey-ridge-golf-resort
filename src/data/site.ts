/* ------------------------------------------------------------------
   Single source of truth for everything factual.
   Anything marked TBD is unconfirmed — it renders as a visible
   placeholder on the page rather than a guess. Replace here, once.
   ------------------------------------------------------------------ */

export const TBD = '[TBD]' as const;

export const site = {
  name: 'Whiskey Ridge Golf Resort',
  shortName: 'Whiskey Ridge',
  tagline: 'Golf Resort · Bristol TN',
  description:
    'Eighteen walkable holes above Cedar Creek in Bristol, Tennessee — minutes from the casino, the Speedway and State Street. Book a round or a group weekend.',
  url: 'https://whiskeyridgegolf.com', // TBD: confirm final domain
} as const;

export const contact = {
  phone: '423-797-4411',
  phoneHref: 'tel:+14237974411',
  street: '115 Cedar Creek Rd',
  city: 'Bristol',
  state: 'TN',
  zip: '37620',
  county: 'Sullivan County',
  lat: 36.54134,
  lng: -82.225337,
  get mapsHref() {
    return `https://www.google.com/maps/search/?api=1&query=${this.lat},${this.lng}`;
  },
  hours: TBD, // TBD: tee sheet, kitchen, bar and pro shop hours
} as const;

export const nav = [
  { label: 'The Course', href: '/course/' },
  { label: 'Rates & Tee Times', href: '/rates/' },
  { label: 'Groups & Outings', href: '/groups/' },
  { label: 'Clubhouse & Bar', href: '/clubhouse/' },
  { label: 'Stay', href: '/stay/' },
  { label: 'Events', href: '/events/' },
  { label: 'Plan Your Visit', href: '/visit/' },
  { label: 'Gallery', href: '/gallery/' },
] as const;

/* Verified from existing course records. Items flagged `confirm`
   are disputed between sources and must not be published as fact. */
export const course = {
  holes: 18,
  par: 71,
  tees: [
    { name: 'Blue', yards: 5886, rating: '70.0', slope: '113', confirm: true },
    { name: 'White', yards: 5404, rating: TBD, slope: TBD, confirm: true },
    { name: 'Red', yards: 4538, rating: TBD, slope: TBD, approx: true, confirm: true },
  ],
  greens: 'Bent grass',
  built: 1998,
  pace: 'Under four hours walking',
  range: 'Driving range with three practice tees',
  // One database lists 71.0/126 from the blues against the 70.0/113 above.
  ratingsNote: 'Course ratings and distances to be confirmed with ownership before launch.',
} as const;

/* No rate is published until ownership sets the new card.
   The ~$25 reference is the current green fee at the existing course. */
export const rates = {
  note: 'The new rate card is being set with ownership. The course charges about $25 for 18 today.',
  rows: [
    { label: '18 holes · walking · weekday', price: TBD },
    { label: '18 holes · walking · weekend', price: TBD },
    { label: 'Cart · per rider', price: TBD },
    { label: 'Twilight · after 3 pm', price: TBD },
  ],
} as const;

/* Nearby demand drivers. These are facts about Bristol, not claimed
   partnerships — drive times stay TBD until measured. */
export const bristol = [
  {
    title: 'Hard Rock Hotel & Casino',
    body: 'A $515M resort casino, open since late 2024 — with zero golf on the property. That part is our job.',
  },
  {
    title: 'Bristol Motor Speedway',
    body: 'Two NASCAR weekends a year, Speedway in Lights in winter, and the Last Great Colosseum the rest of it.',
  },
  {
    title: 'Birthplace of Country Music',
    body: 'The 1927 Bristol Sessions happened here. State Street still sounds like it most nights.',
  },
  {
    title: 'The Highlands',
    body: 'South Holston trout water, Appalachian trail country, and mountain air that makes the beer taste better.',
  },
] as const;

/* Demonstration data for the tee sheet ticker. In production this
   reads the live tee sheet from the booking provider. */
export const teeSheet = [
  { when: 'Today · 3:40 PM', note: 'Twilight rate · 2 spots left', low: true },
  { when: 'Saturday · 9:40 AM', note: 'Open foursome · walking', low: false },
  { when: 'Sunday · 7:30 AM', note: 'First off the tee · 3 spots', low: false },
] as const;

export const booking = {
  provider: TBD, // TBD: foreUP / Lightspeed / GolfNow / Supreme
  href: '/rates/',
} as const;
