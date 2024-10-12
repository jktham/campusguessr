import SEO from '../components/SEO'
import Navigation from '../components/navigation'
import {Center} from '../components/container'
import {Input, Button} from '../components/control'

export default function Home() {

	return ( <div className={"wrapper"}>
		<SEO />
		<Navigation/>

		<main>
			<Center>
				<form className={"form"} action=""> {/* TODO: jonas do this idk how forms work */}
					<Input style={"secondary"} placeholder={"> username"}></Input>
					<Input style={"secondary"} type={"password"} placeholder={"> password"}></Input>
					<Button style={"primary"} href={"/select"}>&gt; play</Button>
				</form>
			</Center>
		</main>
	</div> )
}