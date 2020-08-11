const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// connect to mongodb

mongoose.connect("mongodb://127.0.0.1/todoapp", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use("/", require("./routes/requests"));

app.listen(4000, () => {
	console.log("the connection has established");
});
