import { pool } from "../../utils/db.js";

export default async function handler(req, res) {
    let { floorID, building } = req.body;

    if (!floorID || !building) {
        res.status(400).send('Missing floorID or building in request');
        return;
    }

    try {
        // Use parameterized queries to prevent SQL injection
        const result = await pool.query(
            'SELECT floor FROM floor_index WHERE value = $1 AND building = $2',
            [floorID, building]
        );

        if (result.rowCount > 0) {
            res.json(result.rows[0].floor);
        } else {
            res.status(404).send('Floor not found');
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Internal Server Error');
    }
}
