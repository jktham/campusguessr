const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
	user: 'postgres',
	password: 'KvbKnO42KCnRjbiERsAk', // we ball
	host: 'localhost',
	port: 5432,
	database: 'postgres'
})

export default async function handler(req, res) {
	try {
		const result = await pool.query('SELECT * FROM users');
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
	}
}
