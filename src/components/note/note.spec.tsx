import React from "react";
import { generateNote, noteMock } from "../../../test/mockData";
import { fireEvent, render, screen } from "@testing-library/react";
import Note, { classNames } from "./note";
import { queryByClassName } from "../../../test/queries";
import userEvent from "@testing-library/user-event";

const getNote = (container: HTMLElement) =>
	queryByClassName(container, classNames.note);
const getNoteCompletionStatusInput = () => screen.getByRole("checkbox");
const getNoteContentInput = () => screen.getByRole("textbox");
const getRemoveNoteButton = () => screen.getByRole("button");

describe("Note", () => {
	describe("elements", () => {
		describe("root element", () => {
			it("should be created", () => {
				const { container } = render(
					<Note
						note={noteMock}
						onNoteUpdated={jest.fn()}
						onRemoveNote={jest.fn()}
					/>
				);

				expect(getNote(container)).toBeInTheDocument();
			});
		});

		describe("status checkbox", () => {
			it("should be created", () => {
				render(
					<Note
						note={noteMock}
						onNoteUpdated={jest.fn()}
						onRemoveNote={jest.fn()}
					/>
				);

				expect(getNoteCompletionStatusInput()).toBeInTheDocument();
			});
		});

		describe("content text input", () => {
			it("should be created", () => {
				render(
					<Note
						note={noteMock}
						onNoteUpdated={jest.fn()}
						onRemoveNote={jest.fn()}
					/>
				);

				expect(getNoteContentInput()).toBeInTheDocument();
			});
		});

		describe("remove note button", () => {
			it("should be created", () => {
				render(
					<Note
						note={noteMock}
						onNoteUpdated={jest.fn()}
						onRemoveNote={jest.fn()}
					/>
				);

				expect(getRemoveNoteButton()).toBeInTheDocument();
			});
		});
	});

	describe("events", () => {
		let user: ReturnType<typeof userEvent["setup"]>;

		beforeEach(() => {
			user = userEvent.setup();
		});

		describe("status checkbox", () => {
			describe("onChange", () => {
				describe.each([true, false])(
					"note is complete status equals %s",
					(isComplete) => {
						it(`should call props onChange with ${!isComplete} value`, async () => {
							const onNoteUpdated = jest.fn();
							const note = generateNote({ isComplete });
							render(
								<Note
									note={note}
									onNoteUpdated={onNoteUpdated}
									onRemoveNote={jest.fn()}
								/>
							);

							await user.click(getNoteCompletionStatusInput());

							expect(onNoteUpdated).toHaveBeenCalledTimes(1);
							expect(onNoteUpdated).toHaveBeenCalledWith(note.id, {
								isComplete: !isComplete,
							});
						});
					}
				);
			});
		});

		describe("content text input", () => {
			describe("onSubmit", () => {
				it(`should call props onChange with new content value`, async () => {
					const onNoteUpdated = jest.fn();
					const content = "content";
					const newContent = "newContent";
					const note = generateNote({ content });
					render(
						<Note
							note={note}
							onNoteUpdated={onNoteUpdated}
							onRemoveNote={jest.fn()}
						/>
					);

					await fireEvent.dblClick(getNoteContentInput());
					await user.type(getNoteContentInput(), newContent);
					await user.type(getNoteContentInput(), "{enter}");

					expect(onNoteUpdated).toHaveBeenCalledTimes(1);
					expect(onNoteUpdated).toHaveBeenCalledWith(note.id, {
						content: `${content}${newContent}`,
					});
				});
			});
		});

		describe("remove note button", () => {
			describe("onClick", () => {
				it(`should call props onRemoveNote with new content value`, async () => {
					const onRemoveNote = jest.fn();
					render(
						<Note
							note={noteMock}
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
