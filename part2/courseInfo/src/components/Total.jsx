import React from "react";

export default function Total({parts}) {
	const total = parts.reduce((total, part) => total + part.exercises, 0);

	return (
		<div>
			<p>Total No. of exercises {total}</p>
		</div>
	);
}
