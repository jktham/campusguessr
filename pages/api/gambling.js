import { pool } from "../../utils/db.js"

let PREM_RATE = 0.1;
let STAR_RATE = 0.001;

export default async function handler(req, res) {
	let gambler = {
		name: req.body.username || 0,
		mode: req.body.gambling || "",
		stake: req.body.stake || 0,
		cur: 0,
		starcur: 0
	}

	// Get DATA
	try {
		const data = await pool.query(
			`SELECT currency, premium_currency FROM users WHERE name = '${gambler.name}'`);

		if (data.rowCount != 1) {
			console.error("MISSING DB ENTRY");
			res.status(500).send('Internal Server Error');
			return;
		}

		gambler.cur = data.rows[0].premium_currency;
		gambler.starcur = data.rows[0].star_currency;

	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
	}

	let answer = {
		played: false,
		won: false
	}

	if (gambler.mode = "premium") {
		if (gambler.cur < gambler.stake) {
			res.status(200).json(answer);
			return;
		} else {
			answer.played = true;
			try {
				await pool.query(
					`UPDATE users SET currency = currency - ${gambler.stake} WHERE name = '${gambler.name}'`);
			} catch (err) {
				console.error(err);
				res.status(500).send('Internal Server Error');
				return;
			}
			if (roll(PREM_RATE)) {
				answer.won = true;
				try {
					await pool.query(
						`UPDATE users SET premium_currency = premium_currency + ${gambler.stake} WHERE name = '${gambler.name}'`);
				} catch (err) {
					console.error(err);
					res.status(500).send('Internal Server Error');
					return;
				}
			}
		}
	} else if (gambler.mode = "star") {
		if (gambler.starcur < gambler.stake) {
			res.status(200).json(answer);
			return;
		} else {
			answer.played = true;
			try {
				await pool.query(
					`UPDATE users SET currency = currency - ${gambler.stake} WHERE name = '${gambler.name}'`);
			} catch (err) {
				console.error(err);
				res.status(500).send('Internal Server Error');
				return;
			}
			if (roll(STAR_RATE)) {
				answer.won = true;
				try {
					await pool.query(
						`UPDATE users SET star_currency = star_currency + ${gambler.stake} WHERE name = '${gambler.name}'`);
					await pool.query(
						`UPDATE users SET premium_currency = premium_currency - ${gambler.stake} WHERE name = '${gambler.name}'`);
				} catch (err) {
					console.error(err);
					res.status(500).send('Internal Server Error');
					return;
				}
			}
		}
	} else {
		console.error(err);
		res.status(500).send('No such gambling mode');
	}

	res.status(200).json(answer);
}

function roll(dropchance) {
	let roll = Math.random();
	return roll < dropchance;
}