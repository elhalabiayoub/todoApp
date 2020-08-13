import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";

const Input = styled.input`
	color: white;
	background-image: linear-gradient(to right, #14213d, #023e8a);
	border-radius: 20px;
	border: none;
	padding: 10px 20px;
	width: 60%;
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
	cursor: pointer;
	border-radius: 20px;
	background-color: #55a630;
	width: 20%;
	padding: 5px;
	color: white;
	font-size: 15px;
	font-weight: 500;
	font-family: "Kanit", sans-serif;

	border: 1px solid black;

	&:hover {
		background-color: #80b918;
	}

	&:focus {
		outline: none;
		border: 1px solid grey;
	}
`;

const Div = styled.div`
	margin-bottom: 30px;

	& > form {
		display: flex;
		flex: center;
		justify-content: center;
	}
`;

function Form() {
	const [inputValue, setinputValue] = useState("");
	const inputRef = useRef();
	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const submitHandler = (e) => {
		//const id = Math.random();
		e.preventDefault();
		const todo = {
			text: inputValue,
			isdone: false,
		};

		if (inputValue.length !== 0) {
			axios.post("/todos", todo).then((res) => {
				console.log(res.data);
				setinputValue("");
			});
		} else {
			alert("the input is empty");
		}
	};
	const changeHandler = (e) => {
		setinputValue(e.target.value);
	};
	return (
		<Div className="form">
			<form onSubmit={submitHandler}>
				<Input
					ref={inputRef}
					value={inputValue}
					onChange={changeHandler}
					className="form__input"
					placeholder="ajouter une autre action ...  "
				/>
				<Button type="submit" className="form__button">
					Add
				</Button>
			</form>
		</Div>
	);
}

export default Form;
