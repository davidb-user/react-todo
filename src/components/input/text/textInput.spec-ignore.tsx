import React from "react";
import { act, create, ReactTestRenderer } from "react-test-renderer";
import TextInput from "./textInput";
import { testInputEvent } from "../../../../test/testInputEvent";

// describe("TextInput", () => {
// 	let testRenderer: ReactTestRenderer;

// 	describe("root element", () => {
// 		describe("instantiation", () => {
// 			it("should be created", () => {
// 				act(() => {
// 					testRenderer = create(<TextInput onChange={jest.fn()} />);
// 				});
// 				const input = testRenderer.root.findByType("input");

// 				expect(input).toBeTruthy();
// 				expect(input.props.className).toEqual("text-input");
// 				expect(input.props.type).toEqual("text");
// 			});
// 		});
// 	});

// describe("events", () => {
// 	describe("onChange", () => {
// 		it("should call props onChange with value", () => {
// 			const onChange = jest.fn();
// 			const eventValue = "eventValue";

// 			testInputEvent(<TextInput onChange={onChange} />, [
// 				{
// 					eventValue,
// 					inputElementId: "text-input",
// 					inputEventType: "input",
// 				},
// 			]);

// 			expect(onChange).toHaveBeenCalledTimes(1);
// 			expect(onChange).toHaveBeenCalledWith(eventValue);
// 		});
// 	});

// 	describe("onDoubleClick", () => {
// 		it("should call props onchange with value", () => {
// 			const onChange = jest.fn();
// 			const eventValue = "eventValue";

// 			testInputEvent(<TextInput onChange={onChange} />, [
// 				{
// 					eventValue,
// 					inputElementId: "text-input",
// 					inputEventType: "doubleClick",
// 				},
// 			]);

// 			expect(onChange).toHaveBeenCalledTimes(1);
// 			expect(onChange).toHaveBeenCalledWith(eventValue);
// 		});
// 	});

// 	describe("onBlur", () => {
// 		it("should call props onchange with value", () => {
// 			const onChange = jest.fn();
// 			const eventValue = "eventValue";

// 			const renderedElement = testInputEvent(
// 				<TextInput onChange={onChange} doubleClickToEdit={true} />,
// 				[
// 					{
// 						eventValue,
// 						inputElementId: "text-input",
// 						inputEventType: "blur",
// 					},
// 				]
// 			);

// 			expect(renderedElement.container.getAttribute("disabled")).toEqual(
// 				false
// 			);
// 		});
// 	});
// });
// });
