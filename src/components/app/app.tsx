import React from "react";
import { Note } from "../../types/note";
import TextInput from "../inputs/text/textInput";
import NotesList from "../notesList/notesList";
import "./app.css";

type AppProps = Record<string, never>;

interface AppState {
	notes: Note[];
}

export const classNames = {
	app: "app",
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
		updatedNoteDetails: Partial<Omit<Note, "id">>
	) => {
		const notes = this.state.notes.map((note) => {
			return note.id === updatedNoteId
				? { ...note, ...updatedNoteDetails }
				: note;
		});
		this.setState({
			notes,
		});
	};

	onRemoveNote = (noteIdToRemove: string) => {
		const notes = this.state.notes.filter((note) => {
			return note.id !== noteIdToRemove;
		});
		this.setState({
			notes,
		});
	};

	render() {
		const { notes } = this.state;

		return (
			<div className="app">
				<TextInput value="" onChange={this.onChange} />
				<NotesList
					notes={notes}
					onNoteUpdated={this.onNoteUpdated}
					onRemoveNote={this.onRemoveNote}
				/>
			</div>
		);
	}
}

export default App;
