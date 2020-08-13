import styled from "styled-components";

const TodoStyle = () => {
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
		cursor: pointer;

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

	return {
		Div,
		Li,
		Input,
		theme,
		Button,
	};
};

export default TodoStyle;
