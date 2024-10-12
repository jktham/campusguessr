import styles from "/styles/container.module.css";

export function Center({children}) {
	return (
		<>
			<div className={styles.center}>
				{children}
			</div>
		</>
	)
}

export function ItemContainer({children}) {
	return (
		<>
			<div className={styles.itemContainer}>
				{children}
			</div>
		</>
	)
}

export function Bar({children}) {
	return (
		<>
			<div className={styles.bar}>
				{children}
			</div>
		</>
	)
}
