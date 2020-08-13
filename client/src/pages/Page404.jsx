import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setTodos } from "../redux/actions/rootActions";

const PageNotFound = (props) => {
	const styling = {
		left: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			height: "100vh",
			width: "50%",
		},
		title: {
			fontSize: "60px",
			fontWeight: "bold",
		},
		container: {
			display: "flex",
			flexDirection: "row",
			height: "100vh",
			width: "100%",
		},
		right: {
			height: "100vh",
			width: "50%",
		},
		image: {
			maxWidth: "100%",
			height: "100vh",
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
				<img src="" style={styling.image} />
			</div>
			<div>
				<h2>redux</h2>
				<button onClick={props.setTodos}>+</button>
				{props.todos.map((todo) => {
					console.log(todo);
					return (
						<p>
							{todo._id} , {todo.text} , {`${todo.isdone}`}
						</p>
					);
				})}
			</div>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		todos: state,
	};
}

export default connect(mapStateToProps, { setTodos })(PageNotFound);
