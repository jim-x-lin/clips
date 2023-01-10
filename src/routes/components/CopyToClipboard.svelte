<script lang="ts">
	export let content: string;

	async function handleClick() {
		try {
			await navigator.clipboard.writeText(content);
			console.log('wrote to clipboard:', content);
		} catch (err) {
			console.log('Error writing to clipboard', err);
		}
	}
</script>

<button
	on:click={handleClick}
	class="w-16 px-2 py-1 text-sm font-semibold text-black hover:bg-gray-400 hover:text-white"
	>copy</button
>
