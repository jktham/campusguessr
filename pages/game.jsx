import styles from "/styles/game.module.css";
import SEO from '../components/SEO'
import Navigation from '../components/navigation'
import {useEffect, useState} from 'react'
import {Center} from '../components/container'
import {Button} from '../components/control'

export default function Home() {

	const [gameState, setGameState] = useState("start")
	const [time, setTime] = useState(0)
	const [points, setPoints] = useState(0)
	const [distance, setDistance] = useState(0)
	const map = "HG E"

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
					<Button style={'primary'} onClick={() => setGameState('running')}>&gt; start</Button>
				</div>
			}

			{gameState === 'running' && <Center>
				<Button style={'primary'} onClick={() => setGameState('end')}>&gt; stop</Button>
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