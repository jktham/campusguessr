const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Serve index.html by default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// API route to save coordinates to a file
app.post('/save-coordinates', (req, res) => {
    const { x, y } = req.body;
    const data = `X: ${x}, Y: ${y}\n`;

    fs.appendFile('coordinates.txt', data, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).json({ success: false, message: 'Failed to save coordinates' });
        }
        res.json({ success: true, message: 'Coordinates saved successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
