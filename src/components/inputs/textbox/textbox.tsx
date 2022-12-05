import React from "react";
import Button from "../button/button";
import "./textbox.css";

interface TextProps {
	onSubmit(newValue: string): void;
	defaultValue?: string;
	doubleClickToEdit?: boolean;
	showClearInputButton?: boolean;
	clearValueAfterSubmit?: boolean;
}

interface TextState {
	editEnabled: boolean;
	value: string;
}

class Textbox extends React.Component<TextProps, TextState> {
	private inputRef: HTMLInputElement;

	constructor(props: TextProps) {
		super(props);

		const editEnabled = this.props.doubleClickToEdit ? false : true;

		this.state = {
			editEnabled,
			value: this.props.defaultValue || "",
		};
	}

	clearInput = () => {
		this.setState({ value: "" });
	};

	onInputDoubleClick = () => {
		if (this.props.doubleClickToEdit) {
			this.setState({
				editEnabled: true,
			});
			setTimeout(() => {
				this.inputRef.focus();
				this.inputRef.select();
			});
		}
	};

	onSubmit = () => {
		if (this.props.doubleClickToEdit) {
			this.setState({
				editEnabled: false,
			});
		}
		if (this.state.value) {
			this.props.onSubmit(this.state.value);

			if (this.props.clearValueAfterSubmit) {
				this.setState({ value: "" });
			}
		}
	};

	onKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			this.onSubmit();
		}
	};

	onChange = (newValue: string) => {
		this.setState({
			value: newValue,
		});
	};

	render() {
		const showClearInputButton =
			this.props.showClearInputButton && this.state.editEnabled;

		return (
			<div className="text-input">
				<span onDoubleClick={this.onInputDoubleClick}>
					<input
						value={this.state.value}
						type={"text"}
						onChange={(e) => {
							this.onChange(e.target.value);
						}}
						onBlur={this.onSubmit}
						onKeyDown={this.onKeyDown}
						disabled={!this.state.editEnabled}
						ref={(ref) => {
							this.inputRef = ref;
						}}
						autoFocus
					/>
				</span>
				{showClearInputButton && <Button onClick={this.clearInput}>x</Button>}
			</div>
		);
	}
}

export default Textbox;
