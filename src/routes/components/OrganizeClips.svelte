<script lang="ts">
	import { SortEnum } from '$types/types';

	export let updateSortCriteria: (criteria: SortEnum, toggleReverse: boolean) => void;
	export let sortCriteria: SortEnum;

	function handleClickRecency() {
		updateSortCriteria(SortEnum.RECENCY, sortCriteria === SortEnum.RECENCY);
	}

	function handleClickUsage() {
		updateSortCriteria(SortEnum.USAGE, sortCriteria === SortEnum.USAGE);
	}

	function handleClickFormat() {
		updateSortCriteria(SortEnum.FORMAT, sortCriteria === SortEnum.FORMAT);
	}
</script>

<div class="flex">
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
		class="text-md mr-4 w-24 rounded-md border-none bg-green-500 px-2 py-1 text-white ring-offset-2 hover:bg-green-600"
		>Format</button
	>
</div>
