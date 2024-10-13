import { pool } from "../../utils/db.js"

export default async function handler(req, res) {
	let username = req.body.username;
	try {
		const result = await pool.query(`SELECT * FROM users WHERE name = '${username}'`);
		res.json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
	}
}
