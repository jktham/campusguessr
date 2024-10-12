import { pool } from "./utils/db.js"

export default async function handler(req, res) {
	let gambler_stake = {
		user: req.body.userID || 0,
		stake: req.body.star || 0,
		drop: req.body.dropID || "",
		dropchance: 0
	}

	// Get dropchance
	try {
		const result = await pool.query(
			`SELECT * FROM drops where drop_id = '${gambler_stake.drop}'`);

		if (result.rowCount != 1) {
			console.error("MISSING DB ENTRY");
			return;
		}
		
		gambler_stake.dropchance = result.rows[0].dropchance;
		// console.log(location);

	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
	}

	if (gambler_stake.stake > 0) {
		gambler_stake.dropchance *= 4;
	}

	res.status(200).json(roll(gambler_stake.dropchance));
}

function roll(dropchance) {
	roll = Math.random();
	return roll < dropchance;
}