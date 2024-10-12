import styles from "/styles/card.module.css";
import clsx from 'clsx'
import {Bar} from './container'
import Link from 'next/link'


export default function Card({data}) {
	return (
		<Link href={"/game"}>
			<div className={clsx(styles.card, "border")}>
				<header className={styles.header}>{data?.code ?? "N/A"}</header>
				<Bar>
					<span className={"controls"}>20 pts</span>
					<span className={"controls"}>-&gt;</span>
				</Bar>
			</div>
		</Link>
	)
}
