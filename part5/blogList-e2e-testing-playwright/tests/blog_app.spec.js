import {test, expect, beforeEach, describe} from "@playwright/test";
import {createBlog, loginWith} from "./helper";
describe("Blog app", () => {
	beforeEach(async ({page, request}) => {
		await request.post("/api/testing/reset");
		await request.post("/api/users", {
			data: {
				name: "Parth Kalra",
				username: "parth",
				password: "parth123",
			},
		});

		await page.goto("/");
	});

	test("Login Form is shown first", async ({page}) => {
		const locator = await page.getByText("Login");

		await expect(locator).toBeVisible();
	});

	describe("Login", () => {
		test("succeeds with correct credentials", async ({page}) => {
			await loginWith(page, "parth", "parth123");
			await expect(page.getByText("Parth Kalra logged-in")).toBeVisible();
		});
		test("fails with wrong credentials", async ({page}) => {
			await loginWith(page, "parth", "parth");
			await expect(page.getByText("Wrong credentials")).toBeVisible();
		});
	});

	describe("When logged in", () => {
		beforeEach(async ({page}) => {
			await loginWith(page, "parth", "parth123");
		});

		test("a new blog can be created", async ({page}) => {
			const blog = {
				title: "Test Blog",
				author: "test user",
				url: "https://demo.com/test-blog",
			};

			await createBlog(page, blog);

			await expect(
				page.getByText(`a new blog ${blog.title} by ${blog.author} added`)
			).toBeVisible();
			await expect(
				page.getByText(`${blog.title} ${blog.author}`)
			).toBeVisible();
		});

		describe("Blog", () => {
			beforeEach(async ({page}) => {
				await page.getByRole("button", {name: "new blog"}).click();

				const blog = {
					title: "Sample Blog",
					author: "John Doe",
					url: "https://demo.com/test-blog",
				};

				await createBlog(page, blog);
			});

			test("blog can be liked", async ({page}) => {
				const viewButton = await page.getByRole("button", {name: "view"});
				await viewButton.click();

				const likeButton = await page.getByRole("button", {name: "like"});

				await expect(page.getByText("likes 0")).toBeVisible();

				await likeButton.click();
				await expect(page.getByText("likes 1")).toBeVisible();
			});

			test("blog can be deleted by user who created it", async ({page}) => {
				const blog = {
					title: "Sample Blog 2",
					author: "John Doe",
					url: "https://demo.com/test-blog-2",
				};

				await createBlog(page, blog);

				const viewButton = await page.getByRole("button", {name: "view"});
				await viewButton.click();

				const removeButton = await page.getByRole("button", {name: "remove"});
				await removeButton.click();
				await expect(
					page.getByText(`${blog.title} ${blog.author}`)
				).not.toBeVisible();
			});
		});
	});
});
