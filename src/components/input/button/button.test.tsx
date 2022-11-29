import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import Button from "./button";

describe("Button", () => {
	let container: HTMLDivElement;

	beforeEach(() => {
		container = document.createElement("div");
		document.body.appendChild(container);
	});

	afterEach(() => {
		document.body.removeChild(container);
	});

	describe("isSelected", () => {
		describe("equals true", () => {
			it("should set selected class", () => {
				act(() => {
					createRoot(container).render(<Button isSelected={true} />);
				});
				const button = container.querySelector("button");

				expect(button).toBeDefined();
				expect((button as Element).classList).toContain("selected");
			});
		});
		describe("equals false", () => {
			it("should not set selected class", () => {
				act(() => {
					createRoot(container).render(<Button isSelected={false} />);
				});
				const button = container.querySelector("button");

				expect(button).toBeDefined();
				expect((button as Element).classList).not.toContain("selected");
			});
		});
	});
});
