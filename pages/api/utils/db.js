const { Pool } = require('pg');

export const pool = new Pool({
	user: 'postgres',
	password: 'KvbKnO42KCnRjbiERsAk', // we ball
	host: 'localhost',
	port: 5432,
	database: 'postgres'
})
