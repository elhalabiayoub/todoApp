import {SETTODOS, ADDTODO, DELETETODO, UPDATETODO} from "../types/rootTypes";

const reducer = (state = [], action) => {
	if (action.type === SETTODOS) {
		state = [...action.data];

		return state;
	} else if (action.type === ADDTODO) {
		state = [action.data, ...state];

		return state;
	} else if (action.type === DELETETODO) {
		const newList = state.filter((todo) => todo._id !== action.data);
		console.log(newList);
		state = [...newList];

		return state;
	} else if (action.type === UPDATETODO) {
		const todos = state.map((todo) => {
			if (todo._id === action.data.id) {
				if (action.data.newTodo.text) {
					todo.text = action.data.newTodo.text;
				} else {
					todo.isdone = action.data.newTodo.isdone;
				}
			}
			return todo;
		});
		state = [...todos];
		return state;
	} else {
		return state;
	}
};

export default reducer;
