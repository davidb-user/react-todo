import React from "react";
import Button from "../button/button";
import "./text.css";

interface TextProps {
	onChange(newValue: string): void;
	value?: string;
	doubleClickToEdit?: boolean;
	showClearInputButton?: boolean;
}

interface TextState {
	editEnabled: boolean;
}

export const roles = {
	clearInputButtonWrapper: "clear-input-button-wrapper",
	valueLabel: "value-label",
	textInputWrapper: "text-input-wrapper",
	textInput: "text-input",
};

class TextInput extends React.Component<TextProps, TextState> {
	constructor(props: TextProps) {
		super(props);

		const editEnabled = this.props.doubleClickToEdit ? false : true;

		this.state = {
			editEnabled,
		};
	}

	clearInput = () => {
		this.props.onChange("");
	};

	onInputDoubleClick = () => {
		if (this.props.doubleClickToEdit) {
			this.setState({
				editEnabled: true,
			});
		}
	};

	onInputBlur = () => {
		if (this.props.doubleClickToEdit) {
			this.setState({
				editEnabled: false,
			});
		}
	};

	render() {
		const showClearInputButton =
			this.props.showClearInputButton && this.state.editEnabled;

		return (
			<div role={roles.textInputWrapper} className="text-input">
				{!this.state.editEnabled ? (
					<div role={roles.valueLabel} onDoubleClick={this.onInputDoubleClick}>
						{this.props.value}
					</div>
				) : (
					<input
						role={roles.textInput}
						value={this.props.value || ""}
						type={"text"}
						onChange={(e) => {
							this.props.onChange(e.target.value);
						}}
						onBlur={this.onInputBlur}
					/>
				)}
				{showClearInputButton && (
					<div role={roles.clearInputButtonWrapper}>
						<Button onClick={this.clearInput}>X</Button>
					</div>
				)}
			</div>
		);
	}
}

export default TextInput;
