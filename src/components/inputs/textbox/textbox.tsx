import React from "react";
import "./textbox.css";

interface TextProps {
	onSubmit(newValue: string): void;
	defaultValue?: string;
	doubleClickToEdit?: boolean;
	clearValueAfterSubmit?: boolean;
	placeholderText?: string;
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

		this.props.onSubmit(this.state.value);

		if (this.props.clearValueAfterSubmit) {
			this.setState({ value: "" });
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
		const classNames = ["text-input"];

		if (this.props.doubleClickToEdit) {
			classNames.push("border-on-focus");
		}

		return (
			<div
				className={classNames.join(" ")}
				onDoubleClick={this.onInputDoubleClick}
			>
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
					placeholder={this.props.placeholderText}
				/>
			</div>
		);
	}
}

export default Textbox;
