import React from "react";
import { Note } from "../../types/note";
import NotesList from "../notesList/notesList";
import "./app.css";

type AppProps = Record<string, never>;

interface AppState {
	notes: Note[];
}

class App extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);

		this.state = {
			notes: [],
		};
	}

	onNoteUpdated = (note: Note) => {
		console.log(note);
	};

	render() {
		const { notes } = this.state;

		return (
			<div className="app">
				<NotesList onNoteUpdated={this.onNoteUpdated} notes={notes} />
			</div>
		);
	}
}

export default App;
