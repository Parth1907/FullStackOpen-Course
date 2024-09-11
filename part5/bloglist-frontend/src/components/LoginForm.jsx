export default function loginForm({
	handleLogin,
	username,
	setUsername,
	password,
	setPassword,
}) {
	return (
		<div>
			<h2>Log in to application</h2>
			<form onSubmit={handleLogin}>
				<div className="">
					username
					<input
						type="text"
						value={username}
						name="username"
						data-testid="username"
						onChange={({target}) => setUsername(target.value)}
					/>
				</div>
				<div className="">
					password
					<input
						type="password"
						value={password}
						name="password"
						data-testid="password"
						onChange={({target}) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	);
}
