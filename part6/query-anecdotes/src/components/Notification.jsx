import {useNotification} from "../NotificationProvider";

const Notification = () => {
    const {state} = useNotification();

	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1,
		marginBottom: 5,
	};

	if (!state.message) return null;

	return <div style={style.message}></div>;
};

export default Notification;
