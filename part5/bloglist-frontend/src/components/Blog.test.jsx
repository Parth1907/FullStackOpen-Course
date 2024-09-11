import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import CreateBlog from "./CreateBlog";

test("renders only title and author", async () => {
	const blog = {
		title: "Test Blog",
		author: "John Doe",
		url: "https://demo.com/test-blog",
		likes: 0,
		user: {
			id: "1",
			name: "test",
			username: "test",
		},
	};

	const userDetails = {
		id: "1",
		name: "test",
		username: "test",
	};

	const blogElement = render(<Blog blog={blog} user={userDetails} />);

	const titleAuthorElement = screen.getByText(`${blog.title} ${blog.author}`);
	expect(titleAuthorElement).toBeDefined();

	const div = blogElement.container.querySelector("#blog-details");
	expect(div).toHaveStyle("display: none");
});

test("renders url and likes on pressing view button", async () => {
	const blog = {
		title: "Test Blog",
		author: "John Doe",
		url: "https://demo.com/test-blog",
		likes: 0,
		user: {
			id: "1",
			name: "test",
			username: "test",
		},
	};

	const userDetails = {
		id: "1",
		name: "test",
		username: "test",
	};

	const blogElement = render(<Blog blog={blog} user={userDetails} />);

	const user = userEvent.setup();
	const button = screen.getByText("view");
	await user.click(button);

	const div = blogElement.container.querySelector("#blog-details");
	expect(div).toHaveStyle("display: block");
});

test("ensures pressing of like button twice", async () => {
	const blog = {
		title: "Test Blog",
		author: "John Doe",
		url: "https://demo.com/test-blog",
		likes: 0,
		user: {
			id: "1",
			name: "test",
			username: "test",
		},
	};

	const userDetails = {
		id: "1",
		name: "test",
		username: "test",
	};
	const mockHandler = vi.fn();

	render(<Blog blog={blog} user={userDetails} handleLike={mockHandler} />);

	const user = userEvent.setup();
	const viewButton = screen.getByText("view");
	await user.click(viewButton);

	const likeButton = screen.getByText("like");
	await user.click(likeButton);
	await user.click(likeButton);

	
	expect(mockHandler.mock.calls).toHaveLength(2);
});

test("ensuring that the correct new blog has been created", async () => {
	const blog = {
		title: "Test Blog",
		author: "John Doe",
		url: "https://demo.com/test-blog",
	};

	const mockHandler = vi.fn();

	const {container} = render(<CreateBlog createBlog={mockHandler} />);

	const titleInput = container.querySelector('input[name="title"]');
	const authorInput = container.querySelector('input[name="author"]');
	const urlInput = container.querySelector('input[name="url"]');
	const submitButton = screen.getByText("Create");

	await userEvent.type(titleInput, blog.title);
	await userEvent.type(authorInput, blog.author);
	await userEvent.type(urlInput, blog.url);
	await userEvent.click(submitButton);

	expect(mockHandler.mock.calls).toHaveLength(1);	
	expect(mockHandler.mock.calls[0][0]).toEqual(blog);
});
