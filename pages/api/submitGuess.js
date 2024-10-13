import { pool } from "../../utils/db.js"

let MAX_POINTS = 1000.0;
let MISS_PENATLY = 100.0;
let SCALE_FACTOR = 0.35;
let CURRENCY_RATE = 100;

export default async function handler(req, res) {

	// guess that is received
	let guess = {
		image_id: req.body.image_id || 0,
		building: req.body.building || "",
		floor: req.body.floor || 0,
		x: req.body.x || 0,
		y: req.body.y || 0,
		username: req.body.username,
		time: req.body.time || 0
	}

	// todo: include time in score calculation

	// get true location:
	let location;

	// Get correct values and floor index of guess
	try {
		const result = await pool.query(
			`SELECT * FROM image_map where image_id = '${guess.image_id}'`);

		if (result.rowCount != 1) {
			console.error("MISSING DB ENTRY");
			res.status(500).send('Internal Server Error');
			return;
		}
		
		location = result.rows[0];
		// console.log(location);

	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
		return;
	}

	// Response
	let answer = {
		your_guess: guess,
		actual_location: location,
		distance: 0,
		new_highscore: false,
		points: MAX_POINTS,
		earned: 0
	}

	answer.points -= calcPoints(guess, location, answer);
	answer.earned = answer.points / CURRENCY_RATE;

	// Add to score
	try {
		// getting highscore value
		let highscore = await pool.query(
			`SELECT high_score FROM users WHERE name = '${guess.username}'`);

		// dirty fix
		if (isNaN(answer.points)) {
			answer.points = Math.random() * 100;
		}
		if (isNaN(answer.earned)) {
			answer.earned = Math.random() * 100;
		}
		
		// update highscore
		if (answer.points >= highscore.rows[0].high_score + 0.0001) {
			answer.new_highscore = true;
			await pool.query(
			`UPDATE users SET high_score = ${answer.points} WHERE name = '${guess.username}'`);
		}

		// increment score
		await pool.query(
			`UPDATE users SET score = score + ${answer.points} WHERE name = '${guess.username}'`);

		// increment MONEY
		await pool.query(
			`UPDATE users SET currency = currency + ${answer.earned} WHERE name = '${guess.username}'`);
		
	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
		return;
	}

	res.status(200).json(answer);
}

function calcPoints(guess, actual, answer) {

	let deduct = 0.0;

	// 0 points if wrong building
	if (guess.building != actual.building) return MAX_POINTS;

	// squared mean error
	deduct = Math.sqrt(
		(guess.x - actual.x_coord) * (guess.x - actual.x_coord) + 
		(guess.y - actual.y_coord) * (guess.y - actual.y_coord));

	// store distance
	answer.distance = deduct / 17;
	// store distance

	deduct = deduct * SCALE_FACTOR;

	// Floor penalty
	deduct += Math.abs(guess.floor - actual.value) * MISS_PENATLY;

	// Cant exceed MAX_POINTS
	if (deduct > MAX_POINTS) deduct = MAX_POINTS;

	return deduct;
}

