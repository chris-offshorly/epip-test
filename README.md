# Epiphanies website

A static marketing site built with [Astro](https://astro.build), with content
managed through [Sveltia CMS](https://sveltiacms.app) and deployed on
[Render](https://render.com).

The build step exists so shared parts of every page (header, footer, design
tokens) are written once. Visitors still receive plain static HTML — there is no
server or database at runtime.

## Quick start

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # output to ./dist/
npm run preview  # serve the built output locally
```

## How the pieces fit together

| Concern | Where it lives | Edited by |
| :--- | :--- | :--- |
| Articles | `src/content/articles/*.md` | Client, via Sveltia CMS |
| Page copy | `src/content/pages/*.json` | Client, via Sveltia CMS |
| Site name, nav, footer, contact | `src/content/settings.json` | Client, via Sveltia CMS |
| Images | `public/images/` | Client, via Sveltia CMS |
| Layout, header, footer | `src/layouts/`, `src/components/` | Developer |
| Colours, type, spacing | `src/styles/global.css` | Developer |
| Article schema + validation | `src/content.config.ts` | Developer |
| CMS field definitions | `public/admin/config.yml` | Developer |
| Deploy config | `render.yaml` | Developer |

## Editing content

### Locally (no account needed)

1. `npm run dev`
2. Open <http://localhost:4321/admin/index.html> in a **Chromium-based browser**
   (Chrome, Edge, Brave). Firefox and Safari are not supported — the local
   workflow relies on the File System Access API.
3. Click **Work with Local Repository** and select this project folder.
4. Edit. Changes are written straight to the data files; commit them with Git
   yourself.

### In production

The CMS is served at `/admin/` on the deployed site. Two ways to sign in:

- **Personal access token** — works immediately, no setup. Click *Sign In with
  Token* and paste a fine-grained PAT with `contents: write` on this repo. Best
  for one or two technical users.
- **Sign in with GitHub** — nicer for non-technical editors, but requires an
  OAuth client. Deploy [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)
  to Cloudflare Workers (free), then uncomment `base_url` in
  `public/admin/config.yml` and set it to your worker URL.

The admin page carries `noindex`, and every action is authenticated against
GitHub, but the page itself is publicly reachable — do not rely on obscurity.

## Adding an article

Add an entry to the **Articles** collection in the CMS. Articles are Markdown
files: the filename becomes the URL (`my-article.md` → `/insights/my-article/`).
Set **Order** to control the position on the Insights page.

## Two things that will break the build if changed

- **`public/admin/index.html` must stay a static file.** Do not add a stylesheet
  `<link>` or `type="module"` to its script tag (both break Sveltia), and do not
  move it to `src/pages/admin.astro` (Astro's live-reload would then reload the
  CMS on every keystroke).
- **`public/admin/config.yml` must keep `output.omit_empty_optional_fields: true`.**
  Without it Sveltia writes `null` for a blank optional field, which falls
  outside the content schema.

## SEO

Everything derives from `site:` in `astro.config.mjs`, so changing the domain
updates canonical URLs, the sitemap and social tags in one place.

| Signal | Handled by |
| :--- | :--- |
| Title + meta description | Page content, overridable per page in the CMS |
| Canonical URL | `site` + the page path |
| Open Graph + Twitter cards | `BaseLayout`, with a 1200x630 default share image |
| Structured data | Organization on every page; Article + BreadcrumbList on articles |
| Sitemap | `@astrojs/sitemap`, generated at build (/sitemap-index.xml) |
| robots.txt | Generated at `src/pages/robots.txt.ts` so it can't go stale |
| 404 | `src/pages/404.astro`, served by Render for unmatched routes |

**Per-page overrides.** Every page and article has an optional **SEO** block in
the CMS — meta title, meta description and a social share image. Leave them
blank to fall back to the page content, which is the right default.

**Still worth doing:** submit the sitemap to Google Search Console once the final
domain is live, and add redirects if you're replacing an existing site.

## Deployment

`render.yaml` declares the site as a Render Blueprint. Pushing to `main`
triggers a deploy.

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Service type:** static site (free tier, global CDN, no server)

Before launch, set `site:` in `astro.config.mjs` to the live URL. Until then,
canonical URLs and social preview tags point at `localhost:4321`.

## Known gaps

- **Legal pages.** `/privacy-policy`, `/cookies` and `/terms` are linked in the
  footer but have no content, so they 404. The copy needs to come from the
  client (or their legal advisers).
- **Missing images.** The Insights article images, the book cover and the
  speaking image were never supplied; those panels render as hatched
  placeholders.
- **Article bodies** are placeholder copy. Only the titles and excerpts are real.
- **The contact form** does not submit anywhere. Set `FORM_ENDPOINT` in
  `src/pages/contact.astro` to a form service URL to make it live.
- **Page JSON is not schema-validated** (unlike articles). A missing property
  renders as empty rather than failing the build.
- **The Insights search box and theme filters** are UI only — they need either a
  small client-side filter or CMS-backed taxonomy to function.

## Notes

- `AGENTS.md` contains guidance for AI coding assistants working in this repo.
- Never commit secrets. None are required as configured; if that changes, use
  Render's environment variables rather than files in the repo.
