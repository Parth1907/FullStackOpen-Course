import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import { errorHandler } from "./utils/middleware.js";
import {MONGO_URI} from "./utils/config.js";
import personsRouter from "./controllers/persons.js";
import {info, error} from "./utils/logger.js";
const app = express();

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use("/api/persons", personsRouter);

mongoose.set("strictQuery", false);
mongoose
	.connect(MONGO_URI)
	.then(() => {
		info("connected to MongoDB");
	})
	.catch((err) => {
		error("error connecting to MongoDB:", err.message);
	});

app.use(errorHandler);

export default app;

// Sample person data
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
