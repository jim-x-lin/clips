<script lang="ts">
	import type { ClipType } from '$types/types';
	import ClipContent from './ClipContent.svelte';

	export let clip: ClipType;
	export let unpinClip: (clip: ClipType) => void;
	export let updateClip: (clip: ClipType, timestamp?: boolean) => void;

	function handleClickUnpin() {
		unpinClip(clip);
	}

	async function handleClickCopy() {
		try {
			await navigator.clipboard.writeText(clip.content);
			updateClip({ ...clip, copyCount: clip.copyCount + 1 }, false);
		} catch (err) {
			console.log('Error writing to clipboard', err);
		}
	}
</script>

<div class="my-4 flex divide-x divide-solid rounded-md border border-yellow-500 hover:outline">
	<ClipContent {clip} />
	<button
		class="w-16 px-2 py-1 text-sm font-semibold text-black hover:bg-gray-200"
		on:click={handleClickUnpin}>unpin</button
	>
	<button
		on:click={handleClickCopy}
		class="w-16 px-2 py-1 text-sm font-semibold text-black hover:bg-gray-200">copy</button
	>
</div>
