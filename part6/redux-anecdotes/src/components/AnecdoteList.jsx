import {useSelector, useDispatch} from "react-redux";
import {addVote} from "../reducers/anecdoteReducer";
import { setNotificationWTimeout } from "../reducers/notificationReducer";

export default function AnecdoteList() {	
	const anecdotes = useSelector(({filter, anecdotes}) => {
		console.log(anecdotes);
			
		if (filter === "ALL") {
			return [...anecdotes].sort(
				(anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes
			);
		}
		return anecdotes.filter((anecdote) =>
			anecdote.content.toLowerCase().includes(filter.toLowerCase())
		);
	});

	const dispatch = useDispatch();

	const vote = (id) => {
		dispatch(addVote(id));
		const anecdoteFound = anecdotes.find((anecdote)=>anecdote.id==id)
		dispatch(setNotificationWTimeout(`You voted ${anecdoteFound.content}`,5000));
	};
	return (
		<div>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
}
