import {useState} from "react";

export default function CreateBlog({createBlog}) {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const handleCreateBlog = async (e) => {
		e.preventDefault();
		createBlog({
			title,
			author,
			url,
		});
		setTitle("");
		setAuthor("");
		setUrl("");
	};

	return (
		<div>
			<h3>Create new Blog</h3>
			<form onSubmit={handleCreateBlog}>
				<div className="">
					title
					<input
						type="text"
						value={title}
						name="title"
						data-testid="title"
						onChange={({target}) => setTitle(target.value)}
					/>
				</div>
				<div className="">
					author
					<input
						type="text"
						value={author}
						name="author"
						data-testid="author"
						onChange={({target}) => setAuthor(target.value)}
					/>
				</div>
				<div className="">
					url
					<input
						type="text"
						value={url}
						name="url"
						data-testid="url"
						onChange={({target}) => setUrl(target.value)}
					/>
				</div>
				<button type="submit">Create</button>
			</form>
		</div>
	);
}
