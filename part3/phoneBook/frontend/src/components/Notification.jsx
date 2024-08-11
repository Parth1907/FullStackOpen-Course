import React from "react";

export default function Notification({message, hasError}) {
	if (message === null) {
		return null;
	}
	const messageStyle = {
		color: hasError ? "red" : "green",
		background: "lightgrey",
		fontSize: "20px",
		borderStyle: "solid",
		borderRadius: "5px",
		padding: "10px",
		marginBottom: "10px",
	};
	return (
		<div className="">
			<div style={messageStyle}>{message}</div>
		</div>
	);
}
