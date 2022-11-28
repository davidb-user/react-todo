import React from "react";
import "./button.css";

interface ButtonProps {
	isSelected: boolean;
}

class Button extends React.Component<ButtonProps> {
	render() {
		const classNames = ["button"];
		if (this.props.isSelected) {
			classNames.push("selected");
		}
		const className = classNames.join(" ");
		return <button className={className}></button>;
	}
}

export default Button;
