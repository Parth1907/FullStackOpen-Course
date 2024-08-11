import React from 'react'

export default function Filter({search, handleSearch}) {
  return (
		<div className="">
			Search name:
			<input
				type="text"
				value={search}
				onChange={handleSearch}
			/>
		</div>
	);
}
