import React from "react";
import { noteMock } from "../../../test/mockData";
import { render, screen } from "@testing-library/react";
import NoteRow from "./noteRow";

const getNoteRow = (): HTMLElement => screen.getByRole("note-row");
const getNoteCompletionStatus = (): HTMLElement =>
	screen.getByRole("note-completion-status");
const getNoteContent = (): HTMLElement => screen.getByRole("note-content");

describe("NoteRow", () => {
	describe("root element", () => {
		describe("instantiation", () => {
			it("should be created", () => {
				render(<NoteRow note={noteMock} onNoteUpdated={jest.fn()} />);

				expect(getNoteRow()).toBeInTheDocument();
			});
		});
	});

	describe("children", () => {
		it("should contain note status", () => {
			render(<NoteRow note={noteMock} onNoteUpdated={jest.fn()} />);

			expect(getNoteCompletionStatus()).toBeInTheDocument();
			expect(getNoteRow()).toContainElement(getNoteCompletionStatus());
		});

		it("should contain note content", () => {
			render(<NoteRow note={noteMock} onNoteUpdated={jest.fn()} />);

			expect(getNoteContent()).toBeInTheDocument();
			expect(getNoteRow()).toContainElement(getNoteContent());
		});
	});
});
