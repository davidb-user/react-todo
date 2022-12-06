import React from "react";
import { Note, NoteDetails } from "../../models/note";
import Checkbox from "../inputs/checkbox/checkbox";
import Textbox from "../inputs/textbox/textbox";
import NotesList from "../notesList/notesList";
import "./app.css";

type AppProps = Record<string, never>;

interface AppState {
	notes: Note[];
}

export const classNames = {
	app: "app",
	manageNotes: "manage-notes",
	toggleCompleteAllNotes: "toggle-complete-all-notes",
	createNoteContentInput: "create-note-content-input",
	appWrapper: "app-wrapper",
};

class App extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);

		this.state = {
			notes: [],
		};
	}

	onNoteUpdated = (
		updatedNoteId: string,
		updatedNoteDetails: Partial<NoteDetails>
	) => {
		if (updatedNoteDetails.content === "") {
			this.onRemoveNotes([updatedNoteId]);
		} else {
			const notes = this.state.notes.map((note) => {
				return note.id === updatedNoteId
					? { ...note, ...updatedNoteDetails }
					: note;
			});
			this.setState({
				notes,
			});
		}
	};

	onRemoveNotes = (noteIdsToRemove: string[]) => {
		const notes = this.state.notes.filter((note) => {
			return !noteIdsToRemove.includes(note.id);
		});
		this.setState({
			notes,
		});
	};

	onSubmitNewNote = (noteContent: string) => {
		if (noteContent === "") {
			return;
		}

		const newNote = new Note({ content: noteContent, isComplete: false });
		this.setState((prevState) => ({
			notes: [...prevState.notes, newNote],
		}));
	};

	onToggleCompleteAllChange = () => {
		const areAllNotesComplete =
			this.state.notes.length &&
			this.state.notes.every((note) => note.isComplete);

		this.setState((prevState) => ({
			notes: prevState.notes.map((note) => ({
				...note,
				isComplete: !areAllNotesComplete,
			})),
		}));
	};

	render() {
		const { notes } = this.state;

		return (
			<div className={classNames.appWrapper}>
				<div className={classNames.app}>
					<h1>TODOS</h1>
					<div className={classNames.manageNotes}>
						{notes.length > 0 && (
							<div className={classNames.toggleCompleteAllNotes}>
								<Checkbox
									isChecked={
										this.state.notes.length &&
										this.state.notes.every((note) => note.isComplete)
									}
									onChange={this.onToggleCompleteAllChange}
								/>
							</div>
						)}
						<div className={classNames.createNoteContentInput}>
							<Textbox
								defaultValue=""
								onSubmit={this.onSubmitNewNote}
								clearValueAfterSubmit={true}
								placeholderText={"Describe here the task to do..."}
							/>
						</div>
					</div>
					<NotesList
						notes={notes}
						onNoteUpdated={this.onNoteUpdated}
						onRemoveNotes={this.onRemoveNotes}
					/>
				</div>
			</div>
		);
	}
}

export default App;
