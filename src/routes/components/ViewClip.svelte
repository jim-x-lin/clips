<script lang="ts">
	import CopyToClipboard from './CopyToClipboard.svelte';
	import type { ClipType } from '$types/types';

	export let clip: ClipType;
	export let editClipId: string | undefined;

	function handleClickEdit() {
		editClipId = clip.id;
	}
</script>

<div class="my-4 flex divide-x divide-solid rounded-md border border-gray-400 hover:outline">
	<div class="flex-1 truncate px-2 py-1">{clip.content}</div>
	<button
		class="w-16 px-2 py-1 text-sm font-semibold text-black hover:bg-gray-400 hover:text-white"
		on:click={handleClickEdit}>edit</button
	>
	<CopyToClipboard content={clip.content} />
</div>
