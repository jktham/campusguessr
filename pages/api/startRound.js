import { pool } from "../../utils/db.js";

export default async function handler(req, res) {
    // Get the building and floors from request
    const mode = {
        buildings: req.body.buildings ? req.body.buildings.toUpperCase() : "HG",
        floors: req.body.floors || "all"
    };

    try {
        // Use parameterized queries to prevent SQL injection
        const imageMapRes = await pool.query('SELECT * FROM image_map WHERE building = $1', [mode.buildings]);

        if (imageMapRes.rowCount === 0) {
            res.status(404).send('No images found for the specified building');
            return;
        }

        // Select a random image from the image_map table
        const randomImage = imageMapRes.rows[Math.floor(Math.random() * (imageMapRes.rowCount - 1)) + 1];

        // Fetch the actual image details
        const imageRes = await pool.query('SELECT * FROM image WHERE image_id = $1', [randomImage.image_id]);

        if (imageRes.rowCount === 0) {
            res.status(404).send('Image not found');
            return;
        }

        // Construct the response object
        const image = {
            image_id: randomImage.image_id,
            building: randomImage.building,
            image_filepath: imageRes.rows[0].image_filepath
        };

        res.status(200).json(image);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Internal Server Error');
    }
}
