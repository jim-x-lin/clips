<script lang="ts">
	import FileSaver from 'file-saver';
	import type { ClipType } from '$types/types';

	export let clips: ClipType[];

	function handleClickExport() {
		const clipsText = JSON.stringify(
			clips.filter((c) => !c.deletedAtMs),
			null,
			2
		);
		const blob = new Blob([clipsText], { type: 'application/json;charset=utf-8' });
		FileSaver.saveAs(blob, 'clips.json');
	}
</script>

<button
	on:click={handleClickExport}
	class="mb-4 w-full rounded-md border-none bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600"
	>Export</button
>
