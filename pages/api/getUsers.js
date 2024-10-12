import { pool } from "./utils/db.js"

export default async function handler(req, res) {
	try {
		const result = await pool.query('SELECT * FROM users');
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
	}
}
