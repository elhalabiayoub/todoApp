import React from "react";
import Form from "../components/Form";
import Todos from "../components/Todos";

import styled from "styled-components";

const Div = styled.div`
	width: 80%;
	margin: auto;
`;

function ToDo() {
	return (
		<Div className="todo">
			<Form />
			<Todos />
		</Div>
	);
}

export default ToDo;
