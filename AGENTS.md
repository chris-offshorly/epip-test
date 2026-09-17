## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Content and CMS

Content lives in three places:

- `src/content/articles/*.md` — one Markdown file per article, validated by the
  schema in `src/content.config.ts`. The filename is the URL slug.
- `src/content/pages/*.json` — the copy for each bespoke page (home, services,
  about, insights, contact).
- `src/content/settings.json` — site name, navigation, footer, contact details.

Editors use Sveltia CMS, served from `public/admin/`.

- `public/admin/index.html` must stay a static file. Do not add a stylesheet
  `<link>` or `type="module"` to its script tag, and do not move it to
  `src/pages/admin.astro`.
- `public/admin/config.yml` must keep `output.omit_empty_optional_fields: true`.
  Otherwise Sveltia writes `null` for a blank optional field and the build fails.
- Page JSON is read with a plain `import`. It is **not** schema-validated, so a
  missing property renders as empty rather than erroring — check the rendered
  page after structural changes.
- When you change a content shape, update `public/admin/config.yml` to match and
  validate it against
  `https://unpkg.com/@sveltia/cms/schema/sveltia-cms.json`.

## Images

Images live in `public/images/` and are pre-optimised (WebP for photography,
PNG for logos that need alpha, SVG for icons). They were resized to roughly 2x
their largest display width. If you add images, match that convention — Astro
does not process files in `public/`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
