import type { APIRoute } from 'astro';

/**
 * Generated rather than static so the sitemap URL always matches `site` in
 * astro.config.mjs — no chance of it going stale if the domain changes.
 */
export const GET: APIRoute = ({ site }) => {
	const sitemap = new URL('sitemap-index.xml', site).href;

	const body = `User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${sitemap}
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
