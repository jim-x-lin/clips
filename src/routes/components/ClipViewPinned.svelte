<script lang="ts">
	import type { ClipType } from '$types/types';
	import ClipContent from '$components/ClipContent.svelte';
	import CopyClipContent from '$components/CopyClipContent.svelte';

	export let clip: ClipType;
	export let unpinClip: (clip: ClipType) => void;
	export let updateClip: (clip: ClipType, timestamp?: boolean) => void;

	function handleClickUnpin() {
		unpinClip(clip);
	}
</script>

<div class="my-4 flex divide-x divide-solid rounded-md border border-yellow-500 hover:outline">
	<ClipContent {clip} />
	<button
		class="hidden w-16 px-2 py-1 text-sm font-semibold text-black hover:bg-gray-200 sm:inline"
		on:click={handleClickUnpin}>unpin</button
	>
	<CopyClipContent {clip} {updateClip} />
</div>
