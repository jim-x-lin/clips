<script lang="ts">
	import type { ClipType } from '$types/types';
	import ClipViewDeleted from './ClipViewDeleted.svelte';

	export let clips: ClipType[];

	let deletedClipsCount: number;

	$: deletedClipsCount = clips.filter((c) => c.deletedAtMs).length;

	function restoreClip(clip: ClipType): void {
		const i = clips.findIndex((c) => c.id === clip.id);
		clips[i] = { ...clip, updatedAtMs: Date.now(), deletedAtMs: undefined };
	}

	function removeDeletedClips(): void {
		const cancelRemoval = !window.confirm(`Permanently delete ${deletedClipsCount} clips?`);
		if (cancelRemoval) return;
		clips = clips.filter((c) => !c.deletedAtMs);
	}

	function sortRecency(clipA: ClipType, clipB: ClipType): number {
		return clipB.updatedAtMs - clipA.updatedAtMs;
	}

	function sort(clips: ClipType[]): ClipType[] {
		return clips.sort(sortRecency);
	}

	function organized(clips: ClipType[]): ClipType[] {
		return sort(clips.filter((c) => c.deletedAtMs));
	}
</script>

<div>
	<button
		on:click={removeDeletedClips}
		class="mb-4 w-24 rounded-md border-none bg-red-500 px-2 py-1 text-white hover:bg-red-600"
		class:cursor-not-allowed={deletedClipsCount === 0}
		disabled={deletedClipsCount === 0}>Delete all</button
	>
	{#each organized(clips) as clip (clip.id)}
		<ClipViewDeleted {clip} {restoreClip} />
	{/each}
</div>
