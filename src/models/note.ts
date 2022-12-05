export type NoteId = string;
function createId(): NoteId {
	return "id" + Math.random().toString(16).slice(2);
}

export interface NoteDetails {
	content: string;
	isComplete: boolean;
}

export class Note implements NoteDetails {
	id: NoteId = createId();
	content: string;
	isComplete: boolean;

	constructor({ content, isComplete }: NoteDetails) {
		this.content = content;
		this.isComplete = isComplete;
	}
}
