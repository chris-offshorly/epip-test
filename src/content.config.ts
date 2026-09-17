import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Articles for the Insights section. One Markdown file per article; the
 * filename becomes the URL slug.
 */
const articles = defineCollection({
	loader: glob({ base: './src/content/articles', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		theme: z.string(),
		excerpt: z.string(),
		standfirst: z.string(),
		date: z.coerce.date(),
		order: z.number().default(0),
		readingTime: z.string(),
		authorName: z.string(),
		authorRole: z.string(),
		authorBio: z.string(),
		// Optional per-article SEO overrides. Nullable because an all-empty
		// object round-trips through YAML as null.
		seo: z
			.object({
				title: z.string().optional(),
				description: z.string().optional(),
				image: z.string().optional(),
			})
			.nullish(),
	})
});

export const collections = { articles };
