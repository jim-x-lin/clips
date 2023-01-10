<script lang="ts">
	import CopyToClipboard from './CopyToClipboard.svelte';
	import type { ClipType } from '$types/types';

	export let clip: ClipType;
	export let editClipId: string | undefined;

	function handleClick() {
		editClipId = clip.id;
	}
</script>

<div class="my-4 flex divide-x divide-solid rounded-md border border-gray-400 hover:outline">
	<button class="flex-1 truncate px-2 py-1 text-left" on:click={handleClick}>{clip.content}</button>
	<CopyToClipboard content={clip.content} />
</div>
