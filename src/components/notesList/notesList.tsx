import React from "react";
import { Note as NoteModel, NoteDetails, NoteId } from "../../models/note";
import Button from "../inputs/button/button";
import Note from "../note/note";
import "./notesList.css";

export enum NotesFilter {
	All = "all",
	Active = "active",
	Completed = "completed",
}

interface NotesListProps {
	onNoteUpdated: (
		updatedNoteId: NoteId,
		updatedNoteDetails: Partial<NoteDetails>
	) => void;
	onRemoveNotes: (noteIds: NoteId[]) => void;
	notes: NoteModel[];
}

interface NotesListState {
	activeFilter: NotesFilter;
}

export const classNames = {
	notesList: "notes-list",
	notes: "notes",
	notesManagement: "notes-management",
	notesInfo: "notes-info",
	notesFilterButtons: "notes-filter-buttons",
	clearCompletedNotesButton: "clear-completed-notes-button",
};

class NotesList extends React.Component<NotesListProps, NotesListState> {
	constructor(props: NotesListProps) {
		super(props);

		this.state = {
			activeFilter: NotesFilter.All,
		};
	}

	getFilteredNotes = (activeFilter: NotesFilter, notes: NoteModel[]) => {
		return notes.filter((note) => {
			if (
				(activeFilter === NotesFilter.Active && note.isComplete) ||
				(activeFilter === NotesFilter.Completed && !note.isComplete)
			) {
				return false;
			}

			return true;
		});
	};

	setNotesFilter = (filter: NotesFilter): void => {
		this.setState({
			activeFilter: filter,
		});
	};

	onClearCompletedNotes = () => {
		const completedNotes = this.props.notes.filter((note) => note.isComplete);
		this.props.onRemoveNotes(completedNotes.map((note) => note.id));
	};

	getFilterButtons = (activeFilter: NotesFilter): React.ReactNode => {
		return Object.entries(NotesFilter).map(
			([filterEnumKey, filterEnumValue]) => {
				return (
					<span key={filterEnumValue} className={filterEnumValue}>
						<Button
							isSelected={activeFilter === filterEnumValue}
							onClick={() => this.setNotesFilter(filterEnumValue)}
						>
							{filterEnumKey}
						</Button>
					</span>
				);
			}
		);
	};

	render() {
		const { activeFilter } = this.state;
		const { notes } = this.props;

		const filteredNotes = this.getFilteredNotes(activeFilter, notes);

		const completedNotesLength = this.props.notes.filter(
			(note) => !note.isComplete
		).length;
		return (
			<div className={classNames.notesList}>
				<div role={"list"} className={classNames.notes}>
					<div role={"listitem"}>
						{filteredNotes.map((note) => (
							<Note
								key={note.id}
								note={note}
								onNoteUpdated={this.props.onNoteUpdated}
								onRemoveNote={(noteId) => this.props.onRemoveNotes([noteId])}
							/>
						))}
					</div>
				</div>
				{notes.length > 0 && (
					<div className={classNames.notesManagement}>
						<div className={classNames.notesInfo}>
							<span>
								{completedNotesLength} item
								{completedNotesLength === 1 ? "" : "s"} left
							</span>
						</div>
						<div className={classNames.notesFilterButtons}>
							{this.getFilterButtons(activeFilter)}
						</div>
						<div className={classNames.clearCompletedNotesButton}>
							{this.props.notes.filter((note) => note.isComplete).length !==
								0 && (
								<Button onClick={this.onClearCompletedNotes}>
									Clear completed
								</Button>
							)}
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default NotesList;
