// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://whiskeyridgegolf.com', // placeholder — confirm final domain with ownership
  image: {
    // AVIF/WebP generated at build; sharp handles the resizing.
    responsiveStyles: true,
    layout: 'constrained',
  },
  build: { inlineStylesheets: 'auto' },
});
