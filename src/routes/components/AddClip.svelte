<script lang="ts">
	import type { ClipType } from '$types/types';
	import { createId, cleanContentString, categorizeContent } from '$lib/utils';

	export let clips: ClipType[];

	let contentToSave: string = '';

	function handleClickClear() {
		contentToSave = '';
	}

	function checkDuplicate(content: string): ClipType | undefined {
		return clips.find((c) => {
			return c.content === content;
		});
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

		const duplicate = checkDuplicate(contentToSave);
		let cancelSave;
		if (duplicate) {
			cancelSave = !window.confirm(
				`Clip already exists ${duplicate.deletedAtMs ? ' (deleted)' : ''}, save anyway?`
			);
		}
		if (cancelSave) {
			contentToSave = '';
			return;
		}

		const newClip: ClipType = {
			id: createId(),
			createdAtMs: Date.now(),
			updatedAtMs: Date.now(),
			content: cleanContentString(contentToSave),
			format: categorizeContent(contentToSave),
			copyCount: 0
		};
		// use `set` instead of `update` so that data is persisted to localStorage
		clips = [...clips, newClip];
		contentToSave = '';
	}
</script>

<div class="mx-auto my-4 w-96 divide-y rounded-lg border border-gray-400">
	<textarea bind:value={contentToSave} class="h-20 w-full resize-y rounded-t-lg py-1 px-2" />
	<div class="flex justify-center divide-x divide-solid border-gray-400">
		<button
			on:click={handleClickClear}
			class="text-md grow rounded-bl-md border-none px-2 py-1 hover:bg-gray-300">Clear</button
		>
		<button on:click={handleClickPaste} class="text-md grow border-none px-2 py-1 hover:bg-gray-300"
			>Paste</button
		>
		<button
			class:cursor-not-allowed={contentToSave.length === 0}
			on:click={handleClickSave}
			class="text-md grow rounded-br-md border-none px-2 py-1 hover:bg-gray-300">Save</button
		>
	</div>
</div>
