import {useState, useEffect} from "react";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import CreateBlog from "./components/CreateBlog";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState(null);
	const [hasError, setHasError] = useState(false);
	const [user, setUser] = useState(null);

	const getAllBlogs = async () => {
		try {
			const Allblogs = await blogService.getAll();
			setBlogs(
				Allblogs.sort((prevBlog, nextBlog) => nextBlog.likes - prevBlog.likes)
			);
		} catch (error) {
			console.error;
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const user = await loginService.login({
				username,
				password,
			});
			window.localStorage.setItem("user", JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setUsername("");
			setPassword("");
		} catch (error) {
			setHasError(true);
			setMessage("Wrong credentials");
			setTimeout(() => {
				setMessage(null);
				setHasError(false);
			}, 5000);
			console.error("Error occured in getting the user", error);
		}
	};

	const createBlog = async (blogDetails) => {
		try {
			const response = await blogService.create(blogDetails);
			setMessage(
				`a new blog ${blogDetails.title} by ${blogDetails.author} added`
			);
			setBlogs(blogs.concat(response));
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		} catch (error) {
			setHasError(true);
			setMessage("Error in adding new Blog");
			setTimeout(() => {
				setMessage(null);
				setHasError(false);
			}, 5000);
			console.error("Error occured in getting the user", error);
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem("user");
		blogService.setToken(null);
		setUser(null);
	};

	const handleLike = async (blog) => {
		try {
			await blogService.update(blog.id, {
				title: blog.title,
				author: blog.author,
				url: blog.url,
				likes: blog.likes + 1,
			});

			getAllBlogs();
		} catch (error) {
			console.error(error);
		}
	};

	const handleBlogDelete = async (blog) => {
		const confirm = window.confirm(
			`Remove blog ${blog.title} by ${blog.author}`
		);
		if (confirm) {
			try {
				await blogService.deleteBlog(blog.id);
				getAllBlogs();
			} catch (error) {
				console.error(error);
			}
		} else {
			return;
		}
	};

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("user");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
		getAllBlogs();
	}, []);

	return (
		<div>
			<Notification message={message} hasError={hasError} />
			{user === null ? (
				<LoginForm
					handleLogin={handleLogin}
					username={username}
					setUsername={setUsername}
					password={password}
					setPassword={setPassword}
				/>
			) : (
				<>
					<h2>Blogs</h2>
					<div className="">
						<p>{user.name} logged-in</p>
						<button onClick={handleLogout}>Logout</button>
					</div>
					<Togglable buttonLabel={"new blog"}>
						<CreateBlog createBlog={createBlog} />
					</Togglable>

					<h3>All Blogs</h3>
					{blogs.map((blog) => (
						<Blog
							key={blog.id}
							blog={blog}
							handleLike={handleLike}
							handleBlogDelete={handleBlogDelete}
							user={user}
						/>
					))}
				</>
			)}
		</div>
	);
};

export default App;
