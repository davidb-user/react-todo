export function queryBySelector<T extends Element>(
	element: T,
	selector: string
): T | null {
	const elementBySelector = element.querySelector<T>(selector);

	if (!elementBySelector) {
		return null;
	}

	return elementBySelector;
}
