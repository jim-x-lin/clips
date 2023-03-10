<script lang="ts">
	import { TidyURL } from 'tidy-url';
	import type { ClipType, FormatType } from '$types/types';
	import { createId, categorizeContent } from '$lib/utils';

	export let clips: ClipType[];

	let contentToSave: string = '';
	let showTextArea: boolean = false;

	function handleClickCancel() {
		showTextArea = false;
		contentToSave = '';
	}

	function cleanContentAndFormat(content: string): [string, FormatType] {
		const format = categorizeContent(contentToSave);
		let clean = content.trim();
		if (format === 'url') clean = TidyURL.clean(content).url;
		return [clean, format];
	}

	function checkDuplicate(content: string): ClipType | undefined {
		return clips.find((c) => {
			return c.content === content;
		});
	}

	async function handleClickPaste() {
		try {
			// workaround for FireFox
			if (navigator.clipboard.readText) {
				contentToSave = await navigator.clipboard.readText();
			}
			showTextArea = true;
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
			return;
		}

		const [content, format] = cleanContentAndFormat(contentToSave);

		const newClip: ClipType = {
			id: createId(),
			createdAtMs: Date.now(),
			updatedAtMs: Date.now(),
			content,
			format,
			copyCount: 0
		};
		// use `set` instead of `update` so that data is persisted to localStorage
		clips = [...clips, newClip];
		handleClickCancel();
	}
</script>

{#if showTextArea}
	<div class="mb-8 divide-y rounded-lg border-2 border-blue-400">
		<textarea
			bind:value={contentToSave}
			autofocus
			class="h-16 w-full resize-y rounded-t-lg py-1 px-2"
		/>
		<div class="flex justify-center divide-x divide-solid border-blue-400">
			<button
				on:click={handleClickCancel}
				class="grow rounded-bl-md border-none bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
				>Cancel</button
			>
			<button
				class:cursor-not-allowed={contentToSave.length === 0}
				on:click={handleClickSave}
				class="grow rounded-br-md border-none bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
				>Save</button
			>
		</div>
	</div>
{:else}
	<div class="mx-auto mb-8 flex max-w-screen-sm">
		<button
			on:click={handleClickPaste}
			class="h-10 grow rounded-md border-2 bg-blue-500 py-1 px-2 text-white hover:bg-blue-600"
			>Paste</button
		>
	</div>
{/if}
