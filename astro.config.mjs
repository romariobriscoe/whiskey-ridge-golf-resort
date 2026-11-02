// @ts-check
import { defineConfig } from 'astro/config';

/* ------------------------------------------------------------------
   Deploy target.

   GitHub *project* pages serve from https://<user>.github.io/<repo>/,
   so the build needs a base path. Both values are env-overridable, so
   moving to the real domain later is a config change, not a code one:

     SITE_URL=https://whiskeyridgegolf.com BASE_PATH=/ npm run build

   ------------------------------------------------------------------ */
const SITE_URL = process.env.SITE_URL ?? 'https://romariobriscoe.github.io';
const BASE_PATH = process.env.BASE_PATH ?? '/whiskey-ridge-golf-resort';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'always',
  image: {
    responsiveStyles: true,
    layout: 'constrained',
  },
  build: { inlineStylesheets: 'auto' },
});
