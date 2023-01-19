<script lang="ts">
	import { clipsStore } from '$stores/clips';
	import AddClip from './components/AddClip.svelte';
	import SideBar from './components/SideBar.svelte';
	import ClipList from './components/ClipList.svelte';
	import Debug from './components/Debug.svelte';
	import { FilterEnum } from '$types/types';

	let filterCriteria: FilterEnum = FilterEnum.ALL;
</script>

<div class="flex flex-row">
	<SideBar bind:filterCriteria />
	<div class="container px-4 py-8">
		<Debug />
		{#if filterCriteria !== FilterEnum.DELETED}<AddClip bind:clips={$clipsStore} />{/if}
		<ClipList bind:clips={$clipsStore} {filterCriteria} />
	</div>
</div>
