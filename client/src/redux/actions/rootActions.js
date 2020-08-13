import { INCREASE, DECREASE, SETTODOS, ADDTODO } from "../types/rootTypes";
import axios from "axios";
export const increase = () => {
	return { type: INCREASE };
};

export const decrease = () => {
	return { type: DECREASE };
};

export const setTodos = () => {
	var data = [];
	return (dispatch) => {
		return axios.get("/todos").then((res) => {
			data = res.data;
			dispatch({ type: SETTODOS, data });
		});
	};
};
