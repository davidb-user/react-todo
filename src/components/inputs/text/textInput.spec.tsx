import React from "react";
import userEvent from "@testing-library/user-event";
import {
	fireEvent,
	getQueriesForElement,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import TextInput from "./textInput";

const getInput = () => screen.queryByRole("textbox");
const getClearInputButton = () => screen.queryByRole("button");

describe("TextInput", () => {
	describe("elements", () => {
		describe("text input", () => {
			it("should be created", () => {
				render(<TextInput onChange={jest.fn()} />);

				expect(getInput()).toBeInTheDocument();
			});
		});

		describe("clear input button", () => {
			it("should be created", () => {
				render(<TextInput onChange={jest.fn()} showClearInputButton={true} />);

				expect(getClearInputButton()).toBeInTheDocument();
			});
		});
	});

	describe("props", () => {
		describe("value", () => {
			it("should be setted as input value", () => {
				const textValue = "textValue";
				render(<TextInput onChange={jest.fn()} value={textValue} />);

				expect(getInput()).toHaveValue(textValue);
			});
		});

		describe("doubleClickToEdit", () => {
			describe("equals true", () => {
				it("should disable text input", async () => {
					render(<TextInput onChange={jest.fn()} doubleClickToEdit={true} />);

					await waitFor(() => {
						expect(getInput()).toBeDisabled();
					});
					expect(getInput().hasAttribute("disabled")).toBeTruthy();
				});
			});

			describe("equals falsy value", () => {
				it("should disable text input", async () => {
					render(<TextInput onChange={jest.fn()} />);

					await waitFor(() => {
						expect(getInput()).toBeEnabled();
					});
					expect(getInput().hasAttribute("disabled")).toBeFalsy();
				});
			});
		});

		describe("showClearInputButton", () => {
			describe("equals true", () => {
				it("be displayed", () => {
					const textValue = "textValue";
					render(
						<TextInput
							onChange={jest.fn()}
							value={textValue}
							showClearInputButton={true}
						/>
					);

					expect(getClearInputButton()).toBeInTheDocument();
				});

				describe("and doubleClickToEdit equals true", () => {
					it("not be displayed", () => {
						const textValue = "textValue";
						render(
							<TextInput
								onChange={jest.fn()}
								value={textValue}
								doubleClickToEdit={true}
								showClearInputButton={true}
							/>
						);

						expect(getClearInputButton()).toBeNull();
					});
				});
			});

			describe("equals falsy value", () => {
				it("should not be displayed", () => {
					const textValue = "textValue";
					render(<TextInput onChange={jest.fn()} value={textValue} />);

					expect(getClearInputButton()).toBeNull();
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
			describe("onChange", () => {
				it("should call props onChange with value", async () => {
					const onChange = jest.fn();
					const eventValue = "eventValue";
					render(<TextInput onChange={onChange} />);

					await user.type(getInput(), eventValue);

					const eventValueChars = eventValue.split("");
					expect(onChange).toHaveBeenCalledTimes(eventValueChars.length);
					eventValueChars.forEach((value, index) => {
						expect(onChange).nthCalledWith(index + 1, value);
					});
				});

				describe("and doubleClickToEdit equals true", () => {
					describe("after double clicking the input", () => {
						it("should call props onChange with value", async () => {
							const onChange = jest.fn();
							const eventValue = "eventValue";
							render(
								<TextInput onChange={onChange} doubleClickToEdit={true} />
							);

							await fireEvent.dblClick(getInput());
							await user.type(getInput(), eventValue);

							const eventValueChars = eventValue.split("");
							expect(onChange).toHaveBeenCalledTimes(eventValueChars.length);
							eventValueChars.forEach((value, index) => {
								expect(onChange).nthCalledWith(index + 1, value);
							});
						});
					});
				});
			});

			describe("onBlur", () => {
				describe("and doubleClickToEdit equals true", () => {
					it("should disable text input", async () => {
						render(<TextInput onChange={jest.fn()} doubleClickToEdit={true} />);

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
						render(<TextInput onChange={jest.fn()} doubleClickToEdit={true} />);

						await fireEvent.dblClick(getInput());

						await waitFor(() => {
							expect(getInput()).toBeEnabled();
						});
					});
				});
			});
		});

		describe("clear input button", () => {
			describe("onClick", () => {
				it("should call props onChange with empty string", async () => {
					const onChange = jest.fn();
					const textValue = "textValue";
					render(
						<TextInput
							onChange={onChange}
							value={textValue}
							showClearInputButton={true}
						/>
					);

					await user.click(getClearInputButton());

					expect(onChange).toBeCalledTimes(1);
					expect(onChange).toBeCalledWith("");
				});
			});
		});
	});
});
