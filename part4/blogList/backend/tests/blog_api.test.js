import {test, after, beforeEach, describe} from "node:test";
import assert from "assert";
import mongoose from "mongoose";
import Blog from "../models/blog.js";
import supertest from "supertest";
import app from "../app.js";
import {initialBlogs, blogsInDb, usersInDb} from "./test_helper.js";

const api = supertest(app);
const baseUrl = "/api/blogs";

beforeEach(async () => {
	await Blog.deleteMany({});
	const users = await usersInDb()
		
	for (let blog of initialBlogs) {
		let blogObject = new Blog({...blog, user: users[0].id});
		await blogObject.save();		
	}
});

describe("when there are some blogs saved or new blogs are made", () => {
	test("blogs are returned as json", async () => {
		await api
			.get(baseUrl)
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});

	test("there are 2 sample blogs", async () => {
		const response = await blogsInDb();
		assert.strictEqual(response.length, initialBlogs.length);
	});

	test("blogs return id instead of _id", async () => {
		const response = await blogsInDb();
		const attribute = Object.keys(response[0]);
		const hasId = attribute.includes("id");
		assert.strictEqual(hasId, true);
	});

	test("a valid blog has been created", async () => {
		const newBlog = {
			title: "Understanding Full stack development",
			author: "Parth Kalra",
			url: "https://example.com/fsd-blog",
			likes: 5,
		};

		await api
			.post(baseUrl)
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const response = await blogsInDb();

		const contents = response.map((r) => {
			return {
				title: r.title,
				author: r.author,
				url: r.url,
				likes: r.likes,
			};
		});

		assert.strictEqual(response.length, initialBlogs.length + 1);
		assert(
			contents.some(
				(r) =>
					r.title === newBlog.title &&
					r.author === newBlog.author &&
					r.url === newBlog.url &&
					r.likes === newBlog.likes
			)
		);
	});

	test("likes defaults to zero if missing from request", async () => {
		const newBlog = {
			title: "Demo Title",
			author: "Demo User",
			url: "https://example.com/demo-blog",
		};

		await api
			.post(baseUrl)
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const response = await blogsInDb();
		assert.strictEqual(response[response.length - 1].likes, 0);
	});

	test("Server throws error of 400 on absence of title or url", async () => {
		const blogWithoutUrl = {
			title: "Demo Title 1",
			author: "Demo User",
		};
		const blogWithoutTitle = {
			author: "Demo User",
			url: "https://example.com/demo-blog",
		};

		await api.post(baseUrl).send(blogWithoutUrl).expect(400);
		await api.post(baseUrl).send(blogWithoutTitle).expect(400);
	});

	test("deletion works as intended", async () => {
		const blogToBeDeleted = {
			title: "Understanding JavaScript Closures",
			author: "Jane Doe",
			url: "https://example.com/javascript-closures",
			likes: 120,
		};
		const blogListAtStart = await blogsInDb();
		const blog = await Blog.findOne(blogToBeDeleted);

		await api.delete(`${baseUrl}/${blog.id}`);

		const blogListAtEnd = await blogsInDb();
		const searchForDeletedBlog = await Blog.findOne(blog);

		assert.strictEqual(blogListAtStart.length - 1, blogListAtEnd.length);
		assert(!searchForDeletedBlog);
	});

	test("update works as intended", async () => {
		const blogToBeUpdated = {
			title: "A Guide to Modern CSS Layouts",
			author: "John Smith",
			url: "https://example.com/css-layouts",
			likes: 70,
		};
		const AllBlogs = await blogsInDb();

		const blog = AllBlogs.find(
			(person) =>
				person.title === blogToBeUpdated.title &&
				person.author === blogToBeUpdated.author &&
				person.url === blogToBeUpdated.url
		);

		await api
			.put(`${baseUrl}/${blog.id}`)
			.send(blogToBeUpdated)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		const searchForUpdatedBlog = await api.get(`${baseUrl}/${blog.id}`);

		assert.deepStrictEqual(searchForUpdatedBlog.body, {
			...blogToBeUpdated,
			id: blog.id,
		});
	});
});

after(async () => {
	await mongoose.connection.close();
});
