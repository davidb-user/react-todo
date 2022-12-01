import React from "react";
import { generateNote, noteMock, notesMock } from "../../../test/mockData";
import {
	fireEvent,
	getQueriesForElement,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import NotesList, { classNames } from "./notesList";
import { classNames as notesListClassNames } from "../noteRow/noteRow";
import { queryAllByClassName, queryByClassName } from "../../../test/queries";
import userEvent from "@testing-library/user-event";
import {
	getNoteContentInput,
	getRemoveNoteButton,
} from "../noteRow/noteRow.spec";

export const getNotesList = (container: Element) =>
	queryByClassName(container, classNames.notesList);
const getNoteRows = (container: Element) =>
	queryAllByClassName(container, notesListClassNames.noteRow);

describe("NotesList", () => {
	describe("elements", () => {
		describe("root element", () => {
			it("should be created", () => {
				const { container } = render(
					<NotesList
						notes={notesMock}
						onNoteUpdated={jest.fn()}
						onRemoveNote={jest.fn()}
					/>
				);

				expect(getNotesList(container)).toBeInTheDocument();
			});
		});

		describe("rows", () => {
			describe("zero rows", () => {
				it("should not contain note rows", () => {
					const { container } = render(
						<NotesList
							notes={[]}
							onNoteUpdated={jest.fn()}
							onRemoveNote={jest.fn()}
						/>
					);

					const notesList = getNotesList(container);
					const rows = getNoteRows(notesList);

					expect(rows).toHaveLength(0);
				});
			});

			describe("more than zero rows", () => {
				it("should contain note rows", () => {
					const { container } = render(
						<NotesList
							notes={notesMock}
							onNoteUpdated={jest.fn()}
							onRemoveNote={jest.fn()}
						/>
					);

					const notesList = getNotesList(container);
					const rows = getNoteRows(notesList);

					expect(rows).toHaveLength(notesMock.length);
				});
			});
		});
	});

	describe("events", () => {
		let user: ReturnType<typeof userEvent["setup"]>;

		beforeEach(() => {
			user = userEvent.setup();
		});

		describe("node row", () => {
			describe("onNoteUpdated", () => {
				describe("content text input", () => {
					it(`should call props onNoteUpdated with new content value`, async () => {
						const onNoteUpdated = jest.fn();
						const content = "content";
						const newContent = "newContent";
						const note = generateNote({ content });
						render(
							<NotesList
								notes={[note]}
								onNoteUpdated={onNoteUpdated}
								onRemoveNote={jest.fn()}
							/>
						);

						await fireEvent.dblClick(getNoteContentInput());
						await user.type(getNoteContentInput(), newContent);

						const newContentChars = newContent.split("");
						expect(onNoteUpdated).toHaveBeenCalledTimes(newContentChars.length);
						newContentChars.forEach((value, index) => {
							expect(onNoteUpdated).nthCalledWith(index + 1, note.id, {
								content: content + value,
							});
						});
					});
				});
			});

			describe("onRemoveNote", () => {
				describe("content text input", () => {
					it(`should call props onNoteUpdated with new content value`, async () => {
						const onRemoveNote = jest.fn();
						render(
							<NotesList
								notes={[noteMock]}
								onNoteUpdated={jest.fn()}
								onRemoveNote={onRemoveNote}
							/>
						);

						await user.click(getRemoveNoteButton());

						expect(onRemoveNote).toHaveBeenCalledTimes(1);
						expect(onRemoveNote).toHaveBeenCalledWith(noteMock.id);
					});
				});
			});
		});
	});
});
