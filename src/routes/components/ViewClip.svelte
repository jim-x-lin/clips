<script lang="ts">
	import type { ClipType } from '$types/types';

	export let clip: ClipType;
	export let editClipId: string | undefined;
	export let updateClip: (clip: ClipType, timestamp?: boolean) => void;

	function handleClickEdit() {
		editClipId = clip.id;
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

<div class="my-4 flex divide-x divide-solid rounded-md border border-gray-400 hover:outline">
	<div class="flex-1 truncate px-2 py-1">{clip.content}</div>
	<button
		class="w-16 px-2 py-1 text-sm font-semibold text-black hover:bg-gray-400 hover:text-white"
		on:click={handleClickEdit}>edit</button
	>
	<button
		on:click={handleClickCopy}
		class="w-16 px-2 py-1 text-sm font-semibold text-black hover:bg-gray-400 hover:text-white"
		>copy</button
	>
</div>
