<script lang="ts">
	import Clip from './Clip.svelte';
	import type { ClipType } from '$types/types';

	export let clips: ClipType[];

	function sortRecent(clipA: ClipType, clipB: ClipType): number {
		return clipB.createdAtMs - clipA.createdAtMs;
	}

	function organized(clips: ClipType[]) {
		return clips.sort(sortRecent);
	}
</script>

<div class="container mx-auto max-w-screen-sm">
	{#each organized(clips) as clip (clip.id)}
		<Clip {clip} />
	{/each}
</div>
