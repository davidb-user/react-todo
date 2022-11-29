import { act, create, ReactTestRenderer } from "react-test-renderer";
import Text from "./text";

describe("Text", () => {
	let testRenderer: ReactTestRenderer;

	describe("root element", () => {
		describe("instantiation", () => {
			it("should be created", () => {
				act(() => {
					testRenderer = create(<Text />);
				});
				const input = testRenderer.root.findByType("input");

				expect(input).toBeTruthy();
				expect(input.props.className).toEqual("text");
				expect(input.props.type).toEqual("text");
			});
		});
	});
});
