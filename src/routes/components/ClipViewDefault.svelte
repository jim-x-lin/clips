<script lang="ts">
	import type { ClipType } from '$types/types';
	import ClipContent from '$components/ClipContent.svelte';

	export let clip: ClipType;
	export let editClipId: string | undefined;
	export let updateClip: (clip: ClipType, timestamp?: boolean) => void;

	let copyButtonText = 'copy';

	function handleClickEdit() {
		editClipId = clip.id;
	}

	async function handleClickCopy() {
		try {
			await navigator.clipboard.writeText(clip.content);
			updateClip({ ...clip, copyCount: clip.copyCount + 1 }, false);
			copyButtonText = 'copied!';
			setTimeout(() => (copyButtonText = 'copy'), 2000);
		} catch (err) {
			console.log('Error writing to clipboard', err);
		}
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
	<button
		on:click={handleClickCopy}
		class="w-16 px-2 py-1 text-sm font-semibold text-black hover:bg-gray-200"
		>{copyButtonText}</button
	>
</div>
