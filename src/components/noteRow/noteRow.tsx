import React from "react";
import { Note } from "../../types/note";
import Checkbox from "../inputs/checkbox/checkbox";
import TextInput from "../inputs/text/textInput";
import "./noteRow.css";

interface NoteRowProps {
	onNoteUpdated: (note: Note) => void;
	note: Note;
}

export const classNames = {
	noteRow: "note-row",
};

class NoteRow extends React.Component<NoteRowProps> {
	onCompleteStatusChange = (newValue: boolean) => {
		const updatedNote: Note = {
			...this.props.note,
			isComplete: newValue,
		};
		this.props.onNoteUpdated(updatedNote);
	};

	onNodeContentChange = (nodeConent: Note["content"]) => {
		const updatedNote: Note = {
			...this.props.note,
			content: nodeConent,
		};
		this.props.onNoteUpdated(updatedNote);
	};

	render() {
		const { note } = this.props;

		return (
			<div className={classNames.noteRow}>
				<Checkbox
					isChecked={note.isComplete}
					onChange={this.onCompleteStatusChange}
				/>
				<TextInput value={note.content} onChange={this.onNodeContentChange} />
			</div>
		);
	}
}

export default NoteRow;
