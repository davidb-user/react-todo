export type NoteId = string;

export interface Note extends NoteDetails {
	id: NoteId;
}

export interface NoteDetails {
	content: string;
	isComplete: boolean;
}
