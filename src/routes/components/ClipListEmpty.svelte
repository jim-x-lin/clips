<script lang="ts">
	import type { ClipType } from '$types/types';
	import { createId } from '$lib/utils';

	export let clips: ClipType[];

	function handleClickHere() {
		const timestampMs = Date.now();
		const sampleClips = [
			{
				id: createId(),
				createdAtMs: timestampMs,
				updatedAtMs: timestampMs,
				content: 'Lorem ipsum dolor sit amet',
				format: 'text',
				copyCount: 0
			},
			{
				id: createId(),
				createdAtMs: timestampMs,
				updatedAtMs: timestampMs,
				content: `Lorem ipsum dolor sit amet,
    consectetur
adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
`,
				format: 'longText',
				copyCount: 0
			},
			{
				id: createId(),
				createdAtMs: timestampMs + 1,
				updatedAtMs: timestampMs + 1,
				content: 'https://www.jimxlin.com/',
				format: 'url',
				copyCount: 0
			},
			{
				id: createId(),
				createdAtMs: timestampMs + 2,
				updatedAtMs: timestampMs + 2,
				pinnedAtMs: timestampMs + 2,
				content: 'docker exec -it ubuntu_bash bash',
				format: 'code',
				copyCount: 0
			},
			{
				id: createId(),
				createdAtMs: timestampMs + 3,
				updatedAtMs: timestampMs + 3,
				content: 'oo_SkDv6cBh0xlDTZCsxf31-mG_tAYKS9zstQNSnG_0',
				format: 'key',
				copyCount: 0
			}
		].reverse();
		clips = [...(<ClipType[]>sampleClips)];
	}
</script>

<div class="container mx-auto max-w-screen-lg text-center text-gray-400">
	<p class="mb-4">
		Click <span class="rounded-md bg-blue-200 px-4 py-1 text-white">Paste</span> to save text from your
		clipboard
	</p>
	<p>
		<button class="underline" on:click={handleClickHere}>Click Here</button> to add some sample clips
	</p>
</div>
