<script lang="ts">
	import type { ClipType } from '$types/types';
	import { clipsStore } from '$stores/clips';
	import { createId } from '$lib/utils';

	function handleClickWipe() {
		$clipsStore = [];
	}

	function seed(): ClipType[] {
		return [
			{
				id: createId(),
				createdAtMs: Date.now(),
				updatedAtMs: Date.now(),
				content: 'Lorem ipsum dolor sit amet',
				format: 'text',
				copyCount: 0
			},
			{
				id: createId(),
				createdAtMs: Date.now(),
				updatedAtMs: Date.now(),
				content: `
Lorem ipsum dolor sit amet,
    consectetur
adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
`,
				format: 'longText',
				copyCount: 0
			},
			{
				id: createId(),
				createdAtMs: Date.now() + 1,
				updatedAtMs: Date.now() + 1,
				content: 'https://www.jimxlin.com/',
				format: 'url',
				copyCount: 0
			},
			{
				id: createId(),
				createdAtMs: Date.now() + 2,
				updatedAtMs: Date.now() + 2,
				content: 'docker exec -it ubuntu_bash bash',
				format: 'code',
				copyCount: 0
			},
			{
				id: createId(),
				createdAtMs: Date.now() + 3,
				updatedAtMs: Date.now() + 3,
				content: 'oo_SkDv6cBh0xlDTZCsxf31-mG_tAYKS9zstQNSnG_0',
				format: 'key',
				copyCount: 0
			}
		];
	}

	function handleClickSeed() {
		$clipsStore = [...$clipsStore, ...seed().reverse()];
	}

	function handleClickPrintDataToConsole() {
		console.log('Clips:', $clipsStore);
	}
</script>

<div class="mb-8 w-full border-4 border-dashed border-red-600 p-2">
	<button
		on:click={handleClickWipe}
		class="mx-1 border-none bg-yellow-300 px-2 py-1 font-bold text-red-600">Delete all clips</button
	>
	<button
		on:click={handleClickSeed}
		class="mx-1 border-none bg-yellow-300 px-2 py-1 font-bold text-red-600">Seed clips</button
	>
	<button
		on:click={handleClickPrintDataToConsole}
		class="mx-1 border-none bg-yellow-300 px-2 py-1 font-bold text-red-600"
		>Print data to console</button
	>
</div>
