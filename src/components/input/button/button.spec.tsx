import React from "react";
import { act, create, ReactTestRenderer } from "react-test-renderer";
import { testInputEvent } from "../../../../test/testInputEvent";
import Button from "./button";

describe("Button", () => {
	let testRenderer: ReactTestRenderer;

	describe("root element", () => {
		describe("instantiation", () => {
			it("should be created", () => {
				act(() => {
					testRenderer = create(
						<Button onClick={jest.fn()} isSelected={true} />
					);
				});
				const button = testRenderer.root.findByType("button");

				expect(button).toBeTruthy();
				expect(button.props.className.split(" ")).toContain("button");
			});
		});
	});

	describe("props", () => {
		describe("isSelected", () => {
			describe("equals true", () => {
				it("should set selected class", () => {
					act(() => {
						testRenderer = create(
							<Button onClick={jest.fn()} isSelected={true} />
						);
					});
					const button = testRenderer.root.findByType("button");

					expect(button?.props.className).toContain("selected");
				});
			});

			describe("equals false", () => {
				it("should not set selected class", () => {
					act(() => {
						testRenderer = create(
							<Button onClick={jest.fn()} isSelected={false} />
						);
					});
					const button = testRenderer.root.findByType("button");

					expect(button?.props.className).not.toContain("selected");
				});
			});
		});
	});

	describe("events", () => {
		describe("onClick", () => {
			it("should call props onClick with value", () => {
				const onChange = jest.fn();
				const inputElementId = "button-input";

				testInputEvent(<Button onClick={onChange} isSelected={false} />, [
					{
						inputElementId,
						inputEventType: "click",
					},
				]);

				expect(onChange).toHaveBeenCalledTimes(1);
			});
		});
	});
});
