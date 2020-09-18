const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Pusher = require("pusher");

const dotenv = require("dotenv");
mongoose.Promise = global.Promise;

var pusher = new Pusher({
	appId: "1075471",
	key: "eec14663e9a10b7c75b3",
	secret: "a9f3e568942d06947e82",
	cluster: "eu",
	encrypted: true,
});
// connect to mongodb
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", () => {
	console.log("db connected");
	const msgCollection = db.collection("todos");
	const changeStream = msgCollection.watch();
	changeStream.on("change", async (change) => {
		console.log(change);
		if (change.operationType === "insert") {
			const todoDetails = change.fullDocument;
			console.log(todoDetails);
			pusher.trigger("todo", "inserted", {
				todo: todoDetails,
			});
		} else if (change.operationType === "delete") {
			const todoId = change.documentKey;

			pusher.trigger("todo", "deleted", {
				todo: todoId,
			});
		} else if (change.operationType === "update") {
			const todoId = change.documentKey;
			const newTodo = change.updateDescription.updatedFields;

			pusher.trigger("todo", "edited", {
				todo: {
					id: todoId,
					newTodo,
				},
			});
		} else {
			console.log("error triggering Pusher ");
		}
	});
});
app.use(bodyParser.json());
app.use("/", require("./routes/requests"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log("the connection has established");
});
