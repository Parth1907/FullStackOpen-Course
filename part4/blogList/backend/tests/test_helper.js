import Blog from "../models/blog.js";
import User from "../models/user.js";

const initialBlogs = [
	{
		title: "Understanding JavaScript Closures",
		author: "Jane Doe",
		url: "https://example.com/javascript-closures",
		likes: 120,
	},
	{
		title: "A Guide to Modern CSS Layouts",
		author: "John Smith",
		url: "https://example.com/css-layouts",
		likes: 85,
	},
];

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((user) => user.toJSON());
};

export {initialBlogs, blogsInDb, usersInDb};
