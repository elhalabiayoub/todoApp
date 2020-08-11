import React from "react";

import "./assets/App.css";
import Form from "./components/Form";
import Todos from "./components/Todos";
import NavBar from "./components/NavBar";
function App() {
	return (
		<div className="App">
			<NavBar />
			<div className="app__content">
				<Form />
				<Todos />
			</div>
		</div>
	);
}

export default App;
