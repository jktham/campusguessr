import styles from "/styles/game.module.css";
import SEO from '../components/SEO'
import Navigation from '../components/navigation'
import {useEffect, useState} from 'react'
import {Center} from '../components/container'
import {Button} from '../components/control'
import {useSearchParams} from 'next/navigation'

export default function Home() {

	const searchParams = useSearchParams()

	const [gameState, setGameState] = useState("start")
	const [image, setImage] = useState("")
	const [time, setTime] = useState(0)
	const [points, setPoints] = useState(0)
	const [distance, setDistance] = useState(0)
	const building = searchParams.get("building") || "", floor = (searchParams.get("floor") ?? "");
	const map = building + " " + floor

	const format = time => {
		const minutes = Math.floor((time % 360000) / 6000);
		const seconds = Math.floor((time % 6000) / 100);
		const milliseconds = time % 100;
		return minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0') + ":" + milliseconds.toString().padStart(2, '0');
	}

	useEffect(() => {
		let intervalId;
		if (gameState === "running") {
			intervalId = setInterval(() => setTime(time + 1), 10);
		}
		return () => clearInterval(intervalId);
	}, [gameState === "running", time]);

	const onStart = async () => {
		let res = await startRound();
		setImage(res.image_filepath.split("./public")[1])
		setGameState('running');
	}

	const onGuess = async () => {
		let res = await submitGuess();
		setPoints(Math.round(res.points));
		setDistance(Math.round(res.distance));
		setGameState('end');
	}

	return (<div className={"wrapper"}>
		<SEO/>
		<Navigation header={gameState === "running" && format(time)}/>

		<main>
			{gameState === "start" &&
				<div className={styles.scores}>
					<header className={styles.header}>00:00:00</header>
					<div className={styles.meta}>
						<p><span>map</span><span>:</span><span>{map}</span></p>
					</div>
					<Button style={'primary'} onClick={onStart}>&gt; start</Button>
				</div>
			}

			{gameState === 'running' && <Center>
				<div className={styles.container}>
					<img className={styles.image} src={image}></img>
					<Button style={'primary'} onClick={onGuess}>&gt; submit</Button>
				</div>
			</Center>}

			{gameState === "end" && <Center>
				<div className={styles.scores}>
					<header className={styles.header}>{points} pts 🎉</header>
					<div className={styles.meta}>
						<p><span>map</span><span>:</span><span>{map}</span></p>
						<p><span>time</span><span>:</span><span>{format(time)}</span></p>
						<p><span>distance</span><span>:</span><span>{distance}</span></p>
					</div>
					<Button style={'primary'} href={"/leaderboard"}>&gt; leaderboard</Button>
				</div>
			</Center>}
		</main>
	</div>)
}

async function startRound() {
	const urlParams = new URLSearchParams(window.location.search);

	let mode = {
		buildings: urlParams.get('building'),
		floors: urlParams.get('floor')
	}

	let res = await fetch(window.location.origin + "/api/startRound", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(mode)
	});
	console.log(res);

	res = await res.json().catch((e) => console.error(e));
	console.log(res);

	// image file:
	console.log(window.location.origin + res.image_filepath.split("./public")[1])

	return res;
}

async function submitGuess() {
	let guess = { // todo: fill in all of these with real values
		image_id: 1,
		building: "HG",
		floor: 6,
		x: 200,
		y: 200,
		username: localStorage.getItem("username"),
		time: 60
	}

	if (!guess.username) {
		console.log("not logged in")
		return
	}

	let res = await fetch(window.location.origin + "/api/submitGuess", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(guess)
	});
	console.log(res);

	res = await res.json().catch((e) => console.error(e));
	console.log(res);

	// todo: display results
	return res;
}
