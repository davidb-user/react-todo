import React from "react";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Textbox from "./textbox";

const getInput = () => screen.queryByRole("textbox");

describe("Textbox", () => {
	describe("elements", () => {
		describe("text input", () => {
			it("should be created", () => {
				render(<Textbox onSubmit={jest.fn()} />);

				expect(getInput()).toBeInTheDocument();
			});
		});
	});

	describe("props", () => {
		describe("value", () => {
			it("should be setted as input value", () => {
				const textValue = "textValue";
				render(<Textbox onSubmit={jest.fn()} defaultValue={textValue} />);

				expect(getInput()).toHaveValue(textValue);
			});
		});

		describe("doubleClickToEdit", () => {
			describe("equals true", () => {
				it("should disable text input", async () => {
					render(<Textbox onSubmit={jest.fn()} doubleClickToEdit={true} />);

					await waitFor(() => {
						expect(getInput()).toBeDisabled();
					});
					expect(getInput().hasAttribute("disabled")).toBeTruthy();
				});
			});

			describe("equals falsy value", () => {
				it("should disable text input", async () => {
					render(<Textbox onSubmit={jest.fn()} />);

					await waitFor(() => {
						expect(getInput()).toBeEnabled();
					});
					expect(getInput().hasAttribute("disabled")).toBeFalsy();
				});
			});
		});
	});

	describe("events", () => {
		let user: ReturnType<typeof userEvent["setup"]>;

		beforeEach(() => {
			user = userEvent.setup();
		});

		describe("text input", () => {
			describe("onSubmit", () => {
				describe("input is empty", () => {
					it("should call props onSubmit", async () => {
						const onSubmit = jest.fn();
						render(<Textbox onSubmit={onSubmit} />);

						await user.type(getInput(), "{enter}");

						expect(onSubmit).toHaveBeenCalledTimes(1);
						expect(onSubmit).toHaveBeenCalledWith("");
					});
				});

				describe("input is not empty", () => {
					it("should call props onSubmit with value", async () => {
						const onSubmit = jest.fn();
						const eventValue = "eventValue";
						render(<Textbox onSubmit={onSubmit} />);

						await user.type(getInput(), eventValue);
						await user.type(getInput(), "{enter}");

						expect(onSubmit).toHaveBeenCalledTimes(1);
						expect(onSubmit).toHaveBeenCalledWith(eventValue);
					});

					describe("and clearValueAfterSubmit", () => {
						describe("equals true", () => {
							it("should clear value after submit", async () => {
								const onSubmit = jest.fn();
								const eventValue = "eventValue";
								render(
									<Textbox onSubmit={onSubmit} clearValueAfterSubmit={true} />
								);

								await user.type(getInput(), eventValue);
								await user.type(getInput(), "{enter}");

								expect(getInput()).toHaveValue("");
							});
						});
						describe("equals falsy value", () => {
							it("should not clear value after submit", async () => {
								const onSubmit = jest.fn();
								const eventValue = "eventValue";
								render(<Textbox onSubmit={onSubmit} />);

								await user.type(getInput(), eventValue);
								await user.type(getInput(), "{enter}");

								expect(getInput()).toHaveValue(eventValue);
							});
						});
					});

					describe("and doubleClickToEdit equals true", () => {
						describe("after double clicking the input", () => {
							it("should call props onSubmit with value", async () => {
								const onSubmit = jest.fn();
								const eventValue = "eventValue";
								render(
									<Textbox onSubmit={onSubmit} doubleClickToEdit={true} />
								);

								await fireEvent.dblClick(getInput());
								await user.type(getInput(), eventValue);
								await user.type(getInput(), "{enter}");

								expect(onSubmit).toHaveBeenCalledTimes(1);
								expect(onSubmit).toHaveBeenCalledWith(eventValue);
							});
						});
					});
				});
			});

			describe("onBlur", () => {
				describe("and doubleClickToEdit equals true", () => {
					it("should disable text input", async () => {
						render(<Textbox onSubmit={jest.fn()} doubleClickToEdit={true} />);

						await fireEvent.dblClick(getInput());
						await fireEvent.blur(getInput());

						await waitFor(() => {
							expect(getInput()).toBeDisabled();
						});
					});
				});
			});

			describe("onDoubleClick", () => {
				describe("and doubleClickToEdit equals true", () => {
					it("should be enabled", async () => {
						render(<Textbox onSubmit={jest.fn()} doubleClickToEdit={true} />);

						await fireEvent.dblClick(getInput());

						await waitFor(() => {
							expect(getInput()).toBeEnabled();
						});
					});
				});
			});
		});
	});
});
