<script lang="ts">
	import type { ClipType } from '$types/types';
	import PinnedClip from './PinnedClip.svelte';

	export let clips: ClipType[];
	export let updateClip: (clip: ClipType, timestamp?: boolean) => void;

	function unpinClip(clip: ClipType): void {
		const i = clips.findIndex((c) => c.id === clip.id);
		clips[i] = { ...clip, pinnedAtMs: undefined };
	}

	function sortRecency(clipA: ClipType, clipB: ClipType): number {
		return clipB.updatedAtMs - clipA.updatedAtMs;
	}

	function sort(clips: ClipType[]): ClipType[] {
		return clips.sort(sortRecency);
	}

	function organized(clips: ClipType[]): ClipType[] {
		return sort(clips.filter((c) => c.pinnedAtMs));
	}
</script>

<div class="container mx-auto mb-8 max-w-screen-lg">
	{#each organized(clips) as clip (clip.id)}
		<PinnedClip {clip} {unpinClip} {updateClip} />
	{/each}
</div>
