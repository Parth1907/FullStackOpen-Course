import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createAnecdote} from "../requests";
import {useNotification} from "../NotificationProvider.jsx";

const AnecdoteForm = () => {
	const queryClient = useQueryClient();
	const {setNotificationWithTimeout} = useNotification();

	const newAnecdoteMutation = useMutation({
		mutationFn: createAnecdote,
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueriesData(["anecdotes"]);
			queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
		},
		onError: () => {
			setNotificationWithTimeout(
				"Failed to create anecdote. Please try again.",
				5000
			);
		},
	});

	const onCreate = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		if (content.length < 5) {
			setNotificationWithTimeout(
				"Anecdote is too short. Must be at least 5 characters.",
				3000
			);
			return;
		}
		event.target.anecdote.value = "";
		newAnecdoteMutation.mutate({content, votes: 0});
		setNotificationWithTimeout(`added a new note ${content}`, 5000);
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
