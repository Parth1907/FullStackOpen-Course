import express from "express";
import cors from "cors";
import {configDotenv} from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import PhoneBook from "./models/PhoneBook.js";
import errorHandler from "./error_handler.js";

configDotenv();

const app = express();

app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

mongoose.set("strictQuery", false);
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message);
	});

// let persons = [
// 	{
// 		id: "1",
// 		name: "Arto Hellas",
// 		number: "040-123456",
// 	},
// 	{
// 		id: "2",
// 		name: "Ada Lovelace",
// 		number: "39-44-5323523",
// 	},
// 	{
// 		id: "3",
// 		name: "Dan Abramov",
// 		number: "12-43-234345",
// 	},
// 	{
// 		id: "4",
// 		name: "Mary Poppendieck",
// 		number: "39-23-6423122",
// 	},
// ];

app.get("/api/persons", (req, res) => {
	// const person =
	PhoneBook.find({}).then((persons) => res.status(200).json(persons));
	// console.log(PhoneBook.find({}));

	// res.status(200).json(PhoneBook.find({}));
});
app.post("/api/persons", (req, res, next) => {
	if (!req.body.name || !req.body.number) {
		return res.status(400).json({error: "Name and number are required fields"});
	}
	// if (persons.find((person) => person.name === req.body.name)) {
	// 	return res.status(400).json({error: "Name must be unique"});
	// }
	const person = new PhoneBook({
		name: req.body.name,
		number: req.body.number,
	});

	person
		.save()
		.then((savedPerson) => {
			res.status(201).json(savedPerson);
		})
		.catch((error) => next(error));
	// persons = [
	// 	...persons,
	// 	{
	// 		id: Math.floor(Math.random() * 1000),
	// 		name: req.body.name,
	// 		number: req.body.number,
	// 	},
	// ];
	// res.status(201).json(persons);
});
app.get("/api/persons/:id", (req, res, next) => {
	const {id} = req.params;
	PhoneBook.findById(id)
		.then((person) => {
			if (person) {
				res.status(200).json(person);
			} else {
				res.status(404).end();
			}
		})
		.catch((error) => {
			next(error);
		});
	// const person = persons.find((person) => person.id === id);
	// if (person) {
	// 	res.status(200).json(person);
	// } else {
	// 	res.status(404).end();
	// }
});
app.delete("/api/persons/:id", (req, res, next) => {
	const {id} = req.params;
	PhoneBook.findByIdAndDelete(id)
		.then(res.status(204).end())
		.catch((error) => next(error));
	// persons = persons.filter((person) => person.id !== id);
	// res.status(204).end();
});

app.put("/api/persons/:id", (req, res, next) => {
	const body = req.body;
	const person = {
		name: body.name,
		number: body.number,
	};
	PhoneBook.findByIdAndUpdate(req.params.id, person, {new: true})
		.then((updatedPersons) => res.status(200).json(updatedPersons))
		.catch((error) => next(error));
});

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
