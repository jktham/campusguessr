import { pool } from "../../utils/db.js";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    // Extract user data from request body
    let user = {
        name: req.body.name || "",
        password: req.body.password || ""
    };

    try {
        // Hash the password with bcrypt (saltRounds defines the salt complexity)
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        // Use parameterized query to prevent SQL injection
        const query = `INSERT INTO users(name, password) VALUES($1, $2)`;
        const values = [user.name, hashedPassword];

        // Execute the query
        const result = await pool.query(query, values);

        res.status(200).send(`created user ${user.name}`);
    } catch (err) {
        console.error(err);
        res.status(500).send(`user ${user.name} could not be created`);
    }
}
