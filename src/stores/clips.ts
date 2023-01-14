import { createId } from '$lib/utils';
import { persistedStore } from '$stores/persisted';
import type { ClipType } from '$types/types';

const initialClips: ClipType[] = [
	{
		id: createId(),
		createdAtMs: Date.now(),
		updatedAtMs: Date.now(),
		content: 'My first clip.',
		format: 'text'
	}
];

export const clipsStore = persistedStore('clipsStore', initialClips);
