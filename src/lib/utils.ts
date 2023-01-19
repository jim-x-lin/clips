import type { FormatType } from '$types/types';

export const createId = () => `${Date.now()}-${Math.floor(Math.random() * 999)}`;

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
