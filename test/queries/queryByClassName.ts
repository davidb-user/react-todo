export function queryByClassName<T extends Element>(
	element: T,
	className: string
): T | null {
	const elementsWithClassName = element.querySelector<T>(`.${className}`);

	if (!elementsWithClassName) {
		return null;
	}

	return elementsWithClassName;
}
