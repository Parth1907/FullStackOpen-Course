import "express-async-errors";
import express, {json, urlencoded} from "express";
import cors from "cors";
import blogRouter from "./controllers/blogs.js";
import userRouter from "./controllers/users.js";
import {mongoUrl} from "./utils/config.js";
import {connect} from "mongoose";
import {
	errorHandler,
	tokenExtractor,
	unknownEndpoint,
	userExtractor,
} from "./utils/middleware.js";
import loginRouter from "./controllers/login.js";
import testingRouter from "./controllers/testing.js";

const app = express();

connect(mongoUrl).then(() => {
	console.log("Connected to MongoDB");
});

app.use(cors());
app.use(json());
app.use(urlencoded({extended: true}));
app.use(tokenExtractor);

if (process.env.NODE_ENV === "test") {
	app.use("/api/testing", testingRouter);
}

app.use("/api/blogs", userExtractor, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(errorHandler, unknownEndpoint);

export default app;
