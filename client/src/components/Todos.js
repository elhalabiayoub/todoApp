import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { IconContext } from "react-icons";
import axios from "axios";

const Div = styled.div`
	background-image: linear-gradient(to bottom, #0096c7, #0077b6, #14213d);
	border-radius: 80px;
	margin-bottom: 50px;
	box-shadow: 15px -15px 20px rgba(72, 202, 228, 0.6);
	padding: 10px;
	.todos__done {
		text-decoration: line-through black;

		display: flex;
		color: black;
		font-size: 15px;
		font-family: "roboto";
		padding: 5px 20px;
		transition: background-color 100ms ease;
		border-radius: 20px;
		background-color: rgba(72, 202, 228, 0);

		&:hover {
			border-radius: 20px;
			background-color: rgba(72, 202, 228, 0.1);
		}
	}
	.todos__done > div > li {
		width: 90%;
		height: 30px;
	}
	.todo__hidden {
		display: none;
	}
	.todo__show {
		display: block;
	}

	.todos__ligne {
		display: flex;
		color: white;
		padding: 5px 20px;
		transition: background-color 100ms ease;
		border-radius: 20px;
		background-color: rgba(72, 202, 228, 0);
		&:hover {
			border-radius: 20px;
			background-color: rgba(72, 202, 228, 0.4);
		}
	}

	.react-icons {
		justify-content: center;
		cursor: pointer;
		transition: background-color 100ms ease;
		&:hover {
			background-color: rgba(0, 0, 0, 0.3);
		}

		border-radius: 20px;
		padding: 5px;
		margin-right: 5px;
		font-size: 20px;
	}
`;

const Li = styled.li`
	color: white;
	list-style: none;
	margin-bottom: 10px;
	cursor: pointer;
`;

const Input = styled.input`
	color: white;
	background-image: linear-gradient(to right, #14213d, #023e8a);
	border-radius: 20px;
	border: none;
	padding: 10px 20px;
	width: 40%;
	font-size: 15px;
	font-weight: 500;
	font-family: "Kanit", sans-serif;
	transition: background-image 100ms ease;
	margin-right: 20px;

	&:focus {
		outline: none;
		background-image: linear-gradient(to right, #023e8a, #14213d);
	}
	::placeholder {
		color: rgba(255, 255, 255, 0.7);
	}
`;

const Button = styled.button`
	border-radius: 20px;
	background-color: ${(props) => props.theme.color};
	width: 15%;
	padding: 5px;
	margin-right: 10px;
	color: white;
	font-size: 15px;
	font-weight: 500;
	font-family: "Kanit", sans-serif;

	border: 1px solid black;

	&:hover {
		background-color: ${(props) => props.theme.background};
	}

	&:focus {
		outline: none;
		border: 1px solid grey;
	}
`;
Button.defaultProps = {
	theme: {
		color: "#55a630",
		background: "#80b918",
	},
};
const theme = {
	color: "#ef233c",
	background: "#d90429",
};

function Todos() {
	const [onclick, setOnClick] = useState(false);
	const [index, setIndex] = useState("");
	const [editebale, setEditebale] = useState("");
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		axios.get("/todos").then((res) => {
			setTodos(res.data);
		});
	}, []);

	const onClickHandler = (message, id) => {
		console.log(message);
		if (message === "delete") {
			console.log("yes");
			axios.delete(`/todos/${id}`).then((res) => {
				axios.get("/todos").then((res) => {
					setTodos(res.data);
				});
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
		} else if (message === "cancel") {
			localStorage.setItem("id", id);
			document.getElementById(`${index}`).style.display = "none";
			setOnClick(false);
			setEditebale("");
		} else if (message === "correct") {
			document.getElementById(`${id}`).style.display = "none";
			setOnClick(false);
		}
	};

	const changeHandlerEdit = (e) => {
		console.log(e.target.value);
		setEditebale(e.target.value);
	};

	const submitHandlerEdit = (id) => {
		console.log({ editebale });
		if (editebale.length !== 0) {
			axios
				.put(`/todos/${id}`, { text: editebale, isdone: false })
				.then((res) => {
					console.log(res.data);
				});
		} else {
			alert("the input is empty");
		}
	};
	const onClickHandlerIsDone = (isdone, text, id) => {
		console.log({ isdone });
		setOnClick(false);

		axios.put(`/todos/${id}`, { text: text, isdone: !isdone }).then((res) => {
			console.log(res.data);
			axios.get("/todos").then((res) => {
				setTodos(res.data);
			});
		});
	};

	return (
		<Div>
			<ul>
				{todos.map(({ _id: id, text, isdone, index }) => {
					console.log({ index });
					return (
						<div className={isdone ? "todos__done " : "todos__ligne"}>
							<div style={{ width: "70%" }}>
								<Li onClick={onClickHandlerIsDone.bind(this, isdone, text, id)}>
									{text}
								</Li>
								{!isdone && (
									<form id={id} className="todo__hidden">
										<Input
											value={editebale}
											onChange={changeHandlerEdit}
											placeholder="modifier cet action ...  "
										/>
										<Button
											type="submit"
											onClick={submitHandlerEdit.bind(this, id)}
										>
											correct
										</Button>
										<ThemeProvider theme={theme}>
											<Button onClick={onClickHandler.bind(this, "cancel", id)}>
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

export default Todos;
