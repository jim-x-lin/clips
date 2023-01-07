<script lang="ts">
	export let content: string;

	let copySuccess = false;

	async function handleClick() {
		try {
			await navigator.clipboard.writeText(content);
			copySuccess = true;
		} catch (err) {
			console.log('Error writing to clipboard', err);
		}
	}
</script>

<button
	on:click={handleClick}
	class="rounded-full border border-blue-600 px-4 py-1 text-sm font-semibold text-blue-600 hover:border-transparent hover:bg-blue-600 hover:text-white"
	>copy to clipboard</button
>
{#if copySuccess}
	<i>copied to clipboard!</i>
{/if}
