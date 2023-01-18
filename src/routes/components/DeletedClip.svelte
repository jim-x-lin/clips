<script lang="ts">
	import type { ClipType } from '$types/types';

	export let clip: ClipType;
	export let updateClip: (clip: ClipType, timestamp?: boolean) => void;

	function handleClickRestore() {
		updateClip({ ...clip, deletedAtMs: undefined });
	}
</script>

<div class="my-4 flex divide-x divide-solid rounded-md border border-gray-400 hover:outline">
	<div class="flex-1 px-2 py-1 line-clamp-2">{clip.content}</div>
	<button
		class="w-16 px-2 py-1 text-sm font-semibold text-black hover:bg-gray-400 hover:text-white"
		on:click={handleClickRestore}>restore</button
	>
</div>
