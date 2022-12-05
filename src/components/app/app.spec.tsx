import React from "react";
import {
	fireEvent,
	getQueriesForElement,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import App, { classNames } from "./app";
import { queryByClassName, queryBySelector } from "../../../test/queries";
import { getNotes, getNotesList } from "../notesList/notesList.spec";
import userEvent from "@testing-library/user-event";

const getApp = (container: HTMLElement) =>
	queryByClassName(container, classNames.app);
const getToggleCompleteAllNotes = (container: HTMLElement) =>
	getQueriesForElement(
		queryByClassName(container, classNames.toggleCompleteAllNotes)
	).findByRole("checkbox");
const getCreateNoteContentInput = (container: HTMLElement) =>
	getQueriesForElement(
		queryByClassName(container, classNames.createNoteContentInput)
	).findByRole("textbox", {});

async function createNote(
	user: ReturnType<typeof userEvent["setup"]>,
	app: HTMLElement,
	content: string,
	isCompleted?: boolean
) {
	await user.type(await getCreateNoteContentInput(app), content);
	await user.type(await getCreateNoteContentInput(app), "{enter}");

	if (isCompleted) {
		const allCheckboxes = await getQueriesForElement(
			getNotesList(app)
		).findAllByRole("checkbox");

		// the created note should always be last at the list
		await user.click(allCheckboxes[allCheckboxes.length - 1]);
	}
}

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

		describe("toggle complete all notes", () => {
			let user: ReturnType<typeof userEvent["setup"]>;

			beforeEach(() => {
				user = userEvent.setup();
			});

			it("should be created", async () => {
				const { container } = render(<App />);

				const app = getApp(container);

				expect(await getToggleCompleteAllNotes(app)).toBeInTheDocument();
			});

			describe("no notes", () => {
				it(`should not be checked`, async () => {
					const { container } = render(<App />);

					const app = getApp(container);

					expect(await getToggleCompleteAllNotes(app)).not.toBeChecked();
				});
			});

			describe("all notes not completed", () => {
				it(`should not be checked`, async () => {
					const { container } = render(<App />);
					const app = getApp(container);
					const contents = [...Array(10).keys()].map(
						(index) => `content${index}`
					);

					for (const content of contents) {
						await createNote(user, app, content);
					}

					expect(await getToggleCompleteAllNotes(app)).not.toBeChecked();
				});
			});

			describe("notes complete statuses varies", () => {
				it(`should not be checked`, async () => {
					const { container } = render(<App />);
					const app = getApp(container);
					const contents = [...Array(10).keys()].map(
						(index) => `content${index}`
					);

					let isComplete = false;
					for (const content of contents) {
						await createNote(user, app, content, (isComplete = !isComplete));
					}

					expect(await getToggleCompleteAllNotes(app)).not.toBeChecked();
				});
			});

			describe("all notes completed", () => {
				it(`should be checked`, async () => {
					const { container } = render(<App />);
					const app = getApp(container);
					const contents = [...Array(10).keys()].map(
						(index) => `content${index}`
					);

					for (const content of contents) {
						await createNote(user, app, content, true);
					}

					expect(await getToggleCompleteAllNotes(app)).toBeChecked();
				});
			});
		});

		describe("create note content input", () => {
			it("should be created", async () => {
				const { container } = render(<App />);

				const app = getApp(container);

				expect(await getCreateNoteContentInput(app)).toBeInTheDocument();
			});
		});
	});

	describe("events", () => {
		let user: ReturnType<typeof userEvent["setup"]>;

		beforeEach(() => {
			user = userEvent.setup();
		});

		describe("toggle complete all notes", () => {
			describe("all notes completed", () => {
				it(`should call props onChange with false value`, async () => {
					const { container } = render(<App />);
					const app = getApp(container);
					const contents = [...Array(10).keys()].map(
						(index) => `content${index}`
					);

					for (const content of contents) {
						await createNote(user, app, content, true);
					}
					await user.click(await getToggleCompleteAllNotes(app));
					const rows = getNotes(app);

					for (const row of rows) {
						let checkbox: HTMLInputElement;
						checkbox = (await getQueriesForElement(row).getByRole(
							"checkbox"
						)) as HTMLInputElement;
						expect(checkbox).not.toBeChecked();
					}
				});
			});

			describe("all notes not completed", () => {
				it(`should call props onChange with true value`, async () => {
					const { container } = render(<App />);
					const app = getApp(container);
					const contents = [...Array(10).keys()].map(
						(index) => `content${index}`
					);

					for (const content of contents) {
						await createNote(user, app, content);
					}
					await user.click(await getToggleCompleteAllNotes(app));
					const rows = getNotes(app);

					for (const row of rows) {
						let checkbox: HTMLInputElement;
						checkbox = (await getQueriesForElement(row).getByRole(
							"checkbox"
						)) as HTMLInputElement;
						expect(checkbox).toBeChecked();
					}
				});
			});

			describe("notes complete statuses varies", () => {
				it(`should call props onChange with true value`, async () => {
					const { container } = render(<App />);
					const app = getApp(container);
					const contents = [...Array(10).keys()].map(
						(index) => `content${index}`
					);

					let isComplete = false;
					for (const content of contents) {
						await createNote(user, app, content, (isComplete = !isComplete));
					}
					await user.click(await getToggleCompleteAllNotes(app));
					const rows = getNotes(app);

					for (const row of rows) {
						let checkbox: HTMLInputElement;
						checkbox = (await getQueriesForElement(row).getByRole(
							"checkbox"
						)) as HTMLInputElement;
						expect(checkbox).toBeChecked();
					}
				});
			});
		});

		describe("create note content input", () => {
			describe("onSubmit", () => {
				describe("no notes available", () => {
					it(`should add new note`, async () => {
						const content = "content";
						const { container } = render(<App />);
						const app = getApp(container);

						await createNote(user, app, content);

						const rows = getNotes(app);
						expect(rows).toHaveLength(1);
						expect(queryBySelector(rows[0], "input[type='text']")).toHaveValue(
							content
						);
					});

					it(`should add many notes and preserve creation order`, async () => {
						const contents = [...Array(10).keys()].map(
							(index) => `content${index}`
						);

						const { container } = render(<App />);
						const app = getApp(container);

						for (const content of contents) {
							await createNote(user, app, content);
						}

						const rows = getNotes(app);
						expect(rows).toHaveLength(contents.length);
						rows.forEach((row, index) => {
							expect(queryBySelector(row, "input[type='text']")).toHaveValue(
								contents[index]
							);
						});
					});

					it(`should claer input after adding new note`, async () => {
						const content = "content";
						const { container } = render(<App />);
						const app = getApp(container);

						await createNote(user, app, content);

						expect(await getCreateNoteContentInput(app)).toHaveValue("");
					});
				});
			});
		});
	});
});
