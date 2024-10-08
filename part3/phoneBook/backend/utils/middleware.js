import {error} from "./logger.js";

const unknownEndpoint = (request, response) => {
	response.status(404).send({error: "unknown endpoint"});
};

const errorHandler = (err, request, response, next) => {
	error(err.message);

	if (err.name === "CastError") {
		return response.status(400).send({error: "malformatted id"});
	} else if (err.name === "ValidationError") {
		return response.status(400).json({error: err.message});
	}

	next(err);
};

export {unknownEndpoint, errorHandler};
