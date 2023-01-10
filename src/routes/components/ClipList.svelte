<script lang="ts">
	import ViewClip from './ViewClip.svelte';
	import EditClip from './EditClip.svelte';
	import type { ClipType } from '$types/types';
	import { SortEnum } from '$types/types';
	import SortClips from './SortClips.svelte';

	export let clips: ClipType[];

	let editClipId: string | undefined = undefined;
	let sortCriteria: SortEnum = SortEnum.RECENCY;
	let sortReverse: boolean = false;

	function sortRecency(clipA: ClipType, clipB: ClipType): number {
		return clipB.createdAtMs - clipA.createdAtMs;
	}

	function sortFormat(clipA: ClipType, clipB: ClipType): number {
		return clipA.format.localeCompare(clipB.format);
	}

	function sort(clips: ClipType[], sortCriteria: SortEnum, sortReverse: boolean): ClipType[] {
		const sortedClips: ClipType[] =
			sortCriteria === SortEnum.RECENCY
				? clips.sort(sortRecency)
				: sortCriteria === SortEnum.FORMAT
				? clips.sort(sortFormat)
				: clips;
		return sortReverse ? sortedClips.reverse() : sortedClips;
	}

	function organized(clips: ClipType[], sortCriteria: SortEnum, sortReverse: boolean): ClipType[] {
		return sort(clips, sortCriteria, sortReverse);
	}
</script>

<div class="container mx-auto mt-4 max-w-screen-sm ">
	<SortClips bind:sortCriteria bind:sortReverse />
	{#each organized(clips, sortCriteria, sortReverse) as clip (clip.id)}
		{#if clip.id === editClipId}
			<EditClip bind:clip bind:editClipId />
		{:else}
			<ViewClip {clip} bind:editClipId />
		{/if}
	{/each}
</div>
