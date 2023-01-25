import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		prerender: { entries: [] },
		alias: {
			$types: 'src/types',
			$stores: 'src/stores',
			$components: 'src/routes/components'
		}
	}
};

export default config;
