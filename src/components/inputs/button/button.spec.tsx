import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Button from "./button";

const getButton = () => screen.getByRole("button");

describe("Button", () => {
	describe("elements", () => {
		describe("root element", () => {
			it("should be created", () => {
				render(<Button onClick={jest.fn()} isSelected={true} />);

				expect(getButton()).toBeInTheDocument();
			});
		});
	});

	describe("props", () => {
		describe("isSelected", () => {
			describe("equals true", () => {
				it("should set selected class", () => {
					render(<Button onClick={jest.fn()} isSelected={true} />);

					expect(getButton()).toHaveClass("selected");
				});
			});

			describe("equals false", () => {
				it("should not set selected class", () => {
					render(<Button onClick={jest.fn()} isSelected={false} />);

					expect(getButton()).not.toHaveClass("selected");
				});
			});
		});
	});

	describe("events", () => {
		describe("onClick", () => {
			it("should call props onClick with value", async () => {
				const onClick = jest.fn();
				render(<Button onClick={onClick} isSelected={false} />);

				await userEvent.click(getButton());

				expect(onClick).toHaveBeenCalledTimes(1);
			});
		});
	});
});
