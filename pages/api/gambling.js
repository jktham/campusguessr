import { pool } from "../../utils/db.js";

let PREM_RATE = 0.1;
let STAR_RATE = 0.01;

export default async function handler(req, res) {
    let gambler = {
        name: req.body.username || "",
        mode: req.body.gambling || "",
        stake: req.body.stake || 0,
        cur: 0,
        starcur: 0
    };

    let answer = {
        played: false,
        won: false
    };

    if (!gambler.name || gambler.stake <= 0) {
        res.status(400).send('Invalid input');
        return;
    }

    // Get user data
    try {
        const data = await pool.query(
            `SELECT currency, premium_currency FROM users WHERE name = $1`,
            [gambler.name]
        );

        if (data.rowCount !== 1) {
            console.error("User not found");
            res.status(404).send('User not found');
            return;
        }

        gambler.cur = data.rows[0].currency;
        gambler.starcur = data.rows[0].premium_currency;

    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
    }

    try {
        if (gambler.mode === 'premium') {
            // Premium coin gambling
            if (gambler.cur < gambler.stake) {
                res.status(200).json(answer);  // Not enough currency to play
                return;
            }

            answer.played = true;
            // Deduct currency
            await pool.query(
                `UPDATE users SET currency = currency - $1 WHERE name = $2`,
                [gambler.stake, gambler.name]
            );

            // Check for win
            if (roll(PREM_RATE)) {
                answer.won = true;
                gambler.stake = gambler.stake > 5 ? gambler.stake * 2 : gambler.stake;
                
                // Add to premium currency
                await pool.query(
                    `UPDATE users SET premium_currency = premium_currency + $1 WHERE name = $2`,
                    [gambler.stake, gambler.name]
                );
            }

        } else if (gambler.mode === 'star') {
            // Star coin gambling
            if (gambler.starcur < gambler.stake) {
                res.status(200).json(answer);  // Not enough premium currency to play
                return;
            }

            answer.played = true;
            // Deduct premium currency
            await pool.query(
                `UPDATE users SET premium_currency = premium_currency - $1 WHERE name = $2`,
                [gambler.stake, gambler.name]
            );

            // Check for win
            if (roll(STAR_RATE)) {
                answer.won = true;
                gambler.stake = gambler.stake > 5 ? gambler.stake * 2 : gambler.stake;
                
                // Add to star currency
                await pool.query(
                    `UPDATE users SET star_currency = star_currency + $1 WHERE name = $2`,
                    [gambler.stake, gambler.name]
                );
            }

        } else {
            res.status(400).send('Invalid gambling mode');
            return;
        }

        res.status(200).json(answer);

    } catch (err) {
        console.error(err);
        res.status(500).send('Database update error');
    }
}

function roll(dropchance) {
    return Math.random() < dropchance;
}
