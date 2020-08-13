import { SETTODOS, ADDTODO } from "../types/rootTypes";
import axios from "axios";

const reducer = (state = [], action) => {
	if (action.type === SETTODOS) {
		state = [...action.data];

		return state;
	} else {
		return state;
	}
};

export default reducer;
