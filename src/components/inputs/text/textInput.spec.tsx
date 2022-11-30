import React from "react";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TextInput, { roles } from "./textInput";

const getInput = (): HTMLElement => screen.queryByRole(roles.textInput);
const getContentLabel = (): HTMLElement =>
	screen.queryByRole(roles.valueLabel, {});
const getClearInputButtonWrapper = (): HTMLElement =>
	screen.queryByRole(roles.clearInputButtonWrapper);

describe("TextInput", () => {
	describe("root element", () => {
		describe("instantiation", () => {
			it("should be created", () => {
				render(<TextInput onChange={jest.fn()} />);

				expect(getInput()).toBeInTheDocument();
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
				it("should display content label", async () => {
					render(<TextInput onChange={jest.fn()} doubleClickToEdit={true} />);

					expect(getContentLabel()).toBeInTheDocument();
					expect(getInput()).toBeNull();
				});

				it("should display value at value label", async () => {
					const textValue = "textValue";
					render(
						<TextInput
							onChange={jest.fn()}
							doubleClickToEdit={true}
							value={textValue}
						/>
					);

					expect(getContentLabel().innerHTML).toEqual(textValue);
				});
			});

			describe("equals falsy value", () => {
				it("should display input", async () => {
					render(<TextInput onChange={jest.fn()} />);

					expect(getContentLabel()).toBeNull();
					expect(getInput()).toBeInTheDocument();
				});
			});
		});

		describe("showClearInputButton", () => {
			describe("equals true", () => {
				it("should display clear input button", () => {
					const textValue = "textValue";
					render(
						<TextInput
							onChange={jest.fn()}
							value={textValue}
							showClearInputButton={true}
						/>
					);

					expect(getClearInputButtonWrapper()).toBeInTheDocument();
				});

				describe("and doubleClickToEdit equals true", () => {
					it("should notdisplay clear input button", () => {
						const textValue = "textValue";
						render(
							<TextInput
								onChange={jest.fn()}
								value={textValue}
								doubleClickToEdit={true}
								showClearInputButton={true}
							/>
						);

						expect(getClearInputButtonWrapper()).toBeNull();
					});
				});
			});

			describe("equals falsy value", () => {
				it("should not display clear input button", () => {
					const textValue = "textValue";
					render(<TextInput onChange={jest.fn()} value={textValue} />);

					expect(getClearInputButtonWrapper()).toBeNull();
				});
			});
		});
	});

	describe("events", () => {
		let user: ReturnType<typeof userEvent["setup"]>;

		beforeEach(() => {
			user = userEvent.setup();
		});

		describe("input", () => {
			describe("onChange", () => {
				it("should call props onChange with value", async () => {
					const onChange = jest.fn();
					const eventValue = "eventValue";
					render(<TextInput onChange={onChange} />);

					await user.type(getInput(), eventValue);

					eventValue.split("").forEach((value, index) => {
						expect(onChange).nthCalledWith(index + 1, value);
					});
				});
			});

			describe("onBlur", () => {
				describe("doubleClickToEdit equals true", () => {
					it("should disable input", async () => {
						render(<TextInput onChange={jest.fn()} doubleClickToEdit={true} />);

						await user.dblClick(getContentLabel());
						await fireEvent.blur(getInput());

						await waitFor(() => {
							expect(getContentLabel()).toBeInTheDocument();
							expect(getInput()).toBeNull();
						});
					});
				});
			});
		});

		describe("value label", () => {
			describe("onDoubleClick", () => {
				describe("doubleClickToEdit equals true", () => {
					it("should enable input", async () => {
						render(<TextInput onChange={jest.fn()} doubleClickToEdit={true} />);

						await user.dblClick(getContentLabel());

						await waitFor(() => {
							expect(getContentLabel()).toBeNull();
							expect(getInput()).toBeInTheDocument();
						});
					});
				});
			});
		});

		describe("clear input button", () => {
			describe("onClick", () => {
				it("should call props onChange with value", async () => {
					const onChange = jest.fn();
					const textValue = "textValue";
					render(
						<TextInput
							onChange={onChange}
							value={textValue}
							showClearInputButton={true}
						/>
					);

					await user.click(
						getClearInputButtonWrapper().getElementsByTagName("button")[0]
					);

					expect(onChange).toBeCalledTimes(1);
					expect(onChange).toBeCalledWith("");
				});
			});
		});
	});
});
