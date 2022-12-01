import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Checkbox from "./checkbox";

const getInput = () => screen.getByRole("checkbox");

describe("Checkbox", () => {
	describe("elements", () => {
		describe("root element", () => {
			it("should be created", () => {
				render(<Checkbox isChecked={true} onChange={jest.fn()} />);

				expect(getInput()).toBeInTheDocument();
			});
		});
	});

	describe("props", () => {
		describe("isChecked", () => {
			describe("equals true", () => {
				it("should set as checked", () => {
					render(<Checkbox isChecked={true} onChange={jest.fn()} />);

					expect(getInput()).toBeChecked();
				});
			});

			describe("equals false", () => {
				it("should set as not checked", () => {
					render(<Checkbox isChecked={false} onChange={jest.fn()} />);

					expect(getInput()).not.toBeChecked();
				});
			});
		});
	});

	describe("events", () => {
		let user: ReturnType<typeof userEvent["setup"]>;

		beforeEach(() => {
			user = userEvent.setup();
		});

		describe("onChange", () => {
			describe("isChecked", () => {
				describe("equals false", () => {
					it("should call props onChange with true value", async () => {
						const onChange = jest.fn();
						const isChecked = false;
						render(<Checkbox isChecked={isChecked} onChange={onChange} />);

						await user.click(getInput());

						expect(onChange).toHaveBeenCalledTimes(1);
						expect(onChange).toHaveBeenCalledWith(!isChecked);
						expect(getInput()).not.toBeChecked();
					});
				});

				describe("equals true", () => {
					it("should call props onChange with false value", async () => {
						const onChange = jest.fn();
						const isChecked = true;
						render(<Checkbox isChecked={isChecked} onChange={onChange} />);

						await user.click(getInput());

						expect(onChange).toHaveBeenCalledTimes(1);
						expect(onChange).toHaveBeenCalledWith(!isChecked);
						expect(getInput()).toBeChecked();
					});
				});
			});
		});
	});
});
