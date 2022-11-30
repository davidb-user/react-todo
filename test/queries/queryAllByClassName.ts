export function queryAllByClassName(
	element: Element,
	className: string
): Element[] {
	const elementsWithClassName = element.querySelectorAll(`.${className}`);

	if (!elementsWithClassName || elementsWithClassName.length === 0) {
		return [];
	}

	return [...elementsWithClassName];
}
