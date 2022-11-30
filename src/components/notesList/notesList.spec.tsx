import React from "react";
import { notesMock } from "../../../test/mockData";
import { render } from "@testing-library/react";
import NotesList, { classNames } from "./notesList";
import { classNames as notesListClassNames } from "../noteRow/noteRow";
import { queryAllByClassName, queryByClassName } from "../../../test/queries";

export const getNotesList = (container: Element) =>
	queryByClassName(container, classNames.notesList);
const getNoteRows = (container: Element) =>
	queryAllByClassName(container, notesListClassNames.noteRow);

describe("NotesList", () => {
	describe("elements", () => {
		describe("root element", () => {
			it("should be created", () => {
				const { container } = render(
					<NotesList notes={notesMock} onNoteUpdated={jest.fn()} />
				);

				expect(getNotesList(container)).toBeInTheDocument();
			});
		});

		describe("rows", () => {
			describe("zero rows", () => {
				it("should not contain note rows", () => {
					const { container } = render(
						<NotesList notes={[]} onNoteUpdated={jest.fn()} />
					);

					const notesList = getNotesList(container);
					const rows = getNoteRows(notesList);

					expect(rows).toHaveLength(0);
				});
			});

			describe("more than zero rows", () => {
				it("should contain note rows", () => {
					const { container } = render(
						<NotesList notes={notesMock} onNoteUpdated={jest.fn()} />
					);

					const notesList = getNotesList(container);
					const rows = getNoteRows(notesList);

					expect(rows).toHaveLength(notesMock.length);
				});
			});
		});
	});
});
