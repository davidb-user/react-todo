import React from "react";
import { act, create, ReactTestRenderer } from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import NotesList from "../notesList/notesList";
import App from "./app";

const getApp = (): HTMLElement => screen.getByRole("app");
const getNotesList = (): HTMLElement => screen.getByRole("notes-list");

describe("App", () => {
	let testRenderer: ReactTestRenderer;

	describe("root element", () => {
		describe("instantiation", () => {
			it("should be created", () => {
				render(<App />);

				expect(getApp()).toBeInTheDocument();
			});
		});
	});

	describe("children", () => {
		it("should contain NotesList child", () => {
			render(<App />);

			expect(getApp()).toContainElement(getNotesList());
		});
	});
});
