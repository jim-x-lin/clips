<script lang="ts">
	import type { ClipType } from '$types/types';
	import { SortEnum, FilterEnum } from '$types/types';
	// import ClipListPinned from '$components/ClipListPinned.svelte';
	import ClipViewDefault from '$components/ClipViewDefault.svelte';
	import EditClip from '$components/EditClip.svelte';
	import OrganizeClips from '$components/OrganizeClips.svelte';

	export let clips: ClipType[];
	export let filterCriteria: FilterEnum;

	let editClipId: string | undefined = undefined;
	let sortCriteria: SortEnum = SortEnum.RECENCY;
	let sortReverse: boolean = false;

	function updateClip(clip: ClipType, timestamp: boolean = true): void {
		const i = clips.findIndex((c) => c.id === clip.id);
		clips[i] = timestamp ? { ...clip, updatedAtMs: Date.now() } : { ...clip };
		editClipId = undefined;
	}

	function updateSortCriteria(criteria: SortEnum, toggleReverse: boolean): void {
		if (toggleReverse) {
			sortReverse = !sortReverse;
		}
		sortCriteria = criteria;
		editClipId = undefined;
	}

	function sortRecency(clipA: ClipType, clipB: ClipType): number {
		return clipB.updatedAtMs - clipA.updatedAtMs;
	}

	function sortUsage(clipA: ClipType, clipB: ClipType): number {
		return clipB.copyCount - clipA.copyCount;
	}

	function sortFormat(clipA: ClipType, clipB: ClipType): number {
		return clipA.format.localeCompare(clipB.format);
	}

	function sort(clips: ClipType[], sortCriteria: SortEnum, sortReverse: boolean): ClipType[] {
		const sortedClips: ClipType[] =
			sortCriteria === SortEnum.RECENCY
				? clips.sort(sortRecency)
				: sortCriteria === SortEnum.USAGE
				? clips.sort(sortUsage)
				: sortCriteria === SortEnum.FORMAT
				? clips.sort(sortFormat)
				: clips;
		return sortReverse ? sortedClips.reverse() : sortedClips;
	}

	function filter(clips: ClipType[], filterCriteria: FilterEnum) {
		if (filterCriteria === FilterEnum.DELETED) {
			return clips.filter((clip) => clip.deletedAtMs);
		}
		return clips.filter((clip) => !clip.deletedAtMs);
	}

	function organized(
		clips: ClipType[],
		sortCriteria: SortEnum,
		sortReverse: boolean,
		filterCriteria: FilterEnum
	): ClipType[] {
		const filteredClips = filter(clips, filterCriteria);
		return sort(filteredClips, sortCriteria, sortReverse);
	}
</script>

<div>
	<!-- <ClipListPinned {clips} {updateClip} /> -->
	<OrganizeClips {updateSortCriteria} {sortCriteria} />
	{#each organized(clips, sortCriteria, sortReverse, filterCriteria) as clip (clip.id)}
		{#if clip.id === editClipId}
			<EditClip {clip} {updateClip} bind:editClipId />
		{:else}
			<ClipViewDefault {clip} {updateClip} bind:editClipId />
		{/if}
	{/each}
</div>
