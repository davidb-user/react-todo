import { act } from "react-dom/test-utils";
import { create, ReactTestRenderer } from "react-test-renderer";
import Button from "./button";

describe("Button", () => {
	let testRenderer: ReactTestRenderer;

	describe("root element", () => {
		describe("instantiation", () => {
			it("should be created", () => {
				act(() => {
					testRenderer = create(<Button isSelected={true} />);
				});
				const button = testRenderer.root.findByType("button");

				expect(button).toBeTruthy();
				expect(button.props.className.split(" ")).toContain("button");
			});
		});
	});

	describe("root element", () => {
		it("should create root element", () => {
			act(() => {
				testRenderer = create(<Button isSelected={true} />);
			});
			const button = testRenderer.root.findByType("button");

			expect(button).toBeTruthy();
		});
	});

	describe("props", () => {
		describe("isSelected", () => {
			describe("equals true", () => {
				it("should set selected class", () => {
					act(() => {
						testRenderer = create(<Button isSelected={true} />);
					});
					const button = testRenderer.root.findByType("button");

					expect(button?.props.className).toContain("selected");
				});
			});

			describe("equals false", () => {
				it("should not set selected class", () => {
					act(() => {
						testRenderer = create(<Button isSelected={false} />);
					});
					const button = testRenderer.root.findByType("button");

					expect(button?.props.className).not.toContain("selected");
				});
			});
		});
	});
});
