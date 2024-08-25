const dummy = () => {
	return 1;
};

const totalLikes = (blogs) => {
	const reducer = (totalLikes, blog) => totalLikes + blog.likes;
	return blogs.reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
	const reducer = (blog1, blog2) => (blog1.likes > blog2.likes ? blog1 : blog2);
	const favBlog = blogs.reduce(reducer, blogs[0]);
	return {
		title: favBlog.title,
		author: favBlog.author,
		likes: favBlog.likes,
	};
};

const mostBlogs = (blogs) => {
	const authorReducer = (count, blog) => {
		count[blog.author] = (count[blog.author] || 0) + 1;
		return count;
	};
	const authorCount = blogs.reduce(authorReducer, {});
	// console.log(authorCount);

	const topAuthorReducer = (count, author) => {
		return authorCount[author] > authorCount[count] ? author : count;
	};

	const topAuthor = Object.keys(authorCount).reduce(topAuthorReducer);
	// console.log(Object.keys(authorCount));
	// console.log(topAuthor);

	return {
		author: topAuthor,
		blogs: authorCount[topAuthor],
	};
};
const mostLikes = (blogs) => {
	const authorReducer = (count, blog) => {
		count[blog.author] = (count[blog.author] || 0) + blog.likes;
		return count;
	};
	const authorCount = blogs.reduce(authorReducer, {});
	// console.log(authorCount);

	const topAuthorReducer = (count, author) => {
		return authorCount[author] > authorCount[count] ? author : count;
	};

	const topAuthor = Object.keys(authorCount).reduce(topAuthorReducer);

	return {
		author: topAuthor,
		likes: authorCount[topAuthor],
	};
};
export {dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes};
