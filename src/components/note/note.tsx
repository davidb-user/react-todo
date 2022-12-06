import React from "react";
import { Note as NoteModel, NoteId, NoteDetails } from "../../models/note";
import Button from "../inputs/button/button";
import Checkbox from "../inputs/checkbox/checkbox";
import Textbox from "../inputs/textbox/textbox";
import "./note.css";

interface NoteProps {
	onNoteUpdated: (
		updatedNoteId: NoteId,
		updatedNoteDetails: Partial<NoteDetails>
	) => void;
	onRemoveNote: (noteId: NoteId) => void;
	note: NoteModel;
}

export const classNames = {
	note: "note",
};

class Note extends React.Component<NoteProps> {
	onCompleteStatusChange = (newValue: boolean) => {
		const updatedNoteDetails: Partial<NoteDetails> = {
			isComplete: newValue,
		};
		this.props.onNoteUpdated(this.props.note.id, updatedNoteDetails);
	};

	onNoteContentChange = (noteContent: NoteModel["content"]) => {
		const updatedNoteDetails: Partial<NoteDetails> = {
			content: noteContent,
		};
		this.props.onNoteUpdated(this.props.note.id, updatedNoteDetails);
	};

	onRemoveNote = () => {
		this.props.onRemoveNote(this.props.note.id);
	};

	render() {
		const { note } = this.props;

		return (
			<div className={classNames.note}>
				<Checkbox
					isChecked={note.isComplete}
					onChange={this.onCompleteStatusChange}
				/>
				<Textbox
					defaultValue={note.content}
					doubleClickToEdit={true}
					onSubmit={this.onNoteContentChange}
				/>
				<Button onClick={this.onRemoveNote}>🗑</Button>
			</div>
		);
	}
}

export default Note;
