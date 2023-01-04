import { writable } from 'svelte/store';
import { createId } from '$lib/utils';
import type { ClipType, JsonValueType } from './types';

const persistedCustomStore = (key: string, initial: JsonValueType) => {
	const toString = (value: any) => JSON.stringify(value, null, 2);
	const toObject = JSON.parse;

	if (localStorage.getItem(key) === null) {
		localStorage.setItem(key, toString(initial));
	}
	const saved = toObject(localStorage.getItem(key) || '{}');

	const { subscribe, set, update } = writable(saved);
	return {
		subscribe,
		set: (value: JsonValueType) => {
			localStorage.setItem(key, toString(value));
			return set(value);
		},
		update
	};
};

const initialClips: ClipType[] = [
	{ id: createId(), createdAtMs: Date.now(), content: 'My first clip.', format: 'text' }
];

export const clipsStore = persistedCustomStore('clipsStore', initialClips);
