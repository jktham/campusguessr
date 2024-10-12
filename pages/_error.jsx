import SEO from "/components/SEO"
import Navigation from "/components/navigation"
import {Center} from '../components/container'

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	return { statusCode }
}

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