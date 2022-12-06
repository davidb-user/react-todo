import React from "react";
import "./checkbox.css";

interface CheckboxProps {
	isChecked: boolean;

	onChange(newValue: boolean): void;
}

class Checkbox extends React.Component<CheckboxProps> {
	onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.onChange(event.target.checked);
	};

	render() {
		const { isChecked } = this.props;
		return (
			<div className="checkbox-wrapper">
				<input
					type={"checkbox"}
					className="checkbox"
					checked={isChecked}
					onChange={this.onChange}
				/>
				{isChecked === true && <span className="checkmark">✔️</span>}
			</div>
		);
	}
}

export default Checkbox;
