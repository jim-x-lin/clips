import type { FormatType } from '$types/types';
import { text } from 'svelte/internal';

export const createId = () => `${Date.now()}-${Math.floor(Math.random() * 999)}`;

export const cleanContentString = (content: string): string => {
	return content.trim();
};

export const categorizeContent = (content: string): FormatType => {
	if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(content)) {
		return 'url';
	}
	if (/^[A-Za-z]+.+ -[A-Za-z]+/.test(content)) {
		return 'code';
	}
	if (/^[\S]+$/.test(content)) {
		return 'key';
	}
	if (content.length > 256 || /\r|\n/.test(content)) {
		return 'longText';
	}
	return 'text';
};
