import { pool } from "../../utils/db.js"

export default async function handler(req, res) {
	let user = {
		name: req.body.name || "",
		password: req.body.password || ""
	}

	// todo: hash password

	try {
		const result = await pool.query(`SELECT * FROM users WHERE name = '${user.name}' AND password = '${user.password}'`);
		if (result.rowCount == 1) {
			res.status(200).send(`correct password for ${user.name}`);
		} else {
			res.status(401).send(`wrong username or password`);
		}

	} catch (err) {
		console.error(err);
		res.status(500).send(`Internal server error`);
	}
}
