import { pool } from "../../utils/db.js";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    const user = {
        name: req.body.name || "",
        password: req.body.password || ""
    };

    if (!user.name || !user.password) {
        res.status(400).send('Username and password are required');
        return;
    }

    try {
        // Use parameterized query to prevent SQL injection
        const userResult = await pool.query('SELECT * FROM users WHERE name = $1', [user.name]);

        if (userResult.rowCount === 1) { // User exists
            const dbUser = userResult.rows[0];

            // Check if the entered password matches the hashed password in the database
            const isPasswordMatch = await bcrypt.compare(user.password, dbUser.password);

            if (isPasswordMatch) {
                res.status(200).send(`Correct password for ${user.name}`);
            } else {
                res.status(401).send('Wrong password');
            }
        } else { // Create new user with hashed password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);

            // Insert new user with hashed password into the database
            await pool.query('INSERT INTO users (name, password) VALUES ($1, $2)', [user.name, hashedPassword]);
            res.status(200).send(`Created user ${user.name}`);
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Internal server error');
    }
}
