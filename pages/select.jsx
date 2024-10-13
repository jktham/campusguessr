import SEO from '../components/SEO'
import Navigation from '../components/navigation'
import {Center, ItemContainer} from '../components/container'
import {useState} from 'react'
import Card from '../components/card'
import useSWR from 'swr'
import {useRouter} from 'next/router'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Select() {

	const router = useRouter()

	const [building, setBuilding] = useState(undefined)
	const [floor, setFloor] = useState(undefined)
	const { data: buildings } = useSWR('/api/getBuildings', fetcher);
	const { data: floors } = useSWR(building ? '/api/getFloors?building=' + building : null, fetcher);

	if (building === "ALL" || building && floor) router.push("/game?building=" + building + (floor ? "&floor=" + floor : ""));

	return <div className={"wrapper"}>
		<SEO/>
		<Navigation header={building ? "Floors" : "Buildings"}/>

		<main>
			<ItemContainer>
				{building ? floors?.map(b => <Card onClick={setFloor} data={b}></Card>)
					: buildings?.map(b => <Card onClick={setBuilding} data={b}></Card>)}
			</ItemContainer>
		</main>
	</div>
}