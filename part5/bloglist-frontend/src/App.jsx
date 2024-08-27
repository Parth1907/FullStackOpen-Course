import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification"
import blogService from "./services/blogs";
import loginService from "./services/login"

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState(null);
	const [hasError, setHasError] = useState(false);
	const [user, setUser] = useState(null);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault()
		try {
			const user = await loginService.login({
				username, password
			});
			window.localStorage.setItem('user', JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setUsername("")
			setPassword("")
		} catch (error) {
			setHasError(true)
			setMessage('Wrong credentials')
			setTimeout(() => {
				setMessage(null);
				setHasError(false);
			}, 5000);
			console.error("Error occured in getting the user", error);
		}
	}

	const handleCreateBlog = async (e) => {
		e.preventDefault()
		try {
			const response = await blogService.create({
				title, author, url
			})
			setMessage(`a new blog ${title} by ${author} added`);
			setBlogs([...blogs, response])
			setTimeout(() => {
				setMessage(null);
			}, 5000);
			setTitle("")
			setAuthor("")
			setUrl("")
		} catch (error) {
			setHasError(true)
			setMessage('Error in adding new Blog')
			setTimeout(() => {
				setMessage(null);
				setHasError(false);
			}, 5000);
			console.error("Error occured in getting the user", error);
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem("user")
		blogService.setToken(null)
		setUser(null)
	}

	useEffect(() => {
		const getAllBlogs = async () => {
			try {
				const Allblogs = await blogService.getAll()
				setBlogs(Allblogs.data)
			} catch (error) {
				console.error
			}
		}
		const loggedUserJSON = window.localStorage.getItem("user");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user)
			blogService.setToken(user.token)
		}
		getAllBlogs()
	}, []);


	return (
		<div>
			<Notification message={message} hasError={hasError} />
			{user === null ? (
				<div>
					<h2>Log in to application</h2>
					<form onSubmit={handleLogin}>
						<div className="">
							username
							<input
								type="text"
								value={username}
								name="username"
								onChange={({ target }) => setUsername(target.value)}
							/>
						</div>
						<div className="">
							password
							<input
								type="password"
								value={password}
								name="password"
								onChange={({ target }) => setPassword(target.value)}
							/>
						</div>
						<button type="submit">Login</button>
					</form>
				</div>
			) : (
				<div>
					<h2>blogs</h2>
					<div className="">
						<p>{user.name} logged-in</p>
						<button onClick={handleLogout}>Logout</button>
					</div>
					<h3>Create new Blog</h3>
					<form onSubmit={handleCreateBlog}>
						<div className="">
							title
							<input
								type="text"
								value={title}
								name="title"
								onChange={({ target }) => setTitle(target.value)}
							/>
						</div>
						<div className="">
							author
							<input
								type="text"
								value={author}
								name="author"
								onChange={({ target }) => setAuthor(target.value)}
							/>
						</div>
						<div className="">
							url
							<input
								type="text"
								value={url}
								name="url"
								onChange={({ target }) => setUrl(target.value)}
							/>
						</div>
						<button type="submit">Create</button>
					</form>
					<h3>All Blogs</h3>
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</div>
	);
};

export default App;
