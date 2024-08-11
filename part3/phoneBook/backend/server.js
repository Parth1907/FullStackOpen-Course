import express from "express";
import cors from "cors";
import {configDotenv} from "dotenv";
import morgan from "morgan";

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

let persons = [
	{
		id: "1",
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: "2",
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: "3",
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: "4",
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

app.get("/api/persons", (req, res) => {
	res.status(200).json(persons);
});
app.post("/api/persons", (req, res) => {
	if (!req.body.name || !req.body.number) {
		return res.status(400).json({error: "Name and number are required fields"});
	}
	if (persons.find((person) => person.name === req.body.name)) {
		return res.status(400).json({error: "Name must be unique"});
	}
	persons = [
		...persons,
		{
			id: Math.floor(Math.random() * 1000),
			name: req.body.name,
			number: req.body.number,
		},
	];
	res.status(201).json(persons);
});
app.get("/api/persons/:id", (req, res) => {
	const {id} = req.params;
	const person = persons.find((person) => person.id === id);
	if (person) {
		res.status(200).json(person);
	} else {
		res.status(404).end();
	}
});
app.delete("/api/persons/:id", (req, res) => {
	const {id} = req.params;
	persons = persons.filter((person) => person.id !== id);
	res.status(204).end();
});

app.get("/info", (req, res) => {
	res.send(
		`<div><p>Phonebook has info for ${
			persons.length
		} people.</p><p>${new Date()}</p><div/>`
	);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
