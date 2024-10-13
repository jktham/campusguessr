import SEO from '../components/SEO'
import Navigation from '../components/navigation'
import {Bar, Center, ItemContainer} from '../components/container'
import {Input, Button} from '../components/control'
import {useEffect, useState} from 'react'
import styles from '../styles/game.module.css'


export default function Select() {

	const [user, setUser] = useState("serpentine")
	const [score, setScore] = useState(0)

	useEffect(() => {
		const l = window.localStorage.getItem("username")
		if (!user && l) setUser(l)
	}, []);

	async function onSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget)

		let user = {
			name: formData.get("username") + "",
			password: formData.get("password") + "",
		}

		if (!user.name || !user.password || user.password.length < 8) {
			console.log("empty name or password too short") // TODO: proper feedback
			return;
		}

		let res = await fetch(window.location.origin + "/api/loginOrRegister", {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(user)
		});

		if (res.status == 200) {
			localStorage.setItem("username", user.name);
			localStorage.setItem("password", user.password);
			setUser(user.name)
		}
	}

	return <div className={"wrapper"}>
		<SEO/>
		<Navigation/>

		<main>
			{ user ? <Center>
				<div className={styles.scores}>
					<header className={styles.header}>{user}</header>
					<div className={styles.meta}>
						<p><span>score</span><span>:</span><span>{score ?? "-"}</span></p>
					</div>
					<Bar>
						<Button style={'primary'} href={"/select"}>&gt; play</Button>
						<Button style={'secondary'} onClick={() => {
							localStorage.removeItem("username");
							localStorage.removeItem("password");
							setUser(undefined)
						}}>&gt; logout</Button>
					</Bar>
				</div>
			</Center> : <Center>
				<form className={"form"} onSubmit={onSubmit}>
					<Input name={"username"} style={"secondary"} placeholder={"> username"}></Input>
					<Input name={"password"} style={"secondary"} type={"password"} placeholder={"> password"}></Input>
					<Button style={"primary"}>&gt; play</Button>
				</form>
			</Center>}
		</main>
	</div>
}