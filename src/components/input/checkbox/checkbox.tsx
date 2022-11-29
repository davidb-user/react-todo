import React from "react";
import "./checkbox.css";

interface CheckboxProps {
	isChecked: boolean;
}

class Checkbox extends React.Component<CheckboxProps> {
	onChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

	render() {
		const { isChecked } = this.props;
		return (
			<input
				type={"checkbox"}
				className="checkbox"
				checked={isChecked}
				onChange={this.onChange}
			/>
		);
	}
}

export default Checkbox;
