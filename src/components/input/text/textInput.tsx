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
			this.props.showClearInputButton && !this.state.editEnabled;

		return (
			<div className="text-input">
				<input
					id="text-input"
					value={this.props.value || ""}
					type={"text"}
					onChange={(e) => {
						this.props.onChange(e.target.value);
					}}
					onDoubleClick={this.onInputDoubleClick}
					onBlur={this.onInputBlur}
					disabled={this.state.editEnabled}
				/>
				{showClearInputButton && <Button onClick={this.clearInput}>X</Button>}
			</div>
		);
	}
}

export default TextInput;
