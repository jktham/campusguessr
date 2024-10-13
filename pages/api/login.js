import { pool } from "../../utils/db.js";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    let user = {
        name: req.body.name || "",
        password: req.body.password || ""
    };

    if (!user.name || !user.password) {
        res.status(400).send('Username and password are required');
        return;
    }

    try {
        // Fetch the user from the database using a parameterized query
        const result = await pool.query(
            `SELECT * FROM users WHERE name = $1`,
            [user.name]
        );

        if (result.rowCount === 1) {
            const dbUser = result.rows[0];

            // Check if the password matches the hashed password stored in the database
            const passwordMatch = await bcrypt.compare(user.password, dbUser.password);

            if (passwordMatch) {
                res.status(200).send(`Correct password for ${user.name}`);
            } else {
                res.status(401).send('Wrong username or password');
            }
        } else {
            res.status(401).send('Wrong username or password');
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}
