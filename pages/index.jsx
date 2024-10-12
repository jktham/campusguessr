import SEO from '../components/SEO'
import Navigation from '../components/navigation'
import {Center, ItemContainer} from '../components/container'
import {Input, Button} from '../components/control'
import {useState} from 'react'
import Card from '../components/card'

export default function Home() {

	const [user, setUser] = useState(undefined)
	const [building, setBuilding] = useState(false)
	const [floor, setFloor] = useState(false)

	return user ? <div className={"wrapper"}>
		<SEO/>
		<Navigation header={"Buildings"}/>

		<main>
			<ItemContainer>
				<Card data={{code: "ALL"}}></Card>
				<Card></Card>
				<Card></Card>
				<Card></Card>
				<Card></Card>
				<Card></Card>
				<Card></Card>
				<Card></Card>
				<Card></Card>
			</ItemContainer>
		</main>
	</div> : <div className={"wrapper"}>
		<SEO/>
		<Navigation/>

		<main>
			<Center>
				<form className={"form"} action=""> {/* TODO: jonas do this idk how forms work */}
					<Input style={"secondary"} placeholder={"> username"}></Input>
					<Input style={"secondary"} type={"password"} placeholder={"> password"}></Input>
					<Button style={"primary"} onClick={() => setUser("serpentine")}>&gt; play</Button>
				</form>
			</Center>
		</main>
	</div>
}