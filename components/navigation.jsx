import styles from "/styles/navigation.module.css";
import Link from 'next/link'

export default function Navigation({header}) {

	return (
		<>
			<div className={styles.title}>
				<Link href={"/"}><span className={styles.logo}>campusguessr</span></Link>
			</div>
			{header && <div className={styles.header}><h1>{header}</h1></div>}
		</>
	);
}
