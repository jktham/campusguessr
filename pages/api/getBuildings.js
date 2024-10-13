import { pool } from "../../utils/db.js"
import { readdirSync } from 'fs'

function getDirectories(source) {
	return readdirSync(source, { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name)
}

export default async function handler(req, res) {
	let buildings = [];
	buildings.push({
		code: "ALL",
		topscore: 800
	})

	let subdirs = getDirectories("./public/floorplans")
	for (let name of subdirs) {
		buildings.push({
			code: name,
			topscore: 800
		})
	}
	
	res.json(buildings);
}
