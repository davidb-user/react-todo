import React from "react";
import { notesMock } from "../../../test/mockData";
import { render, screen } from "@testing-library/react";
import NotesList from "./notesList";

const getNotesList = (): HTMLElement => screen.getByRole("notes-list");
const getNoteRows = (): HTMLElement[] => screen.getAllByRole("note-row");

describe("NotesList", () => {
	describe("root element", () => {
		describe("instantiation", () => {
			it("should be created", () => {
				render(<NotesList notes={notesMock} onNoteUpdated={jest.fn()} />);

				expect(getNotesList()).toBeInTheDocument();
			});
		});
	});

	describe("children", () => {
		it("should contain NotesList child", () => {
			render(<NotesList notes={notesMock} onNoteUpdated={jest.fn()} />);

			expect(getNoteRows()).toHaveLength(notesMock.length);
			getNoteRows().forEach((row) => {
				expect(getNotesList()).toContainElement(row);
			});
		});
	});
});
