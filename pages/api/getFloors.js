import { pool } from "../../utils/db.js"
import { readdirSync } from 'fs'

function getFiles(source) {
	return readdirSync(source, { withFileTypes: true })
		.filter(dirent => dirent.name.includes(".png"))
		.map(dirent => dirent.name)
}

export default async function handler(req, res) {
	let building = (req.query.building || "HG").toUpperCase();
	let floors = [];
	floors.push({
		code: "ALL",
		topscore: 200
	})

	try {
		let subfiles = getFiles(`./public/floorplans/${building}`)
		for (let name of subfiles) {
			let c = name.split("_")[1].split(".png")[0]
			floors.push({
				code: c,
				topscore: 200
			})
		}
	} catch (e) {
		console.error(e)
	}
	
	res.json(floors);
}
