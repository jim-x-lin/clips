<script lang="ts">
	import Logo from './Logo.svelte';
	import ExportClips from './ExportClips.svelte';
	import { FilterEnum } from '$types/types';
	import type { ClipType } from '$types/types';

	export let filterCriteria: FilterEnum;
	export let clips: ClipType[];
</script>

<div
	class="sticky top-0 flex h-screen w-64 flex-initial flex-col justify-start bg-blue-200 py-8 px-4"
>
	<div class="mx-auto mb-4">
		<Logo />
	</div>
	<button
		on:click={() => (filterCriteria = FilterEnum.ALL)}
		class:bg-blue-600={filterCriteria === FilterEnum.ALL}
		class="text-md mb-4 rounded-md border-none bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
		>All Clips</button
	>
	<button
		on:click={() => (filterCriteria = FilterEnum.DELETED)}
		class:bg-blue-600={filterCriteria === FilterEnum.DELETED}
		class="text-md mb-4 rounded-md border-none bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
		>Deleted Clips</button
	>
	<ExportClips {clips} />
</div>
