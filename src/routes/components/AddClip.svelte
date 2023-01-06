<script lang="ts">
	import type { ClipType } from '$types/types';
	import { createId } from '$lib/utils';

	export let clips: ClipType[];

	async function handleClick() {
		try {
			const text = await navigator.clipboard.readText();
			const newClip: ClipType = {
				id: createId(),
				createdAtMs: Date.now(),
				content: text,
				format: 'text'
			};
			// use `set` instead of `update` so that data is persisted to localStorage
			clips = [...clips, newClip];
		} catch (err) {
			console.error('Failed to read clipboard contents: ', err);
		}
	}
</script>

<button on:click={handleClick}>save from clipboard</button>
