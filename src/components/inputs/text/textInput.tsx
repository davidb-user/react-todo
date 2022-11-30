import React from "react";
import Button from "../button/button";
import "./textInput.css";

interface TextProps {
	onChange(newValue: string): void;
	value?: string;
	doubleClickToEdit?: boolean;
	showClearInputButton?: boolean;
}

interface TextState {
	editEnabled: boolean;
}

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
		console.log("test testes tests etes test est est ");
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
			<div className="text-input">
				<span onDoubleClick={this.onInputDoubleClick}>
					<input
						value={this.props.value || ""}
						type={"text"}
						onChange={(e) => {
							this.props.onChange(e.target.value);
						}}
						onBlur={this.onInputBlur}
						disabled={!this.state.editEnabled}
					/>
				</span>

				{showClearInputButton && <Button onClick={this.clearInput}>X</Button>}
			</div>
		);
	}
}

export default TextInput;
