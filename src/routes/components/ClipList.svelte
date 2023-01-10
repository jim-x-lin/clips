<script lang="ts">
	import Clip from './Clip.svelte';
	import type { ClipType } from '$types/types';
	import { SortEnum } from '$types/types';
	import SortClips from './SortClips.svelte';

	export let clips: ClipType[];

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
		<Clip {clip} />
	{/each}
</div>
