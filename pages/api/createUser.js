import { pool } from "../../utils/db.js"

export default async function handler(req, res) {
	let user = {
		name: req.body.name || "",
		password: req.body.password || ""
	}

	// todo: sanitize input :3
	// todo: hash password

	try {
		const result = await pool.query(`INSERT INTO users(name, password) VALUES('${user.name}', '${user.password}')`);
		res.status(200).send(`created user ${user.name}`);

	} catch (err) {
		console.error(err);
		res.status(500).send(`user ${user.name} could not be created`);
	}
}
