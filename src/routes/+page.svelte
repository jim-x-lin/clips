<script>
	import ClipList from './ClipList.svelte';
	import { clipsStore } from '../stores';
</script>

<h1>SPA HOME</h1>
<ClipList bind:clips={$clipsStore} />
