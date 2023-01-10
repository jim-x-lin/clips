export type ClipType = {
	id: string;
	createdAtMs: number;
	deletedAtMs?: number;
	favorite?: boolean;
	content: string;
	format: 'text' | 'longText' | 'url' | 'code' | 'key';
};

export const enum SortEnum {
	RECENCY,
	FORMAT
}

export type JsonValueType =
	| string
	| number
	| boolean
	| null
	| JsonValueType[]
	| { [key: string]: JsonValueType };
