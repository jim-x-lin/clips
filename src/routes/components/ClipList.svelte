<script lang="ts">
	import ViewClip from './ViewClip.svelte';
	import DeletedClip from './DeletedClip.svelte';
	import EditClip from './EditClip.svelte';
	import type { ClipType } from '$types/types';
	import { SortEnum, FilterEnum } from '$types/types';
	import SortClips from './SortClips.svelte';

	export let clips: ClipType[];
	export let filterCriteria: FilterEnum;

	let editClipId: string | undefined = undefined;
	let sortCriteria: SortEnum = SortEnum.RECENCY;
	let sortReverse: boolean = false;

	function updateClip(clipId: string, content: string) {
		const i = clips.findIndex((clip) => clip.id === clipId);
		clips[i] = { ...clips[i], content, updatedAtMs: Date.now() };
		editClipId = undefined;
	}

	function deleteClip(clipId: string) {
		const i = clips.findIndex((clip) => clip.id === clipId);
		clips[i] = { ...clips[i], deletedAtMs: Date.now() };
		editClipId = undefined;
	}

	function restoreClip(clipId: string) {
		const i = clips.findIndex((clip) => clip.id === clipId);
		clips[i] = { ...clips[i], deletedAtMs: undefined, updatedAtMs: Date.now() };
	}

	function sortRecency(clipA: ClipType, clipB: ClipType): number {
		return clipB.updatedAtMs - clipA.updatedAtMs;
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

<div class="container mx-auto mt-4 max-w-screen-sm ">
	<SortClips bind:sortCriteria bind:sortReverse />
	{#each organized(clips, sortCriteria, sortReverse, filterCriteria) as clip (clip.id)}
		{#if clip.id === editClipId}
			<EditClip {clip} {updateClip} {deleteClip} bind:editClipId />
		{:else if clip.deletedAtMs}
			<DeletedClip {clip} {restoreClip} />
		{:else}
			<ViewClip {clip} bind:editClipId />
		{/if}
	{/each}
</div>
