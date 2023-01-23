import { customAlphabet } from 'nanoid/non-secure';
import type { FormatType } from '$types/types';

export const createId = () => {
	const nanoid = customAlphabet('1234567890abcdefghijklmnoprqstuvwxyz', 10);
	return `${Date.now()}-${nanoid()}`;
};

export const categorizeContent = (content: string): FormatType => {
	if (/^[a-zA-Z0-9_\-.+]+@([a-zA-Z0-9_\-]+\.)+[a-z]{2,4}$/.test(content)) {
		return 'email';
	}
	if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(content)) {
		return 'url';
	}
	if (/^[A-Za-z]+.+ -[A-Za-z]+/.test(content)) {
		return 'code';
	}
	if (content.length > 7 && /^[\S]+$/.test(content)) {
		return 'key';
	}
	if (content.length > 255 || /\r|\n/.test(content)) {
		return 'longText';
	}
	return 'text';
};

export const validClip = (clip: any) => {
	if (typeof clip.id !== 'string') return false;
	if (typeof clip.createdAtMs !== 'number') return false;
	if (typeof clip.updatedAtMs !== 'number') return false;
	if (typeof clip.content !== 'string') return false;
	if (typeof clip.format !== 'string') return false;
	if (typeof clip.copyCount !== 'number') return false;
	return true;
};
