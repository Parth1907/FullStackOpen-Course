import express from "express";
import Blog from "../models/blog.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
const blogRouter = express.Router();

blogRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", {username: 1, name: 1});
	return response.status(200).json(blogs);
});

blogRouter.post("/", async (request, response) => {
	if (!request.body.title || !request.body.url) {
		return response
			.status(400)
			.json({error: "Missing title or url, required fields"});
	}

	if (!request.user) {
		return response.status(404).json({error: "User not found"});
	}
	
	const blog = new Blog({...request.body, user: request.user.id});
	const savedBlog = await blog.save();

	const user = await User.findById(request.user.id);

	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();

	return response.status(201).json(savedBlog);
});

blogRouter.get("/:id", async (req, res) => {
	const {id} = req.params;
	const result = await Blog.findById(id);
	return res.status(200).json(result);
});
blogRouter.delete("/:id", async (req, res) => {
	const {id} = req.params;
	const blogToBeDeleted = await Blog.findById(id);
	const user = req.user;

	if (blogToBeDeleted.user.toString() === user.id) {
		const result = await Blog.findByIdAndDelete(id);
		return res.status(204).end();
	} else {
		return res.status(401).json({error: "Unauthorised access"});
	}
});

blogRouter.put("/:id", async (req, res) => {
	const {id} = req.params;
	const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {new: true});
	return res.status(200).json(updatedBlog);
});
export default blogRouter;
