<script lang="ts">
	import { SortEnum, FilterEnum } from '$types/types';

	export let sortCriteria: SortEnum;
	export let filterCriteria: FilterEnum;
	export let sortReverse: boolean;
	export let deletedClipsCount: number;
	export let removeDeletedClips: () => void;
</script>

<div class="flex">
	{#if filterCriteria === FilterEnum.DELETED && deletedClipsCount === 0}
		<button
			class="text-md mx-2 w-24 cursor-not-allowed rounded-md border-none bg-red-300 px-2 py-1 text-white"
			>Delete all</button
		>
	{:else if filterCriteria === FilterEnum.DELETED}
		<button
			on:click={removeDeletedClips}
			class="text-md mx-2 w-24 rounded-md border-none bg-red-500 px-2 py-1 text-white hover:bg-red-600"
			>Delete all</button
		>{:else}
		<button
			on:click={() => (sortReverse = !sortReverse)}
			class:ring={sortReverse}
			class="text-md mx-2 w-24 rounded-md border-none bg-emerald-500 px-2 py-1 text-white ring-offset-2 hover:bg-emerald-600"
			>Reverse</button
		>
		<button
			on:click={() => (sortCriteria = SortEnum.RECENCY)}
			class:ring={sortCriteria === SortEnum.RECENCY}
			class="text-md mx-2 w-24 rounded-md border-none bg-green-500 px-2 py-1 text-white ring-offset-2 hover:bg-green-600"
			>Recency</button
		>
		<button
			on:click={() => (sortCriteria = SortEnum.USAGE)}
			class:ring={sortCriteria === SortEnum.USAGE}
			class="text-md mx-2 w-24 rounded-md border-none bg-green-500 px-2 py-1 text-white ring-offset-2 hover:bg-green-600"
			>Usage</button
		>
		<button
			on:click={() => (sortCriteria = SortEnum.FORMAT)}
			class:ring={sortCriteria === SortEnum.FORMAT}
			class="text-md mx-2 w-24 rounded-md border-none bg-green-500 px-2 py-1 text-white ring-offset-2 hover:bg-green-600"
			>Format</button
		>
	{/if}
</div>
