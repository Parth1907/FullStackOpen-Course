import express from "express";
import Person from "../models/person.js";
const personsRouter = express.Router();
personsRouter.get("/", (req, res) => {
	Person.find({}).then((persons) => {		
		res.status(200).json(persons);
	});
});
personsRouter.post("/", (req, res, next) => {
	if (!req.body.name || !req.body.number) {
		return res.status(400).json({error: "Name and number are required fields"});
	}

	const person = new Person({
		name: req.body.name,
		number: req.body.number,
	});

	person
		.save()
		.then((savedPerson) => {
			res.status(201).json(savedPerson);
		})
		.catch((error) => next(error));
});
personsRouter.get("/:id", (req, res, next) => {
	const {id} = req.params;
	Person.findById(id)
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
});
personsRouter.delete("/:id", (req, res, next) => {
	const {id} = req.params;
	Person.findByIdAndDelete(id)
		.then(res.status(204).end())
		.catch((error) => next(error));
});

personsRouter.put("/:id", (req, res, next) => {
	const body = req.body;
	const person = {
		name: body.name,
		number: body.number,
	};
	person
		.findByIdAndUpdate(req.params.id, person, {new: true})
		.then((updatedPersons) => res.status(200).json(updatedPersons))
		.catch((error) => next(error));
});

export default personsRouter;
