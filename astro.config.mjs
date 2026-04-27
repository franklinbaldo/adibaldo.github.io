// @ts-check

import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
	site: 'https://adibaldo.github.io',
	integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/workspace/') && !page.includes('/_/') }), svelte()],
	prefetch: {
		prefetchAll: true,
	},
	markdown: {
		rehypePlugins: [
			rehypeSlug,
			[rehypeAutolinkHeadings, {
				behavior: 'append',
				test: ['h2', 'h3', 'h4'],
				properties: {
					class: 'heading-link',
					'aria-hidden': 'true',
					tabindex: -1
				},
				content: {
					type: 'text',
					value: '#'
				}
			}]
		]
	}
});
