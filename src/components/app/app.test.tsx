import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { create, ReactTestRenderer } from "react-test-renderer";
import NotesList from "../notesList/notesList";
import App from "./app";

describe("App", () => {
	let testRenderer: ReactTestRenderer;

	describe("root element", () => {
		describe("instantiation", () => {
			it("should be created", () => {
				act(() => {
					testRenderer = create(<App />);
				});
				const appDiv = testRenderer.root.findByType("div");

				expect(appDiv).toBeTruthy();
				expect(appDiv.props.className).toEqual("app");
			});
		});
	});

	describe("children", () => {
		it("should contain NotesList child", () => {
			act(() => {
				testRenderer = create(<App />);
			});
			const appDiv = testRenderer.root.findByType("div");

			const notesList = appDiv.findByType(NotesList);
			expect(notesList).toBeTruthy();
		});
	});
});
