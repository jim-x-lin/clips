import { writable } from 'svelte/store';
import type { JsonValueType } from '$types/types';

export const persistedStore = <T extends JsonValueType>(key: string, initial: T) => {
	const toString = (value: T) => JSON.stringify(value, null, 2);
	const toObject = JSON.parse;

	if (localStorage.getItem(key) === null) {
		localStorage.setItem(key, toString(initial));
	}
	const saved = toObject(localStorage.getItem(key) || '{}');

	const { subscribe, set, update } = writable<T>(saved);
	return {
		subscribe,
		set: (value: T) => {
			localStorage.setItem(key, toString(value));
			return set(value);
		},
		update
	};
};
