import SEO from '../components/SEO'
import Navigation from '../components/navigation'
import {Bar, Center} from '../components/container'
import {Button, Input} from '../components/control'
import styles from '/styles/leaderboard.module.css'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {

	const { data, isLoading } = useSWR('/api/getUsers', fetcher)
	if (isLoading) return <div>loading</div>

	let data1 = data;
	let data2 = data;
	data1.sort((a, b) => b.high_score - a.high_score)
	data2.sort((a, b) => b.star_currency - a.star_currency)
	console.log(data)

	return <div className={"wrapper"}>
		<SEO/>
		<Navigation header={"Leaderboard"}/>

		<main className={styles.mainlist}>
			<div className={styles.list}>
				{data2.map(user => <div className={styles.user}><p className={styles.usertext}>{user.name}, {user.star_currency}⭐</p></div>)}
			</div>
			<div className={styles.list}>
				{data1.map(user => <div className={styles.user}><p className={styles.usertext}>{user.name}, highscore: {user.high_score}</p></div>)}
			</div>
			<div className={styles.buttons}>
				<Button style={'primary'} onClick={() => {
					gamble("premium");
				}}>&gt; Gamble for 💴</Button>
				<Button style={'primary'} onClick={() => {
					gamble("star");
				}}>&gt; Gamble for ⭐</Button>
			</div>

		</main>
	</div>
}

async function gamble(mode) {

	let gambler1 = {
		username: localStorage.getItem("username"),
		gambling: mode,
		stake: 2
	}

	let res = await fetch(window.location.origin + "/api/gambling", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(gambler1)
	});
	console.log(res);
	res = await res.json().catch((e) => console.error(e));
	console.log(res);
}