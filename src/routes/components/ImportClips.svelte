<script lang="ts">
	import type { ClipType } from '$types/types';
	import { createId, validClip } from '$lib/utils';

	export let clips: ClipType[];

	let files: FileList;

	$: if (files) {
		importJsonFile(files.item(0));
	}

	function importClips(jsonText: string | ArrayBuffer | null) {
		if (typeof jsonText !== 'string') {
			alert('Not a valid file');
			return;
		}

		try {
			const clipsFromJson = JSON.parse(jsonText);
			if (!Array.isArray(clipsFromJson)) {
				alert('Not a valid file');
				return;
			}

			const clipsToImport = clipsFromJson.filter((clipToImport: any) => {
				if (!validClip(clipToImport)) return false;
				const duplicate = clips.some((clip) => clip.content === clipToImport.content);
				if (duplicate) return false;
				return true;
			});
			if (clipsToImport.length === 0) {
				alert('No valid clips were found');
				return;
			}
			const cancelImport = !window.confirm(`Import ${clipsToImport.length} clips?`);
			if (cancelImport) return;

			clips = [
				...clips,
				...clipsToImport.map((clipToImport) => ({
					...clipToImport,
					id: createId(),
					createdAtMs: Date.now(),
					updatedAtMs: Date.now()
				}))
			];
		} catch (err) {
			alert('Error importing clips');
		}
	}

	async function importJsonFile(file: File | null) {
		if (!file) {
			alert('Not a valid file');
			return;
		}
		const reader = new FileReader();
		reader.onload = () => importClips(reader.result);
		reader.readAsText(file);
	}
</script>

<input bind:files accept="application/json" type="file" id="files" class="hidden" />
<label
	for="files"
	class="mb-4 block w-full cursor-pointer rounded-md border-none bg-yellow-500 px-2 py-1 text-center text-white hover:bg-yellow-600"
	>Import</label
>
