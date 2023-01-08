<script lang="ts">
	import CopyToClipboard from './CopyToClipboard.svelte';
	import type { ClipType } from '$types/types';

	export let clip: ClipType;
</script>

<div class="my-4 flex divide-x divide-solid rounded-md border border-gray-400 hover:outline">
	<!-- {JSON.stringify(clip)} -->
	<div class="flex-1 truncate px-2 py-1">{clip.content}</div>
	<CopyToClipboard content={clip.content} />
</div>
