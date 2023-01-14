export type ClipType = {
	id: string;
	createdAtMs: number;
	updatedAtMs: number;
	deletedAtMs?: number;
	favorite?: boolean;
	content: string;
	format: 'text' | 'longText' | 'url' | 'code' | 'key';
	copyCount: number;
};

export const enum SortEnum {
	RECENCY,
	FORMAT,
	USAGE
}

export const enum FilterEnum {
	ALL,
	DELETED
}

export type JsonValueType =
	| string
	| number
	| boolean
	| null
	| JsonValueType[]
	| { [key: string]: JsonValueType };
