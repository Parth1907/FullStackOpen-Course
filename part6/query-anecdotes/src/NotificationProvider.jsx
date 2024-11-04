import React, {createContext, useContext, useReducer} from "react";

// Create the Notification Context
const NotificationContext = createContext();

// Define the initial state and the reducer function
const initialState = {message: null};

function notificationReducer(state, action) {
	switch (action.type) {
		case "SET_NOTIFICATION":
			return {message: action.payload};
		case "CLEAR_NOTIFICATION":
			return {message: null};
		default:
			return state;
	}
}

// Notification Provider Component
export function NotificationProvider({children}) {
	const [state, dispatch] = useReducer(notificationReducer, initialState);

	// Function to set a notification with a timeout
	const setNotificationWithTimeout = (message, timeout) => {
		dispatch({type: "SET_NOTIFICATION", payload: message});
		setTimeout(() => dispatch({type: "CLEAR_NOTIFICATION"}), timeout);
	};

	return (
		<NotificationContext.Provider value={{state, setNotificationWithTimeout}}>
			{children}
		</NotificationContext.Provider>
	);
}

// Custom hook to use the Notification Context
export const useNotification = () => useContext(NotificationContext);
