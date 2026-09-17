// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	// Single source of truth for canonical URLs, sitemap entries and social
	// preview tags. Change this one line if the domain changes.
	site: 'https://epip-test.onrender.com',
	integrations: [sitemap()],
});
