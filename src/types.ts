export type ClipType = {
	id: string;
	createdAtMs: number;
	deletedAtMs?: number;
	content: string;
	format: 'text' | 'longText' | 'url' | 'code' | 'key';
};

export type JsonValueType =
	| string
	| number
	| boolean
	| null
	| JsonValueType[]
	| { [key: string]: JsonValueType };
