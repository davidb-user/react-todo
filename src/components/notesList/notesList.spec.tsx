import React from "react";
import { act, create, ReactTestRenderer } from "react-test-renderer";
import { notesMock } from "../../../test/mockData";
import NoteRow from "../noteRow/noteRow";
import NotesList from "./notesList";

describe("NotesList", () => {
	let testRenderer: ReactTestRenderer;

	describe("root element", () => {
		describe("instantiation", () => {
			it("should be created", () => {
				act(() => {
					testRenderer = create(
						<NotesList notes={notesMock} onNoteUpdated={jest.fn()} />
					);
				});
				const notesList = testRenderer.root.findByType("div");

				expect(notesList).toBeTruthy();
				expect(notesList.props.className).toEqual("notes-list");
			});
		});
	});

	describe("children", () => {
		it("should contain NotesList child", () => {
			act(() => {
				testRenderer = create(
					<NotesList notes={notesMock} onNoteUpdated={jest.fn()} />
				);
			});
			const notesList = testRenderer.root.findByType("div");

			const nodeRows = notesList.findAllByType(NoteRow);
			expect(nodeRows).toBeTruthy();
			expect(nodeRows).toHaveLength(notesMock.length);
		});
	});
});
