import React from "react";
import { Note } from "../../types/note";
import NoteRow from "../noteRow/noteRow";
import "./notesList.css";

interface NotesListProps {
	onNoteUpdated: (note: Note) => void;
	notes: Note[];
}

class NotesList extends React.Component<NotesListProps> {
	render() {
		return (
			<div className="notes-list">
				{this.props.notes.map((note) => (
					<NoteRow
						key={note.id}
						note={note}
						onNoteUpdated={this.props.onNoteUpdated}
					/>
				))}
			</div>
		);
	}
}

export default NotesList;
