import { pool } from "../../utils/db.js"

export default async function handler(req, res) {
	let guess = {
		image_id: req.body.image_id || 0,
		building: req.body.building || "",
		floor: req.body.floor || "",
		x: req.body.x || 0,
		y: req.body.y || 0
	}

	// do db stuff
	// compare guess to location
	// calculate points
	// add points to user

	let location = {
		image_id: 0,
		building: "",
		floor: "",
		x: 0,
		y: 0
	}
	
	let answer = {
		your_guess: guess,
		actual_location: location,
		points: 9999
	}

	res.status(200).json(answer);
}