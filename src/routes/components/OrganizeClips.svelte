<script lang="ts">
	import { SortEnum } from '$types/types';

	export let sortCriteria: SortEnum;
	export let sortReverse: boolean;
	export let editClipId: string | undefined;

	function handleClickReverse() {
		sortReverse = !sortReverse;
		editClipId = undefined;
	}

	function handleClickRecency() {
		sortCriteria = SortEnum.RECENCY;
		editClipId = undefined;
	}

	function handleClickUsage() {
		sortCriteria = SortEnum.USAGE;
		editClipId = undefined;
	}

	function handleClickFormat() {
		sortCriteria = SortEnum.FORMAT;
		editClipId = undefined;
	}
</script>

<div class="flex">
	<button
		on:click={handleClickReverse}
		class:ring={sortReverse}
		class="text-md mr-4 w-24 rounded-md border-none bg-emerald-500 px-2 py-1 text-white ring-offset-2 hover:bg-emerald-600"
		>Reverse</button
	>
	<button
		on:click={handleClickRecency}
		class:ring={sortCriteria === SortEnum.RECENCY}
		class="text-md mr-4 w-24 rounded-md border-none bg-green-500 px-2 py-1 text-white ring-offset-2 hover:bg-green-600"
		>Recency</button
	>
	<button
		on:click={handleClickUsage}
		class:ring={sortCriteria === SortEnum.USAGE}
		class="text-md mr-4 w-24 rounded-md border-none bg-green-500 px-2 py-1 text-white ring-offset-2 hover:bg-green-600"
		>Usage</button
	>
	<button
		on:click={handleClickFormat}
		class:ring={sortCriteria === SortEnum.FORMAT}
		class="text-md mx-2 w-24 rounded-md border-none bg-green-500 px-2 py-1 text-white ring-offset-2 hover:bg-green-600"
		>Format</button
	>
</div>
