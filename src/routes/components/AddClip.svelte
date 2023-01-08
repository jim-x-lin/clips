<script lang="ts">
	import type { ClipType } from '$types/types';
	import { createId } from '$lib/utils';

	export let clips: ClipType[];

	let contentToSave: string = '';

	function handleClickClear() {
		contentToSave = '';
	}

	async function handleClickPaste() {
		try {
			contentToSave = await navigator.clipboard.readText();
		} catch (err) {
			console.error('Failed to read clipboard contents: ', err);
		}
	}

	function handleClickSave() {
		if (contentToSave.length === 0) return;
		const newClip: ClipType = {
			id: createId(),
			createdAtMs: Date.now(),
			content: contentToSave,
			format: 'text'
		};
		// use `set` instead of `update` so that data is persisted to localStorage
		clips = [...clips, newClip];
		contentToSave = '';
	}
</script>

<div class="mx-auto w-1/2">
	<textarea
		bind:value={contentToSave}
		class="h-10h my-4 mb-2 w-full resize-y rounded-md border border-gray-400 px-2 py-1"
	/>
	<div class="flex justify-center">
		<button
			on:click={handleClickClear}
			class="text-md hover:bg-blue-rose mx-2 w-16 rounded-md border-none bg-rose-500 px-2 py-1 text-white hover:bg-rose-600"
			>Clear</button
		>
		<button
			on:click={handleClickPaste}
			class="text-md mx-2 w-16 rounded-md border-none bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
			>Paste</button
		>
		<button
			on:click={handleClickSave}
			class="text-md mx-2 w-16 rounded-md border-none bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
			>Save</button
		>
	</div>
</div>
