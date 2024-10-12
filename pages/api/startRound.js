import { pool } from "../../utils/db.js"

export default async function handler(req, res) {
	let mode = {
		buildings: req.body.buildings || ["HG"],
		floors: req.body.floors || ["all"]
	}

	let round = {
		image_id: 0 // pick random image
	}

	res.status(200).json(round);
}
