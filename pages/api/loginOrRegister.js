import { pool } from "../../utils/db.js"

export default async function handler(req, res) {
	let user = {
		name: req.body.name || "",
		password: req.body.password || ""
	}

	// todo: sanitize input :3
	// todo: hash password

	try {
		const result = await pool.query(`SELECT * FROM users WHERE name = '${user.name}'`);
		if (result.rowCount == 1) { // user exists
			const result = await pool.query(`SELECT * FROM users WHERE name = '${user.name}' AND password = '${user.password}'`);
			if (result.rowCount == 1) { // correct password
				res.status(200).send(`correct password for ${user.name}`);
			} else {
				res.status(401).send(`wrong password`);
			}
		} else { // create user
			const result = await pool.query(`INSERT INTO users(name, password) VALUES('${user.name}', '${user.password}')`);
			res.status(200).send(`created user ${user.name}`);
		}

	} catch (err) {
		console.error(err);
		res.status(500).send(`Internal server error`);
	}
}
