import React from "react";
import { render, screen } from "@testing-library/react";
import App, { classNames } from "./app";
import { queryByClassName } from "../../../test/queries";
import { getNotesList } from "../notesList/notesList.spec";

const getApp = (container: Element) =>
	queryByClassName(container, classNames.app);

describe("App", () => {
	describe("elements", () => {
		describe("root element", () => {
			it("should be created", () => {
				const { container } = render(<App />);

				expect(getApp(container)).toBeInTheDocument();
			});
		});

		describe("notes list", () => {
			it("should be created", () => {
				const { container } = render(<App />);

				const app = getApp(container);

				expect(getNotesList(app)).toBeInTheDocument();
			});
		});
	});
});
