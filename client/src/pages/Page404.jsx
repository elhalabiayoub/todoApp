import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {setTodos} from "../redux/actions/rootActions";

const PageNotFound = (props) => {
	const styling = {
		left: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			height: "100%",
			width: "50%",
		},
		title: {
			fontSize: "60px",
			fontWeight: "bold",
		},
		container: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			height: "100%",
			width: "100%",
		},
		right: {
			height: "100%",
			width: "50%",
		},
		image: {
			width: "50%",
			height: "80%",
		},
	};

	return (
		<div style={styling.container}>
			<div style={styling.left}>
				<h1 style={styling.title} className="text-center">
					404 Not Found
				</h1>
				<br />
				<h4 className="text-center">
					Désolé la page que vous êtes entrain de rechercher n'existe pas.
				</h4>
				<br />
				<Link to="/">
					<button className="btn btn-danger">Go Home</button>
				</Link>
			</div>
			<div style={styling.right}>
				<img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRnltfxyRHuEEUE4gIZp9fr77Q8goigP7mQ6Q&usqp=CAU"
					style={styling.image}
				/>
			</div>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		todos: state,
	};
}

export default connect(mapStateToProps, {setTodos})(PageNotFound);
