import SEO from "/components/SEO"
import Navigation from "/components/navigation"
import {Center} from '../components/container'

export default function Error({ statusCode }) {

	return ( <div className={"wrapper"}>
		<SEO />
		<Navigation/>

		<main>
			<Center>
				<p>404</p>
			</Center>
		</main>
	</div> )
}