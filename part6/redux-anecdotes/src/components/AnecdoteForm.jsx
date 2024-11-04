import {useDispatch} from "react-redux";
import {createAnecdote} from "../reducers/anecdoteReducer";
import {setNotificationWTimeout} from "../reducers/notificationReducer";

export default function AnecdoteForm() {
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		e.target.anecdote.value = "";		
		dispatch(createAnecdote(content));
		dispatch(setNotificationWTimeout(`added a new note ${content}`, 5000));
	};

	return (
		<div className="">
			<h2>Create new</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<input name="anecdote" />
				</div>
				<button>create</button>
			</form>
		</div>
	);
}
