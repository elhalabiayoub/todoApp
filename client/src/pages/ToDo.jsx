import React from "react";
import Form from "../components/Form";
import Todos from "../components/Todos";

import styled from "styled-components";
import {deleteAll} from "../redux/actions/rootActions";
import {useDispatch, useSelector} from "react-redux";

const Div = styled.div`
	width: 80%;
	margin: auto;
`;

function ToDo() {
	const todos = useSelector((state) => state);
	const dispatch = useDispatch();
	return (
		<Div className="todo">
			<Form />
			<div
				style={{
					width: "100%",
					display: "grid",
					placeItems: "center",
				}}
			>
				{todos.length !== 0 ? (
					<button
						style={{
							backgroundColor: "red",
							color: "white",
							borderRadius: "10px",
							padding: "5px",
							margin: "10px auto",
							cursor: "pointer",
						}}
						onClick={() => dispatch(deleteAll())}
					>
						Delete All
					</button>
				) : (
					<div>
						<p>o task add new todo</p>
					</div>
				)}
			</div>

			<Todos />
		</Div>
	);
}

export default ToDo;
