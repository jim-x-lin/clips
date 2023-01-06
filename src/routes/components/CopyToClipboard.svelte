<script lang="ts">
	export let content: string;

	async function copyToClipboard() {
		await navigator.clipboard.writeText(content);
		return '';
	}

	let promise = copyToClipboard();

	function handleClick() {
		promise = copyToClipboard();
	}
</script>

<button on:click={handleClick}>copy to clipboard</button>

{#await promise then}
	<i>copied to clipboard!</i>
{/await}
