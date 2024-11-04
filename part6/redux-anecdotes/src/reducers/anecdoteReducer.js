import {createSlice} from "@reduxjs/toolkit";
import noteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		addVote(state, action) {
			const id = action.payload;

			const anecdoteToChange = state.find((s) => s.id === id);

			const changedAnecdote = {
				...anecdoteToChange,
				votes: anecdoteToChange.votes + 1,
			};
			return state.map((anecdote) =>
				anecdote.id !== id ? anecdote : changedAnecdote
			);
		},
		appendAnecdote(state, action) {
			state.push(action.payload);
		},
		setAnecdotes(state, action) {
			return action.payload;
		},
	},
});

export const {addVote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await noteService.getAll();
		dispatch(setAnecdotes(anecdotes));
	};
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await noteService.createAnecdote(content);
		dispatch(appendAnecdote(newAnecdote));
	};
};

export default anecdoteSlice.reducer;

// const anecdoteReducer = (state = initialState, action) => {
// 	console.log("state now: ", state);
// 	console.log("action", action);

// 	switch (action.type) {
// 		case "NEW_ANECDOTE":
// 			return [...state, action.payload];

// 		case "VOTE":
// 			const id = action.payload.id;
// 			const anecdoteToChange = state.find((s) => s.id === id);
// 			const changedAnecdote = {
// 				...anecdoteToChange,
// 				votes: anecdoteToChange.votes + 1,
// 			};
// 			return state.map((anecdote) =>
// 				anecdote.id !== id ? anecdote : changedAnecdote
// 			);

// 		default:
// 			return state;
// 	}
// };

// export const addVote = (id) => {
// 	return {
// 		type: "VOTE",
// 		payload: {id},
// 	};
// };

// export const createAnecdote = (content) => {
// 	return {
// 		type: "NEW_ANECDOTE",
// 		payload: {
// 			content,
// 			id: generateId(),
// 			votes: 0,
// 		},
// 	};
// };

// export default anecdoteReducer;
