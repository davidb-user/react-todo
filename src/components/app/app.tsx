import React from "react";
import NotesList from "../notesList/notesList";
import "./app.css";

class App extends React.Component {
	render() {
		return (
			<div className="app">
				<NotesList />
			</div>
		);
	}
}

export default App;
