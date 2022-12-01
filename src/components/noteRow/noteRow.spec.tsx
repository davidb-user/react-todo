import React from "react";
import { generateNote, noteMock } from "../../../test/mockData";
import { fireEvent, render, screen } from "@testing-library/react";
import NoteRow, { classNames } from "./noteRow";
import { queryByClassName } from "../../../test/queries";
import userEvent from "@testing-library/user-event";

const getNoteRow = (container: HTMLElement) =>
	queryByClassName(container, classNames.noteRow);
const getNoteCompletionStatusInput = () => screen.getByRole("checkbox");
export const getNoteContentInput = () => screen.getByRole("textbox");
export const getRemoveNoteButton = () => screen.getByRole("button");

describe("NoteRow", () => {
	describe("elements", () => {
		describe("root element", () => {
			it("should be created", () => {
				const { container } = render(
					<NoteRow
						note={noteMock}
						onNoteUpdated={jest.fn()}
						onRemoveNote={jest.fn()}
					/>
				);

				expect(getNoteRow(container)).toBeInTheDocument();
			});
		});

		describe("status checkbox", () => {
			it("should be created", () => {
				render(
					<NoteRow
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
					<NoteRow
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
					<NoteRow
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
								<NoteRow
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
			describe("onChange", () => {
				it(`should call props onChange with new content value`, async () => {
					const onNoteUpdated = jest.fn();
					const content = "content";
					const newContent = "newContent";
					const note = generateNote({ content });
					render(
						<NoteRow
							note={note}
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

		describe("remove note button", () => {
			describe("onClick", () => {
				it(`should call props onRemoveNote with new content value`, async () => {
					const onRemoveNote = jest.fn();
					render(
						<NoteRow
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
