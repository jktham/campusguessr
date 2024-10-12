import styles from "/styles/control.module.css";
import clsx from 'clsx'
import Link from 'next/link'

export function Button({ href, target, onClick, children, style }) {

	return href ? (
		<>
			<Link href={href} target={target} className={clsx(styles.element, styles[style], "controls border")} onClick={onClick}>
				{children}
			</Link>
		</>
	) : (
		<>
			<button className={clsx(styles.element, styles[style], "controls border")} onClick={onClick}>
				{children}
			</button>
		</>
	)
}

export function Input({onEnter, style, type, placeholder }) {

	const onKeyDown = (e) => {
		if (e.key === "Enter" && onEnter) onEnter(e.target.value);
	}

	return (
		<>
			<div className={clsx(styles.element, styles[style], "controls border")}>
				<input type={type ?? "text"} onKeyDown={onKeyDown} className={"controls"} placeholder={placeholder}/>
			</div>
		</>
	)
}
