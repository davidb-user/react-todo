import { render, fireEvent, EventType } from "@testing-library/react";

interface TestInputEvent {
	inputEventType: EventType;
	inputElementId: string;
	eventValue?: unknown;
}

export function testInputEvent(
	element: React.ReactElement,
	events: TestInputEvent[]
) {
	const renderedElement = render(element);

	for (const {
		eventValue,
		inputElementId,
		inputEventType: inputEvent,
	} of events) {
		const input = [...renderedElement.container.children].find(
			(child) => child.id === inputElementId
		) as HTMLInputElement;

		fireEvent[inputEvent](
			input,
			eventValue ? { target: { value: eventValue } } : {}
		);
	}

	return renderedElement;
}
