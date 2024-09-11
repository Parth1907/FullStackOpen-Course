const loginWith = async (page, username, password) => {
	await page.getByTestId("username").fill(username);
	await page.getByTestId("password").fill(password);
	await page.getByRole("button", {name: "Login"}).click();
};

const createBlog = async (page, blog) => {
	await page.getByTestId("title").fill(blog.title);
	await page.getByTestId("author").fill(blog.author);
	await page.getByTestId("url").fill(blog.url);
	await page.getByRole("button", {name: "Create"}).click();
};

export {loginWith, createBlog};