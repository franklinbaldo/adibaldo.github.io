import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			draft: z.boolean().optional().default(false),
			tags: z.array(z.string()).optional().default([]),
			place: z.string().optional(), // slug do local (ex.: "curitiba")
			placeLabel: z.string().optional(), // nome exibido (ex.: "Curitiba")
			heroImage: image().optional(),
			heroImageAlt: z.string().optional(),
		}),
});

const places = defineCollection({
	loader: glob({ base: './src/content/places', pattern: '**/*.md' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			summary: z.string(),
			order: z.number().optional().default(999),
			heroImage: image().optional(),
		}),
});

export const collections = { blog, places };
