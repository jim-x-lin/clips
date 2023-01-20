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
	class="text-md mb-4 rounded-md border-none bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
	>Export</button
>
