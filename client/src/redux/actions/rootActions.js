import {
	SETTODOS,
	ADDTODO,
	DELETETODO,
	UPDATETODO,
	DELETEALL,
} from "../types/rootTypes";
import axios from "axios";

export const addTodo = (todo) => {
	return {type: ADDTODO, data: todo};
};
export const deleteTodo = (id) => {
	return {type: DELETETODO, data: id};
};
export const updateTodo = (id, newTodo) => {
	return {type: UPDATETODO, data: {id, newTodo}};
};

export const setTodos = () => {
	var data = [];
	return (dispatch) => {
		return axios.get("/todos").then((res) => {
			data = res.data;
			dispatch({type: SETTODOS, data});
		});
	};
};
export const deleteAll = () => {
	var data = [];
	return (dispatch) => {
		return axios.delete("/todos").then((res) => {
			data = res.data;
			dispatch({type: DELETEALL, data});
		});
	};
};
