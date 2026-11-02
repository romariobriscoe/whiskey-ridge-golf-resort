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
    'Experiential golf in Bristol, Tennessee — a short, walkable par 71 above Cedar Creek, a Tennessee Hills pour at the end of it, and the whole of Bristol around it. Book a round or a group weekend.',
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

/* ------------------------------------------------------------------
   POSITIONING — experiential golf, Tennessee Hills themed.

   This reframes the course's one real liability. At 5,886 yards and
   slope 113 it cannot be sold as championship golf, and local players
   would see through the attempt. As the substrate for experiential
   golf, short and forgiving stops being an apology and becomes the
   design intent: nobody is punished for showing up.

   The Tennessee Hills theme gives the 19th hole an identity no public
   course in the Tri-Cities can copy.
   ------------------------------------------------------------------ */

export const positioning = {
  category: 'Experiential golf',
  theme: 'Tennessee Hills',
  /* Confirmed: a partnership. The copy may name Tennessee Hills as a
     partner and treat the pour as a co-brand. It still may NOT claim an
     on-site distillery, a tasting licence, a barrel programme or any
     specific product line — none of that is settled. */
  themeScope: 'partnership',
} as const;

/* The named partner. This is the one thing on the site no other public
   course in the Tri-Cities can copy, so it is credited plainly rather
   than hinted at. Name and founding year are the distillery's own. */
export const partner = {
  name: 'Tennessee Hills Distillery',
  shortName: 'Tennessee Hills',
  established: 2014,
  url: 'https://tennesseehills.com', // confirm the link target before launch
  credit: 'In partnership with Tennessee Hills Distillery',
  /* Still open — do not write these as fact: */
  programme: TBD,   // TBD: tastings, barrel programme, exclusive pours, events
  licence: TBD,     // TBD: liquor licence status and what it permits on site
  onSite: TBD,      // TBD: whether any distilling or tasting happens at the ridge
} as const;

/* The experience layer. Items marked `confirmed` are supported by the
   existing property; the rest are slots the build is designed to take
   once ownership signs them off. Nothing unconfirmed is described as
   though it exists. */
export const featuredExperience = {
  kicker: 'The pour',
  title: 'Tennessee Hills pours the nineteenth',
  body: 'The whiskey is not an afterthought stocked behind the register. Tennessee Hills Distillery is a partner in this place, which is half the reason it is called what it is — poured honestly, priced like a handshake, and waiting the moment you walk off eighteen.',
  note: 'Tastings, barrel programme and the bar\u2019s own name are still being settled.',
} as const;

export const experience = [
  {
    kicker: 'The range',
    title: 'Three tees and no agenda',
    body: 'Warm up properly, or skip the round entirely and just hit balls with a drink in the holder. Both are a legitimate way to spend an evening here.',
    confirmed: true,
    note: '',
  },
  {
    kicker: 'Play it your way',
    title: 'Formats worth arguing over',
    body: 'Scrambles, skins, nine-and-dine, whatever the group talks itself into on the first tee. A forgiving course is the one that makes those games fun instead of grim.',
    confirmed: false,
    note: 'Additional attractions — simulators, short-course and night play — TBD.',
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
