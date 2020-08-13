import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../assets/App.css";
import ToDo from "../pages/ToDo";
import Page404 from "../pages/Page404";
import NavBar from ".//NavBar";

function App() {
	return (
		<Router>
			<NavBar />
			<Switch>
				<Route path="/" exact component={ToDo} />
				<Route path="/Todo" exact component={ToDo} />
				{/*tab9a lakhra*/}
				<Route component={Page404} />
			</Switch>
		</Router>
	);
}

export default App;
