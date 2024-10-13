import SEO from '../components/SEO'
import Navigation from '../components/navigation'
import {Center, ItemContainer} from '../components/container'
import {Input, Button} from '../components/control'
import {useState} from 'react'
import Card from '../components/card'
import useSWR from 'swr'
import {useRouter} from 'next/router'
import React from 'react'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {

	const router = useRouter()

	const [user, setUser] = useState(undefined)
	const [building, setBuilding] = useState(undefined)
	const [floor, setFloor] = useState(undefined)
	const { data: buildings } = useSWR(user ? '/api/getBuildings' : null, fetcher);
	const { data: floors } = useSWR(building && building !== "ALL" ? '/api/getFloors?building=' + building : null, fetcher);


	if (!user) return <div className={"wrapper"}>
		<SEO/>
		<Navigation/>

		<main>
			<Center>
				<form className={"form"} action="" onSubmit={(e) => e.preventDefault()}> {/* TODO: jonas do this idk how forms work */} 
					<Input style={"secondary"} placeholder={"> username"}></Input>
					<Input style={"secondary"} type={"password"} placeholder={"> password"}></Input>
					<Button style={"primary"} onClick={async () => {await login(); setUser(localStorage.getItem("username"))}}>&gt; play</Button>
				</form>
			</Center>
		</main>
	</div>

	if (building === "ALL" || building && floor) router.push("/game?building=" + building + "&floor=" + floor);

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

async function login() {
	let user = { // todo: get from form, idk how react works >_< aaaa
		name: prompt("enter username"),
		password: prompt("enter password")
	}

	if (!user.name || !user.password || user.password.length < 8) {
		alert("empty name or password too short")
		return;
	}

	let res = await fetch(window.location.origin + "/api/loginOrRegister", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(user)
	});
	console.log(res);

	if (res.status == 200) {
		console.log(user)
		localStorage.setItem("username", user.name);
		localStorage.setItem("password", user.password);
	} else {
		alert("wrong password")
	}
}