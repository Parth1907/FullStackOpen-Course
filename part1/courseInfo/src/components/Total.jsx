import React from "react";

export default function Total({parts}) {
	let TotalExercises = 0;
	for (let i = 0; i < parts.length; i++) {
		const exercises = parts[i].exercises;
		TotalExercises += exercises;
	}
	return (
		<div>
			<p>
				No. of exercises{" "}
				{parts[0].exercises + parts[1].exercises + parts[2].exercises}
			</p>
		</div>
	);
}
