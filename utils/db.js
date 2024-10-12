const { Pool } = require('pg');

export const pool = new Pool({
	user: 'postgres',
	password: 'KvbKnO42KCnRjbiERsAk', // we ball
	host: '09-direct.viscon-hackathon.ch',
	port: 5432,
	database: 'postgres'
})
