import SEO from '../components/SEO'
import Navigation from '../components/navigation'
import {Center} from '../components/container'
import styles from '/styles/leaderboard.module.css'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {

	const { data, isLoading } = useSWR('/api/getUsers', fetcher)
	if (isLoading) return <div>loading</div>

	data.sort((a, b) => b.high_score - a.high_score)
	console.log(data)

	return <div className={"wrapper"}>
		<SEO/>
		<Navigation header={"Leaderboard"}/>

		<main>
			<div className={styles.list}>
				{data.map(user => <div className={styles.user}><p className={styles.usertext}>{user.name}, highscore: {user.high_score}, score: {user.score}</p></div>)}
			</div>
		</main>
	</div>
}