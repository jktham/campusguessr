import { pool } from "../../utils/db.js"

export default async function handler(req, res) {
	let round = {
		image_id: 0
	}

	res.status(200).json(round);
}
