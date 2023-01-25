<script lang="ts">
	import type { ClipType } from '$types/types';

	export let clip: ClipType;

	const format = clip.formatCustom || clip.format;
</script>

{#if format === 'email'}
	<div class="flex-1 truncate px-2 py-1 underline">
		{clip.content}
	</div>
{:else if format === 'url'}
	<div class="flex-1 truncate px-2 py-1">
		<a class="underline" href={clip.content} rel="noopener noreferrer" target="_blank"
			>{clip.content}</a
		>
	</div>
{:else if format === 'key'}
	<div class="flex-1 truncate px-2 py-1 font-mono blur-sm hover:blur-none">
		{clip.content}
	</div>
{:else if format === 'code'}
	<div class="flex-1 truncate px-2 py-1 font-mono font-semibold">
		{clip.content}
	</div>
{:else if format === 'longText'}
	<div class="flex-1 px-2 py-1 line-clamp-2">
		{clip.content}
	</div>
{:else}
	<div class="flex-1 truncate px-2 py-1">
		{clip.content}
	</div>
{/if}
