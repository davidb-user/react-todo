import { act } from "react-dom/test-utils";
import { create, ReactTestRenderer } from "react-test-renderer";
import Checkbox from "./checkbox";

describe("Checkbox", () => {
	let testRenderer: ReactTestRenderer;

	describe("root element", () => {
		describe("instantiation", () => {
			it("should be created", () => {
				act(() => {
					testRenderer = create(<Checkbox isChecked={true} />);
				});
				const checkbox = testRenderer.root.findByType("input");

				expect(checkbox).toBeTruthy();
				expect(checkbox.props.className).toEqual("checkbox");
				expect(checkbox.props.type).toEqual("checkbox");
			});
		});
	});

	describe("root element", () => {
		it("should create root element", () => {
			act(() => {
				testRenderer = create(<Checkbox isChecked={true} />);
			});
			const checkbox = testRenderer.root.findByType("input");

			expect(checkbox).toBeTruthy();
		});
	});

	describe("props", () => {
		describe("isChecked", () => {
			describe("equals true", () => {
				it("should set as checked", () => {
					act(() => {
						testRenderer = create(<Checkbox isChecked={true} />);
					});
					const checkbox = testRenderer.root.findByType("input");

					expect(checkbox?.props.checked).toEqual(true);
				});
			});

			describe("equals false", () => {
				it("should set as not checked", () => {
					act(() => {
						testRenderer = create(<Checkbox isChecked={false} />);
					});
					const checkbox = testRenderer.root.findByType("input");

					expect(checkbox?.props.checked).toEqual(false);
				});
			});
		});
	});
});
