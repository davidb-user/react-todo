import React from "react";
import { generateNote, noteMock, notesMock } from "../../../test/mockData";
import {
	fireEvent,
	getQueriesForElement,
	render,
} from "@testing-library/react";
import NotesList, { classNames, NotesFilter } from "./notesList";
import { classNames as notesListClassNames } from "../note/note";
import {
	queryAllByClassName,
	queryByClassName,
	queryBySelector,
} from "../../../test/queries";
import userEvent from "@testing-library/user-event";
import { Note } from "../../models/note";

export const getNotesList = (container: HTMLElement) =>
	queryByClassName(container, classNames.notesList);
export const getNotes = (container: HTMLElement) =>
	queryAllByClassName(container, notesListClassNames.note);
const getNoteInfo = (container: HTMLElement) =>
	queryByClassName(container, classNames.notesInfo);
const getNoteFilterButton = (container: HTMLElement, forFilter: NotesFilter) =>
	queryBySelector(
		container,
		`.${classNames.notesFilterButtons} > .${forFilter} > button`
	);
const getClearCompletedNotesButton = (container: HTMLElement) =>
	queryBySelector(container, `.${classNames.clearCompletedNotesButton} button`);

describe("NotesList", () => {
	describe("elements", () => {
		describe("root element", () => {
			it("should be created", () => {
				const { container } = render(
					<NotesList
						notes={notesMock}
						onNoteUpdated={jest.fn()}
						onRemoveNotes={jest.fn()}
					/>
				);

				expect(getNotesList(container)).toBeInTheDocument();
			});
		});

		describe("note rows", () => {
			describe("no notes", () => {
				it("should not contain note rows", () => {
					const { container } = render(
						<NotesList
							notes={[]}
							onNoteUpdated={jest.fn()}
							onRemoveNotes={jest.fn()}
						/>
					);

					const rows = getNotes(container);

					expect(rows).toHaveLength(0);
				});
			});

			describe("more than zero notes", () => {
				it("should contain note rows", () => {
					const { container } = render(
						<NotesList
							notes={notesMock}
							onNoteUpdated={jest.fn()}
							onRemoveNotes={jest.fn()}
						/>
					);

					const rows = getNotes(container);

					expect(rows).toHaveLength(notesMock.length);
				});
			});
		});

		describe("notes info", () => {
			describe("no notes", () => {
				it("should not display info", () => {
					const { container } = render(
						<NotesList
							notes={[]}
							onNoteUpdated={jest.fn()}
							onRemoveNotes={jest.fn()}
						/>
					);

					const noteInfo = getNoteInfo(container);

					expect(noteInfo).toBeNull();
				});
			});

			describe("notes available", () => {
				describe("many notes not completed", () => {
					it("should display incomplete notes count", () => {
						const notes = [
							generateNote({ isComplete: true }),
							generateNote({ isComplete: false }),
							generateNote({ isComplete: false }),
							generateNote({ isComplete: false }),
						];
						const { container } = render(
							<NotesList
								notes={notes}
								onNoteUpdated={jest.fn()}
								onRemoveNotes={jest.fn()}
							/>
						);

						const noteInfo = getNoteInfo(container);

						const incompleteNotes = notes.filter(
							({ isComplete }) => !isComplete
						);
						expect(noteInfo.innerHTML).toMatch(
							new RegExp(`${incompleteNotes.length} items `)
						);
					});
				});

				describe("no uncompleted notes", () => {
					it("should display zero notes count", () => {
						const notes = [
							generateNote({ isComplete: true }),
							generateNote({ isComplete: true }),
							generateNote({ isComplete: true }),
							generateNote({ isComplete: true }),
						];
						const { container } = render(
							<NotesList
								notes={notes}
								onNoteUpdated={jest.fn()}
								onRemoveNotes={jest.fn()}
							/>
						);

						const noteInfo = getNoteInfo(container);

						expect(noteInfo.innerHTML).toMatch(new RegExp(/0 items /));
					});
				});

				describe("one notes not completed", () => {
					it("should display incomplete note count", () => {
						const notes = [
							generateNote({ isComplete: true }),
							generateNote({ isComplete: true }),
							generateNote({ isComplete: true }),
							generateNote({ isComplete: false }),
						];
						const { container } = render(
							<NotesList
								notes={notes}
								onNoteUpdated={jest.fn()}
								onRemoveNotes={jest.fn()}
							/>
						);

						const noteInfo = getNoteInfo(container);

						expect(noteInfo.innerHTML).toMatch(new RegExp(/1 item /));
					});
				});
			});
		});

		describe("notes filter buttons", () => {
			it.each(Object.values(NotesFilter))(
				"should render button for %s filter",
				(filter: NotesFilter) => {
					const { container } = render(
						<NotesList
							notes={notesMock}
							onNoteUpdated={jest.fn()}
							onRemoveNotes={jest.fn()}
						/>
					);

					const noteFilterButton = getNoteFilterButton(container, filter);

					expect(noteFilterButton).toBeInTheDocument();
				}
			);
		});

		describe("clear completed notes button", () => {
			describe("no completed notes", () => {
				it("should not display button", () => {
					const { container } = render(
						<NotesList
							notes={[generateNote({ isComplete: false })]}
							onNoteUpdated={jest.fn()}
							onRemoveNotes={jest.fn()}
						/>
					);

					const clearCompletedNotesButton =
						getClearCompletedNotesButton(container);

					expect(clearCompletedNotesButton).toBeNull();
				});
			});

			describe("completed notes available", () => {
				it("should not display button", () => {
					const notes = [new Note({ content: "content", isComplete: true })];
					const { container } = render(
						<NotesList
							notes={notes}
							onNoteUpdated={jest.fn()}
							onRemoveNotes={jest.fn()}
						/>
					);

					const clearCompletedNotesButton =
						getClearCompletedNotesButton(container);

					expect(clearCompletedNotesButton).toBeInTheDocument();
				});
			});
		});
	});

	describe("events", () => {
		let user: ReturnType<typeof userEvent["setup"]>;

		beforeEach(() => {
			user = userEvent.setup();
		});

		describe("note", () => {
			describe("onNoteUpdated", () => {
				describe("content text input", () => {
					it(`should call props onNoteUpdated with new content value`, async () => {
						const onNoteUpdated = jest.fn();
						const content = "content";
						const newContent = "newContent";
						const notes = [generateNote({ content })];
						const { container } = render(
							<NotesList
								notes={notes}
								onNoteUpdated={onNoteUpdated}
								onRemoveNotes={jest.fn()}
							/>
						);

						const note = getNotes(container)[0];
						const noteContentInput =
							getQueriesForElement(note).getByRole("textbox");
						await fireEvent.dblClick(noteContentInput);
						await user.type(noteContentInput, newContent);
						await user.type(noteContentInput, "{enter}");

						expect(onNoteUpdated).toHaveBeenCalledTimes(1);
						expect(onNoteUpdated).toHaveBeenCalledWith(notes[0].id, {
							content: `${content}${newContent}`,
						});
					});
				});

				describe("content status checkbox", () => {
					it(`should call props onNoteUpdated with new content value`, async () => {
						const onNoteUpdated = jest.fn();
						const content = "content";
						const notes = [generateNote({ content })];
						const { container } = render(
							<NotesList
								notes={notes}
								onNoteUpdated={onNoteUpdated}
								onRemoveNotes={jest.fn()}
							/>
						);

						const note = getNotes(container)[0];
						const noteContentInput =
							getQueriesForElement(note).getByRole("checkbox");

						await user.click(noteContentInput);

						expect(onNoteUpdated).toHaveBeenCalledTimes(1);
						expect(onNoteUpdated).toHaveBeenCalledWith(notes[0].id, {
							isComplete: true,
						});
					});
				});
			});

			describe("onRemoveNotes", () => {
				describe("content text input", () => {
					it(`should call props onNoteUpdated with new content value`, async () => {
						const onRemoveNotes = jest.fn();
						const { container } = render(
							<NotesList
								notes={[noteMock]}
								onNoteUpdated={jest.fn()}
								onRemoveNotes={onRemoveNotes}
							/>
						);

						const note = getNotes(container)[0];
						const removeNoteButton =
							getQueriesForElement(note).getByRole("button");
						await user.click(removeNoteButton);

						expect(onRemoveNotes).toHaveBeenCalledTimes(1);
						expect(onRemoveNotes).toHaveBeenCalledWith([noteMock.id]);
					});
				});
			});
		});

		describe("notes filter buttons", () => {
			describe("onClick", () => {
				it("should filter according to completed filter", async () => {
					const filter = NotesFilter.Completed;
					const notes = [
						generateNote({ isComplete: false }),
						generateNote({ isComplete: true }),
						generateNote({ isComplete: true }),
					];
					const completedNotes = notes.filter((note) => note.isComplete);
					const { container } = render(
						<NotesList
							notes={notes}
							onNoteUpdated={jest.fn()}
							onRemoveNotes={jest.fn()}
						/>
					);

					const noteFilterButton = getNoteFilterButton(container, filter);
					await user.click(noteFilterButton);

					expect(getNotes(container)).toHaveLength(completedNotes.length);
				});

				it("should filter according to active filter", async () => {
					const filter = NotesFilter.Active;
					const notes = [
						generateNote({ isComplete: false }),
						generateNote({ isComplete: false }),
						generateNote({ isComplete: true }),
					];
					const activeNotes = notes.filter((note) => !note.isComplete);
					const { container } = render(
						<NotesList
							notes={notes}
							onNoteUpdated={jest.fn()}
							onRemoveNotes={jest.fn()}
						/>
					);

					const noteFilterButton = getNoteFilterButton(container, filter);
					await user.click(noteFilterButton);

					expect(getNotes(container)).toHaveLength(activeNotes.length);
				});

				it("should filter according to all filter", async () => {
					const filter = NotesFilter.All;
					const notes = [
						generateNote({ isComplete: false }),
						generateNote({ isComplete: false }),
						generateNote({ isComplete: true }),
					];
					const { container } = render(
						<NotesList
							notes={notes}
							onNoteUpdated={jest.fn()}
							onRemoveNotes={jest.fn()}
						/>
					);

					const noteFilterButton = getNoteFilterButton(container, filter);
					await user.click(noteFilterButton);

					expect(getNotes(container)).toHaveLength(notes.length);
				});
			});
		});

		describe("clear completed notes button", () => {
			describe("onClick", () => {
				describe("completed notes available", () => {
					it("should ask to remove completed notes", async () => {
						const notes = [
							new Note({ content: "content", isComplete: true }),
							new Note({ content: "content", isComplete: true }),
							new Note({ content: "content", isComplete: false }),
						];
						const completedNoteIds = notes
							.filter((note) => note.isComplete)
							.map((note) => note.id);
						const onRemoveNotes = jest.fn();
						const { container } = render(
							<NotesList
								notes={notes}
								onNoteUpdated={jest.fn()}
								onRemoveNotes={onRemoveNotes}
							/>
						);

						const clearCompletedNotesButton =
							getClearCompletedNotesButton(container);
						await user.click(clearCompletedNotesButton);

						expect(onRemoveNotes).toHaveBeenCalledWith(completedNoteIds);
					});
				});
			});
		});
	});
});
