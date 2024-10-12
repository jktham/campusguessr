import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Page() {

	const { data, isLoading } = useSWR('/api/getUsers', fetcher)
	if (isLoading) return <div>loading</div>

	console.log(data)
	return (
		<div>
			<h1>got {data.length} users</h1>
			<button onClick={submitGuess}>Submit guess</button>
			<button onClick={createUser}>Create user</button>
			<button onClick={startRound}>Start round</button>
		</div>
	)
	
}

async function submitGuess() {
	let guess = {
		image_id: 4,
		building: "hg",
		floor: "f",
		x: 100,
		y: 200
	}

	let res = await fetch(window.location.origin + "/api/submitGuess", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(guess)
	});
	console.log(res);

	res = await res.json().catch((e) => console.error(e));
	console.log(res);
}

async function createUser() {
	let user = {
		name: prompt("enter username"),
		password: prompt("enter password")
	}

	if (!user.name || !user.password) {
		console.log("empty name or password")
		return;
	}

	let res = await fetch(window.location.origin + "/api/createUser", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(user)
	});
	console.log(res);
}

async function startRound() {
	let res = await fetch(window.location.origin + "/api/startRound", {
		method: "GET"
	});
	console.log(res);

	res = await res.json().catch((e) => console.error(e));
	console.log(res);
}
