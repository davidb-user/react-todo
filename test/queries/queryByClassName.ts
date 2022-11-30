export function queryByClassName(
	element: Element,
	className: string
): Element | null {
	const elementsWithClassName = element.querySelector(`.${className}`);

	if (!elementsWithClassName) {
		return null;
	}

	return elementsWithClassName;
}
