import { pool } from "../../utils/db.js";
export default async function handler(req, res) {
    const limit = req.query.limit || 100; // Limit the number of results
    const offset = req.query.offset || 0; // Pagination support

    try {
        // Use a parameterized query with LIMIT and OFFSET for pagination
        const result = await pool.query(
            'SELECT * FROM users LIMIT $1 OFFSET $2',
            [limit, offset]
        );
        
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
