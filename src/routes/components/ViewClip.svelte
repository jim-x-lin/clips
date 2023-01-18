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
	{#if clip.format === 'email'}
		<div class="flex-1 truncate px-2 py-1 underline">
			{clip.content}
		</div>
	{:else if clip.format === 'url'}
		<div class="flex-1 truncate px-2 py-1">
			<a class="underline" href={clip.content} rel="noopener noreferrer" target="_blank"
				>{clip.content}</a
			>
		</div>
	{:else if clip.format === 'key'}
		<div class="flex-1 truncate px-2 py-1 font-mono blur-sm hover:blur-none">
			{clip.content}
		</div>
	{:else if clip.format === 'code'}
		<div class="flex-1 truncate px-2 py-1 font-mono font-semibold">
			{clip.content}
		</div>
	{:else if clip.format === 'longText'}
		<div class="flex-1 px-2 py-1 line-clamp-2">
			{clip.content}
		</div>
	{:else}
		<div class="flex-1 truncate px-2 py-1">
			{clip.content}
		</div>
	{/if}
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
