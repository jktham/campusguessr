import { pool } from "../../utils/db.js"

export default async function handler(req, res) {
	let floorID = req.body.floorID;
	let building = req.body.building;

	try {
		const result = await pool.query(
			`SELECT floor FROM floor_index WHERE value = ${floorID} AND building = '${building}'`);
		res.json(result.rows[0].floor);
	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
	}

}
