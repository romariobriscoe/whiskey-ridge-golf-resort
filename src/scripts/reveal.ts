/* ------------------------------------------------------------------
   Card grids settle into place the first time they scroll into view.
   Cards only start hidden when the head script has set html.js, so
   nothing is lost without JavaScript. Each card reveals once, ever.
   ------------------------------------------------------------------ */
const cards = document.querySelectorAll<HTMLElement>('.grid > .card');

if (cards.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry, i) => {
          const card = entry.target as HTMLElement;
          // Stagger within whatever arrived together, capped so a long grid never drags.
          card.style.transitionDelay = `${Math.min(i, 5) * 50}ms`;
          card.classList.add('is-in');
          observer.unobserve(card);
        });
    },
    { rootMargin: '0px 0px -12% 0px' },
  );
  cards.forEach((card) => observer.observe(card));
}
