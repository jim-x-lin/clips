<script lang="ts">
	import type { ClipType } from '$types/types';

	export let clip: ClipType;
	export let editClipId: string | undefined;
	export let updateClip: (clip: ClipType, timestamp?: boolean) => void;

	$: height = clip.format === 'longText' ? 'h-40' : 'h-16';

	let newContent: string = clip.content;

	function handleClickCancel() {
		editClipId = undefined;
	}

	function handleClickDelete() {
		if (!editClipId) return;
		updateClip({ ...clip, deletedAtMs: Date.now() });
	}

	function handleClickSave() {
		if (!editClipId) return;
		updateClip({ ...clip, content: newContent });
	}
</script>

<div
	class="my-4 mb-2 h-fit w-full divide-y rounded-lg border border-gray-400 ring-4 ring-gray-300 ring-offset-2"
>
	<div class="py-1 px-2">
		<i>created at {clip.createdAtMs}</i>
		<i>format is {clip.format}</i>
	</div>
	<textarea bind:value={newContent} class="w-full py-1 px-2 ring-0 {height}" />
	<div class="flex">
		<button
			on:click={handleClickCancel}
			class="grow rounded-bl-md bg-blue-500 py-1 px-2 text-white hover:bg-blue-600">Cancel</button
		>
		<button
			on:click={handleClickDelete}
			class="grow bg-red-500 py-1 px-2 text-white hover:bg-red-600">Delete</button
		>
		<button
			on:click={handleClickSave}
			class="grow rounded-br-md bg-blue-500 py-1 px-2 text-white hover:bg-blue-600">Save</button
		>
	</div>
</div>
