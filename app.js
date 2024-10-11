const express = require('express')
const app = express()
const port = process.env.PORT || 80

app.use(express.static('public'))

app.get("/", (req, res) => {
	res.redirect("/home");
})
app.get("/home", (req, res) => {
	res.sendFile(__dirname + "/public/home.html");
})

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
