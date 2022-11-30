import React from "react";
import "./button.css";

interface ButtonProps extends React.PropsWithChildren {
	isSelected?: boolean;
	onClick(): void;
}

class Button extends React.Component<ButtonProps> {
	render() {
		const classNames = ["button"];

		if (this.props.isSelected) {
			classNames.push("selected");
		}
		const className = classNames.join(" ");

		return (
			<button onClick={this.props.onClick} className={className}>
				{this.props.children}
			</button>
		);
	}
}

export default Button;
