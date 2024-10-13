const { Pool } = require('pg');

export const pool = new Pool({
	user: 'postgres',
	password: 'Mmm8KmZhyP807e', // we ball
	host: 'localhost',
	port: 5432,
	database: 'postgres'
})
