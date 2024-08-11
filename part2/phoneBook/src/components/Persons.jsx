import React from "react";

export default function Persons({persons, handleDelete}) {
	return (
		<div>
			<table>
				<body>
					{persons.map((person) => (
						<tr>
							<td key={person.id}>
								{person.name}
							</td>
							<td>{person.number}</td>
							<td>
								<button onClick={() => handleDelete(person.id, person.name)}>
									delete
								</button>
							</td>
						</tr>
					))}
				</body>
			</table>
		</div>
	);
}
