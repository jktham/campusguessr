const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files (CSS, JS) from the public folder
app.use(express.static('public'));

// Route to serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

// Route to fetch the list of images from the imgs folder
app.get('/images', (req, res) => {
    const imgFolder = path.join(__dirname, 'imgs');
    fs.readdir(imgFolder, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to fetch images' });
        }
        // Filter and return only images (jpg, png, gif)
        const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
        res.json(images);
    });
});

// Serve images from the imgs folder
app.get('/imgs/:filename', (req, res) => {
    const filename = req.params.filename;
    const imgPath = path.join(__dirname, 'imgs', filename);
    res.sendFile(imgPath);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
