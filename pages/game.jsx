import SEO from '../components/SEO'
import Navigation from '../components/navigation'
import {useState} from 'react'

export default function Home() {

	const [gameState, setGameState] = useState("start")

	return (<div className={"wrapper"}>
		<SEO/>
		<Navigation pageName={"00:00:00"}/>

		<main>

		</main>
	</div>)
}