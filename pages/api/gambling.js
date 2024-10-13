import { pool } from "../../utils/db.js"

let PREM_RATE = 0.1;
let STAR_RATE = 0.01;

export default async function handler(req, res) {
	let gambler = {
		name: req.body.username || 0,
		mode: req.body.gambling || "",
		stake: req.body.stake || 0,
		cur: 0,
		starcur: 0
	}

	let answer = {
		played: false,
		won: false
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

		gambler.cur = data.rows[0].currency;
		gambler.starcur = data.rows[0].premium_currency;

	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
	}

	// Mode win premium coin
	if (gambler.mode == 'premium') {
	// The gambling mechanics

		// Check if there is enough coin
		if (gambler.cur < gambler.stake) {
			res.status(200).json(answer);
			return;
		} else {
			// Remove money
			answer.played = true;
			try {
				await pool.query(
					`UPDATE users SET currency = currency - ${gambler.stake} WHERE name = '${gambler.name}'`);
			} catch (err) {
				console.error(err);
				res.status(500).send('Internal Server Error');
				return;
			}
			// Check for win
			if (roll(PREM_RATE)) {
				answer.won = true;

				// double win
				if (gambler.stake > 5) {
					gambler.stake *= 2;
				}

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
	} 
	// Mode to win star_coin
	else if (gambler.mode == 'star') {

		// Check if there is enough premium coin
		if (gambler.starcur < gambler.stake) {
			res.status(200).json(answer);
			return;
		} else {
		// The gambling mechanics

			// Remove money
			answer.played = true;
			try {
				await pool.query(
					`UPDATE users SET premium_currency = premium_currency - ${gambler.stake} WHERE name = '${gambler.name}'`);
			} catch (err) {
				console.error(err);
				res.status(500).send('Internal Server Error');
				return;
			}
			// Check for win
			if (roll(STAR_RATE)) {
				answer.won = true;

				// double win
				if (gambler.stake > 5) {
					gambler.stake *= 2;
				}
				try {
					await pool.query(
						`UPDATE users SET star_currency = star_currency + ${gambler.stake} WHERE name = '${gambler.name}'`);
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