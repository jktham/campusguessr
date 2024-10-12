import SEO from '../components/SEO'
import Navigation from '../components/navigation'
import {Center} from '../components/container'

export default function Home() {


	return <div className={"wrapper"}>
		<SEO/>
		<Navigation header={"Leaderboard"}/>

		<main>
			<Center>
				<p>TODO</p>
			</Center>
		</main>
	</div>
}