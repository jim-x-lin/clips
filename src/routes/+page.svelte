<script lang="ts">
	import { clipsStore } from '$stores/clips';
	import ClipList from './components/ClipList.svelte';
	import AddClip from './components/AddClip.svelte';
</script>

<h1>SPA HOME</h1>

<AddClip bind:clips={$clipsStore} />
<ClipList clips={$clipsStore} />
