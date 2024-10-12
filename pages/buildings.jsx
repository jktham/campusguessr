import SEO from '../components/SEO'
import Navigation from '../components/navigation'
import Card from '../components/card'
import {ItemContainer} from '../components/itemContainer'

export default function Home() {

	return (<div className={"wrapper"}>
		<SEO/>
		<Navigation pageName={"Buildings"}/>

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
	</div>)
}