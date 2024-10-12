import { pool } from "../../utils/db.js"

let MAX_POINTS = 1000.0;
let MISS_PENATLY = 100.0;
let SCALE_FACTOR = 1;

export default async function handler(req, res) {

	// guess that is received
	let guess = {
		image_id: req.body.image_id || 0,
		building: req.body.building || "",
		floor: req.body.floor || 0,
		x: req.body.x || 0,
		y: req.body.y || 0
	}

	// add points to user (need user_id)

	// get true location:
	let location;

	let guessID = 0;

	// Get correct values and floor index of guess
	try {
		const result = await pool.query(
			`SELECT * FROM image_map where image_id = '${guess.image_id}'`);

		if (result.rowCount != 1) {
			console.error("MISSING DB ENTRY");
			return;
		}
		
		location = result.rows[0];
		// console.log(location);

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

	answer.points -= calcPoints(guess, location);

	res.status(200).json(answer);
	console.log("You got " + answer.points + "!");
}

function calcPoints(guess, actual) {

	let deduct = 0.0;

	// 0 points if wrong building
	if (guess.building != actual.building) return MAX_POINTS;

	// squared mean error
	deduct = Math.log2(Math.sqrt(
		(guess.x - actual.x_coord) * (guess.x - actual.x_coord) + 
		(guess.y - actual.y_coord) * (guess.y - actual.y_coord)));
	deduct *= SCALE_FACTOR;

	// Floor penalty
	deduct += Math.abs(guess.floor - actual.value) * MISS_PENATLY;

	// Cant exceed MAX_POINTS
	if (deduct > MAX_POINTS) deduct = MAX_POINTS;

	return deduct;
}

