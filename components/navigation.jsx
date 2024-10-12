import styles from "/styles/navigation.module.css";

export default function Navigation({pageName}) {

	const username = undefined;
	const score = undefined;

	return (
		<>
			<div className={styles.title}>
				<span className={styles.logo}>campusguessr</span>
			</div>
			{pageName && <div className={styles.header}><h1>{pageName}</h1></div>}
			<div className={styles.footer}>
				<p>user : {username ?? "-"}</p>
				<p>score : {score ?? "-"}</p>
			</div>
		</>
	);
}
