import { pool } from "./utils/db.js"

export default async function handler(req, res) {
	
}

function roll(dropchance) {
	roll = Math.random();
	return roll < dropchance;
}