import React from "react";
import { act, create, ReactTestRenderer } from "react-test-renderer";
import { noteMock } from "../../../test/mockData";
import Checkbox from "../input/checkbox/checkbox";
import NoteRow from "./noteRow";

describe("NoteRow", () => {
	let testRenderer: ReactTestRenderer;

	describe("root element", () => {
		describe("instantiation", () => {
			it("should be created", () => {
				act(() => {
					testRenderer = create(
						<NoteRow note={noteMock} onNoteUpdated={jest.fn()} />
					);
				});
				const noteRow = testRenderer.root.findByType("div");

				expect(noteRow).toBeTruthy();
				expect(noteRow.props.className).toEqual("note-row");
			});
		});
	});

	// describe("children", () => {
	// 	it("should contain note status checkbox", () => {
	// 		act(() => {
	// 			testRenderer = create(
	// 				<NoteRow note={noteMock} onNoteUpdated={jest.fn()} />
	// 			);
	// 		});
	// 		const noteRow = testRenderer.root.findByType("div");

	// 		const noteStatusCheckbox = noteRow.findByType(Checkbox);
	// 		expect(noteStatusCheckbox).toBeTruthy();
	// 	});

	// 	it("should contain note content", () => {
	// 		act(() => {
	// 			testRenderer = create(
	// 				<NoteRow note={noteMock} onNoteUpdated={jest.fn()} />
	// 			);
	// 		});
	// 		const noteRow = testRenderer.root.findByType("div");

	// 		const noteContent = noteRow.findByProps({ className: "note-content" });
	// 		const content = noteContent.children[0];
	// 		expect(content).toEqual(noteMock.content);
	// 	});
	// });
});
