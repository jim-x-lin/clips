<script lang="ts">
	import type { ClipType, FormatType } from '$types/types';

	export let clip: ClipType;
	export let editClipId: string | undefined;
	export let updateClip: (clip: ClipType, timestamp?: boolean) => void;

	$: height = clip.format === 'longText' ? 'h-40' : 'h-16';

	let newContent: string = clip.content;
	let formatCustom: FormatType = clip.formatCustom || clip.format;

	function handleClickCancel() {
		editClipId = undefined;
	}

	function handleClickDelete() {
		if (!editClipId) return;
		updateClip({ ...clip, deletedAtMs: Date.now() });
	}

	function handleClickPin() {
		if (!editClipId) return;
		updateClip({ ...clip, pinnedAtMs: Date.now() }, false);
	}

	function handleClickSave() {
		if (!editClipId) return;
		if (formatCustom !== clip.format) {
			updateClip({ ...clip, content: newContent, formatCustom });
		} else {
			updateClip({ ...clip, content: newContent });
		}
	}
</script>

<div
	class="my-4 mb-2 h-fit w-full divide-y rounded-lg border border-gray-400 ring-4 ring-gray-300 ring-offset-2"
>
	<div class="flex divide-x text-sm italic text-gray-500">
		<div class="grow py-1 px-2 text-center">
			updated on {new Date(clip.updatedAtMs).toISOString().slice(0, 10)}
		</div>
		<!-- <div class="grow py-1 px-2 text-center">formatted as {clip.format}</div> -->
		<div class="grow">
			<select bind:value={formatCustom} class="h-full w-full cursor-pointer text-center text-base">
				{#each ['text', 'longText', 'url', 'email', 'code', 'key'] as format}
					<option value={format}>{format}</option>
				{/each}
			</select>
		</div>
		<div class="grow py-1 px-2 text-center">copied {clip.copyCount} times</div>
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
			on:click={handleClickPin}
			class="hover:bg-greeb=n-600 grow bg-yellow-500 py-1 px-2 text-white">Pin</button
		>
		<button
			on:click={handleClickSave}
			class="grow rounded-br-md bg-blue-500 py-1 px-2 text-white hover:bg-blue-600">Save</button
		>
	</div>
</div>
