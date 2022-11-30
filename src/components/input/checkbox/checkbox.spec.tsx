import React from "react";
import { act, create, ReactTestRenderer } from "react-test-renderer";
import { testInputEvent } from "../../../../test/testInputEvent";
import Checkbox from "./checkbox";

describe("Checkbox", () => {
	let testRenderer: ReactTestRenderer;

	describe("root element", () => {
		describe("instantiation", () => {
			it("should be created", () => {
				const onChange = jest.fn();
				act(() => {
					testRenderer = create(
						<Checkbox isChecked={true} onChange={onChange} />
					);
				});
				const checkbox = testRenderer.root.findByType("input");

				expect(checkbox).toBeTruthy();
				expect(checkbox.props.className).toEqual("checkbox");
				expect(checkbox.props.type).toEqual("checkbox");
			});
		});
	});

	describe("props", () => {
		describe("isChecked", () => {
			describe("equals true", () => {
				it("should set as checked", () => {
					const onChange = jest.fn();
					act(() => {
						testRenderer = create(
							<Checkbox isChecked={true} onChange={onChange} />
						);
					});
					const checkbox = testRenderer.root.findByType("input");

					expect(checkbox?.props.checked).toBeTruthy();
				});
			});

			describe("equals false", () => {
				it("should set as not checked", () => {
					const onChange = jest.fn();
					act(() => {
						testRenderer = create(
							<Checkbox isChecked={false} onChange={onChange} />
						);
					});
					const checkbox = testRenderer.root.findByType("input");

					expect(checkbox?.props.checked).toBeFalsy();
				});
			});
		});
	});

	describe("events", () => {
		describe("onChange", () => {
			describe("isChecked", () => {
				describe("equals false", () => {
					it("should call props onChange with value", () => {
						const isChecked = false;
						const onChange = jest.fn();
						const inputElementId = "checkbox-input";

						testInputEvent(
							<Checkbox isChecked={isChecked} onChange={onChange} />,
							[
								{
									inputElementId,
									inputEventType: "click",
								},
							]
						);

						expect(onChange).toHaveBeenCalledTimes(1);
						expect(onChange).toHaveBeenCalledWith(!isChecked);
					});
				});

				describe("equals true", () => {
					it("should call props onChange with value", () => {
						const isChecked = true;
						const onChange = jest.fn();
						const inputElementId = "checkbox-input";

						testInputEvent(
							<Checkbox isChecked={isChecked} onChange={onChange} />,
							[
								{
									inputElementId,
									inputEventType: "click",
								},
							]
						);

						expect(onChange).toHaveBeenCalledTimes(1);
						expect(onChange).toHaveBeenCalledWith(!isChecked);
					});
				});
			});
		});
	});
});
