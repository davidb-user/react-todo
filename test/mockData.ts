import { Note } from "../src/types/note";

function createId(): string {
	return "id" + Math.random().toString(16).slice(2);
}

const generateNote = (): Note => ({
	id: createId(),
	content: `content ${createId()}`,
	isComplete: false,
});

function generateNotesList(length: number): Note[] {
	return Array.from({ length }, generateNote);
}

export const noteMock: Note = generateNote();
export const notesMock: Note[] = generateNotesList(3);
