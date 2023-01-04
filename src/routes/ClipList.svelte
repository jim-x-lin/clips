<script lang="ts">
	import Clip from './Clip.svelte';
	import type { ClipType } from '../types';

	export let clips: ClipType[];
</script>

<ul>
	{#each clips as clip (clip.id)}
		<li>
			<Clip {clip} />
		</li>
	{/each}
</ul>
