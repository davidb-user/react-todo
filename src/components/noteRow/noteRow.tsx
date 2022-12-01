import React from "react";
import { Note, NoteId, NoteDetails } from "../../types/note";
import Button from "../inputs/button/button";
import Checkbox from "../inputs/checkbox/checkbox";
import TextInput from "../inputs/text/textInput";
import "./noteRow.css";

interface NoteRowProps {
	onNoteUpdated: (
		updatedNoteId: NoteId,
		updatedNoteDetails: Partial<NoteDetails>
	) => void;
	onRemoveNote: (noteId: NoteId) => void;
	note: Note;
}

export const classNames = {
	noteRow: "note-row",
};

class NoteRow extends React.Component<NoteRowProps> {
	onCompleteStatusChange = (newValue: boolean) => {
		const updatedNoteDetails: Partial<NoteDetails> = {
			isComplete: newValue,
		};
		this.props.onNoteUpdated(this.props.note.id, updatedNoteDetails);
	};

	onNodeContentChange = (nodeConent: Note["content"]) => {
		const updatedNoteDetails: Partial<NoteDetails> = {
			content: nodeConent,
		};
		this.props.onNoteUpdated(this.props.note.id, updatedNoteDetails);
	};

	onRemoveNote = () => {
		this.props.onRemoveNote(this.props.note.id);
	};

	render() {
		const { note } = this.props;

		return (
			<div className={classNames.noteRow}>
				<Checkbox
					isChecked={note.isComplete}
					onChange={this.onCompleteStatusChange}
				/>
				<TextInput
					value={note.content}
					doubleClickToEdit={true}
					onChange={this.onNodeContentChange}
				/>
				<Button onClick={this.onRemoveNote}>🗑</Button>
			</div>
		);
	}
}

export default NoteRow;
