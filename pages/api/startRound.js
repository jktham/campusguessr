import { pool } from "../../utils/db.js"

export default async function handler(req, res) {
	let mode = {
		buildings: req.body.buildings.toUpperCase() || "HG",
		floors: req.body.floors || "all"
	}

	try {
		let imageMapRes = await pool.query(`SELECT * FROM image_map WHERE building = '${mode.buildings}'`);
		let randomImage = imageMapRes.rows[Math.floor(Math.random()*imageMapRes.rowCount)]

		let imageRes = await pool.query(`SELECT * FROM image WHERE image_id = '${randomImage.image_id}'`);
		let filepath = imageRes.rows[0].image_filepath

		let image = {
			image_id: randomImage.image_id,
			building: randomImage.building,
			image_filepath: filepath
		}

		res.status(200).json(image);
		return;
		
	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
	}

	res.status(500).send('Internal Server Error');
}
