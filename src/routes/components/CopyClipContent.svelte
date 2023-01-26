<script lang="ts">
	import type { ClipType } from '$types/types';

	export let clip: ClipType;
	export let updateClip: (clip: ClipType, timestamp?: boolean) => void;

	let copyButtonText = 'copy';

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

<button
	on:click={handleClickCopy}
	class="w-16 px-2 py-1 text-sm font-semibold text-black hover:bg-gray-200">{copyButtonText}</button
>
