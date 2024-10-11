const express = require('express')
const fs = require('fs');
const path = require('path');

const app = express()
const port = process.env.PORT || 80

app.use(express.static('public'))

app.get("/", (req, res) => {
	res.redirect("/home");
})
app.get("/home", (req, res) => {
	res.sendFile(__dirname + "/public/home.html");
})

app.get("/game", (req, res) => {
	res.sendFile(__dirname + "/public/panorama/index.html");
})

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

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
