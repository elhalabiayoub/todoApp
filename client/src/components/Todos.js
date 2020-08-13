import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { IconContext } from "react-icons";
import axios from "axios";
import { connect } from "react-redux";
import TodoStyle from "../assets/TodosStyle";
import { setTodos } from "../redux/actions/rootActions";

const { Div, Li, Input, theme, Button } = TodoStyle();

function Todos(props) {
	const [onclick, setOnClick] = useState(false);
	const [index, setIndex] = useState("");
	const [editebale, setEditebale] = useState("");

	useEffect(() => {
		props.setTodos();
	}, [props.todos]);

	const onClickHandler = (message, id) => {
		console.log(message);
		if (message === "delete") {
			console.log("yes");
			axios.delete(`/todos/${id}`).then((res) => {
				console.log(res);
			});
		} else if (message === "edit") {
			if (!onclick) {
				document.getElementById(`${id}`).style.display = "block";
				setIndex(id);
				setEditebale("");
				setOnClick(true);
			} else {
				console.log("false");
				document.getElementById(`${index}`).style.display = "none";
				if (id === index) {
					setOnClick(false);
				} else {
					document.getElementById(`${id}`).style.display = "block";
					setIndex(id);
					setEditebale("");
					setOnClick(true);
				}
			}
		}
	};

	const changeHandlerEdit = (e) => {
		console.log(e.target.value);
		setEditebale(e.target.value);
	};

	const submitHandlerEdit = (message, id, e) => {
		e.preventDefault();
		if (message === "correct") {
			if (editebale.length !== 0) {
				console.log({ editebale });
				axios
					.put(`/todos/${id}`, { text: editebale, isdone: false })
					.then((res) => {
						console.log(res.data);
						document.getElementById(`${id}`).style.display = "none";
						setOnClick(false);
					});
			} else {
				alert("the input is empty");
			}
		} else if (message === "cancel") {
			localStorage.setItem("id", id);
			document.getElementById(`${id}`).style.display = "none";
			setOnClick(false);
			setEditebale("");
		}
	};
	const onClickHandlerIsDone = (isdone, text, id) => {
		console.log({ isdone });
		setOnClick(false);
		axios.put(`/todos/${id}`, { text: text, isdone: !isdone }).then((res) => {
			console.log(res.data);
		});
	};

	return (
		<Div>
			<ul>
				{props.todos.map(({ _id: id, text, isdone }) => {
					return (
						<div className={isdone ? "todos__done " : "todos__ligne"}>
							<div style={{ width: "70%" }}>
								<Li onClick={onClickHandlerIsDone.bind(this, isdone, text, id)}>
									{text}
								</Li>
								{!isdone && (
									<form
										id={id}
										className="todo__hidden"
										onSubmit={submitHandlerEdit.bind(this, "correct", id)}
									>
										<Input
											value={editebale}
											onChange={changeHandlerEdit}
											placeholder="modifier cet action ...  "
										/>
										<Button type="submit">correct</Button>
										<ThemeProvider theme={theme}>
											<Button
												onClick={submitHandlerEdit.bind(this, "cancel", id)}
											>
												cancel
											</Button>
										</ThemeProvider>
									</form>
								)}
							</div>
							<div style={{ width: "20%", justifyContent: "center" }}>
								<IconContext.Provider
									value={{ color: "red", className: "react-icons" }}
								>
									<AiOutlineDelete
										size="20"
										onClick={onClickHandler.bind(this, "delete", id)}
									/>
								</IconContext.Provider>
								<IconContext.Provider
									value={{ color: "blue", className: "react-icons" }}
								>
									{!isdone && (
										<FaRegEdit
											size="20"
											onClick={onClickHandler.bind(this, "edit", id)}
										/>
									)}
								</IconContext.Provider>
							</div>
						</div>
					);
				})}
			</ul>
		</Div>
	);
}
function mapStateToProps(state) {
	return {
		todos: state,
	};
}

export default connect(mapStateToProps, { setTodos })(Todos);
