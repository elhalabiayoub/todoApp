const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create a Schema
const todoSchema = new Schema({
	text: String,
	isdone: Boolean,
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
