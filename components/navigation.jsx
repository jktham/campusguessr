import styles from "/styles/navigation.module.css";
import Link from 'next/link'

export default function Navigation({header}) {

	const username = "serpentine";
	const score = "3000";

	return (
		<>
			<div className={styles.title}>
				<Link href={"/"}><span className={styles.logo}>campusguessr</span></Link>
			</div>
			{header && <div className={styles.header}><h1>{header}</h1></div>}
			<div className={styles.footer}>
				{/*<p>user : {username ?? "-"}</p>
				<p>score : {score ?? "-"}</p>*/}
				<p>{username} // {score}</p>
			</div>
		</>
	);
}
