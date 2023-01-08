<script lang="ts">
	import { clipsStore } from '$stores/clips';
	import AddClip from './components/AddClip.svelte';
	import ClipList from './components/ClipList.svelte';
	import Debug from './components/Debug.svelte';
</script>

<div class="container mx-auto min-w-max px-8 py-8">
	<h1 class="black text-xl font-bold">CLIPS</h1>
	<Debug />
	<AddClip bind:clips={$clipsStore} />
	<ClipList clips={$clipsStore} />
</div>
