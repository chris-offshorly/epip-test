// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Used for canonical URLs, sitemaps and social preview tags.
	// Confirm this matches the URL Render assigns after the first deploy and
	// update it if the service name was already taken on Render.
	site: 'https://epip-test.onrender.com',
});
