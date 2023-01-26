<script lang="ts">
	import type { ClipType } from '$types/types';
	import ClipContent from '$components/ClipContent.svelte';
	import CopyClipContent from '$components/CopyClipContent.svelte';

	export let clip: ClipType;
	export let editClipId: string | undefined;
	export let updateClip: (clip: ClipType, timestamp?: boolean) => void;

	function handleClickEdit() {
		editClipId = clip.id;
	}
</script>

<div
	class="my-4 flex min-w-0 divide-x divide-solid overflow-hidden rounded-md border border-gray-400 hover:outline"
>
	<ClipContent {clip} />
	<button
		class="hidden w-16 px-2 py-1 text-sm font-semibold text-black hover:bg-gray-200 sm:inline"
		on:click={handleClickEdit}>edit</button
	>
	<CopyClipContent {clip} {updateClip} />
</div>
