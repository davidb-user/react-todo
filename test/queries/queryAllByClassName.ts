export function queryAllByClassName<T extends Element>(
	element: T,
	className: string
): T[] {
	const elementsWithClassName = element.querySelectorAll<T>(`.${className}`);

	if (!elementsWithClassName || elementsWithClassName.length === 0) {
		return [];
	}

	return [...elementsWithClassName];
}
