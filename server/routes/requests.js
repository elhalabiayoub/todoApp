const express = require("express");
const router = express.Router();

const Todo = require("../models/Todo");

router.get("/todos", (req, res) => {
	console.log(" ok");
	var query = Todo.find({}).sort({_id: -1});
	query.exec((err, todos) => {
		if (err) {
			return handleError(err);
		} else {
			console.log({todos});
			res.send(todos);
		}
	});
});

router.post("/todos", async (req, res) => {
	console.log("i received a request from the client");
	console.log(req.body);
	const todo = new Todo({text: req.body.text, isdone: req.body.isdone});
	await todo.save();

	/*todos.push({ id: req.body.id, text: req.body.text });
	console.log(todos);*/
});

router.delete("/todos/:message", (req, res) => {
	console.log(" ok delete");
	const message = req.params.message;
	Todo.findByIdAndRemove({_id: message}).then((todo) => {
		res.send("everything is ok i deleted it " + todo);
	});
	/*
	var count = 0;
	todos.forEach((todo) => {
		count++;

		if (todo.id == message) {
			count--;
			todos.splice(count, 1);
		}
	});*/
});
router.delete("/todos", (req, res) => {
	Todo.deleteMany({})
		.then((res) => {
			res.send("great", res);
		})
		.catch((err) => {
			res.send(err);
		});
});

router.put("/todos/:id", (req, res) => {
	console.log(" ok update");
	const id = req.params.id;
	console.log(req.body);

	Todo.findByIdAndUpdate({_id: id}, req.body).then((todo) => {
		Todo.findOne({_id: id}).then((todo) => {
			res.send(todo);
		});
	});

	/*todos.forEach((todo) => {
		if (todo.id == id) {
			todo.text = req.body.text;
		}
	});*/
});

module.exports = router;
