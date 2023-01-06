<script lang="ts">
	import Clip from './Clip.svelte';
	import type { ClipType } from '$types/types';
	import CopyToClipboard from './CopyToClipboard.svelte';

	export let clips: ClipType[];
</script>

<ul>
	{#each clips as clip (clip.id)}
		<li>
			<Clip {clip} />
			<CopyToClipboard content={clip.content} />
		</li>
	{/each}
</ul>
