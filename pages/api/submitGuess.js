import { pool } from "../../utils/db.js"

let MAX_POINTS = 10000;
let MISS_PENATLY = 1000;

export default async function handler(req, res) {

	// guess that is received
	let guess = {
		image_id: req.body.image_id || 0,
		building: req.body.building || "",
		floor: req.body.floor || "",
		x: req.body.x || 0,
		y: req.body.y || 0
	}

	// add points to user (need user_id)

	// get true location:
	let location = {
		image_id: 0,
		x: 0,
		y: 0,
		building: "",
		floor: ""
	}

	guessID = 0;
	trueID = 0;

	// Get correct values and floor index of guess
	try {
		const result = await pool.query(
			`SELECT * FROM image_map where image_id = ${guess.image_id}`);

		const floorID_guess = await pool.query(
			`SELECT value FROM floor_index WHERE building = ${guess.building} AND floor = ${guess.floor}`
		);
		
		location = result.rows[0];

		const floorID_true = await pool.query(
			`SELECT value FROM floor_index WHERE building = ${location.building} AND floor = ${location.floor}`
		);

		if (result.rowCount != 1 || floorID_guess.rowCount == 0 || floorID_true.rowCount == 0) {
			console.error("MISSING DB ENTRY");
			return;
		}

		guessID = floorID_guess.rows[0].value;
		trueID = floorID_true.rows[0].value;

	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
	}
	
	// Calculate points
	let answer = {
		your_guess: guess,
		actual_location: location,
		points: MAX_POINTS
	}

	answer.points -= calcPoints(answer.your_guess, answer.actual_location, guessID, trueID);

	res.status(200).json(answer);
}

function calcPoints(guess, actual, guessID, trueID) {

	deduct = 0;

	// 0 points if wrong building
	if (guess.building != actual.building) return MAX_POINTS;

	// squared mean error
	deduct = Math.sqrt(Math.pow(guess.x - actual.x, 2) + Math.pow(guess.y - actual.y, 2));

	// Floor penalty
	deduct += Math.abs(guessID - trueID) * MISS_PENATLY;

	// Cant exceed MAX_POINTS
	if (deduct > MAX_POINTS) deduct = MAX_POINTS;

	return deduct;
}

