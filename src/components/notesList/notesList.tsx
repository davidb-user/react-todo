import React from "react";
import { Note, NoteDetails, NoteId } from "../../types/note";
import NoteRow from "../noteRow/noteRow";
import "./notesList.css";

interface NotesListProps {
	onNoteUpdated: (
		updatedNoteId: NoteId,
		updatedNoteDetails: Partial<NoteDetails>
	) => void;
	onRemoveNote: (noteId: NoteId) => void;
	notes: Note[];
}

export const classNames = {
	notesList: "notes-list",
};

class NotesList extends React.Component<NotesListProps> {
	render() {
		return (
			<div className={classNames.notesList}>
				{this.props.notes.map((note) => (
					<NoteRow
						key={note.id}
						note={note}
						onNoteUpdated={this.props.onNoteUpdated}
						onRemoveNote={this.props.onRemoveNote}
					/>
				))}
			</div>
		);
	}
}

export default NotesList;
