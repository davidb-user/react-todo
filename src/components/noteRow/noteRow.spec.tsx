import React from "react";
import { noteMock } from "../../../test/mockData";
import { render, screen } from "@testing-library/react";
import NoteRow, { classNames } from "./noteRow";
import { queryByClassName } from "../../../test/queries";

const getNoteRow = (container: HTMLElement) =>
	queryByClassName(container, classNames.noteRow);
const getNoteCompletionStatus = () => screen.getByRole("checkbox");
const getNoteContent = () => screen.getByRole("textbox");

describe("NoteRow", () => {
	describe("elements", () => {
		describe("root element", () => {
			it("should be created", () => {
				const { container } = render(
					<NoteRow note={noteMock} onNoteUpdated={jest.fn()} />
				);

				expect(getNoteRow(container)).toBeInTheDocument();
			});
		});
		describe("status checkbox", () => {
			it("should be created", () => {
				render(<NoteRow note={noteMock} onNoteUpdated={jest.fn()} />);

				expect(getNoteCompletionStatus()).toBeInTheDocument();
			});
		});
		describe("text input", () => {
			it("should be created", () => {
				render(<NoteRow note={noteMock} onNoteUpdated={jest.fn()} />);

				expect(getNoteContent()).toBeInTheDocument();
			});
		});
	});
});
