import {useState} from "react";

const Blog = ({blog, handleLike, handleBlogDelete, user}) => {
	const [viewDetails, setViewDetails] = useState(false);

	const toggleViewDetails = () => {
		setViewDetails(!viewDetails);
	};

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author}
			<button onClick={toggleViewDetails}>view</button>
			<div
				style={viewDetails ? {display: "block"} : {display: "none"}}
				id="blog-details"
			>
				<p>{blog.url}</p>
				<p>
					likes {blog.likes}
					<button onClick={() => handleLike(blog)}>like</button>
				</p>
				<p>{blog.user.name}</p>
				{user.username === blog.user.username && (
					<button onClick={()=>handleBlogDelete(blog)}>remove</button>
				)}
			</div>
		</div>
	);
};

export default Blog;
