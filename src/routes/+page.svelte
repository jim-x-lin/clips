<script lang="ts">
	import { clipsStore } from '$stores/clips';
	import { FilterEnum } from '$types/types';
	import AddClip from '$components/AddClip.svelte';
	import SideBar from '$components/SideBar.svelte';
	import ClipList from '$components/ClipList.svelte';
	import ClipListDeleted from '$components/ClipListDeleted.svelte';
	import ClipListEmpty from '$components/ClipListEmpty.svelte';

	let filterCriteria: FilterEnum = FilterEnum.ALL;
</script>

<div class="flex flex-row">
	<div class="w-1/12 sm:w-3/12 xl:w-2/12">
		<SideBar bind:filterCriteria bind:clips={$clipsStore} />
	</div>
	<div class="mx-auto w-11/12 max-w-screen-lg px-4 py-8 sm:w-9/12 xl:w-10/12">
		{#if filterCriteria !== FilterEnum.DELETED}<AddClip bind:clips={$clipsStore} />{/if}
		{#if $clipsStore.length === 0}
			<ClipListEmpty bind:clips={$clipsStore} />
		{:else if filterCriteria !== FilterEnum.DELETED}
			<ClipList bind:clips={$clipsStore} {filterCriteria} />
		{:else}
			<ClipListDeleted bind:clips={$clipsStore} />
		{/if}
	</div>
</div>
