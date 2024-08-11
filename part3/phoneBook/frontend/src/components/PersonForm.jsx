import React from "react";

export default function PersonForm({
	name,
	phone,
	handleSubmit,
	handleName,
	handlePhone,
}) {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<div className="">
						name:
					<input value={name} onChange={handleName} />
				</div>
				<div className="">
						phone:
					<input value={phone} onChange={handlePhone} />
				</div>
				<button type="submit">add</button>
			</div>
		</form>
	);
}
