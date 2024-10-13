import { promises as fs } from 'fs';
import path from 'path';
import { pool } from "../../utils/db.js";

async function getDirectories(source) {
    try {
        const dirents = await fs.readdir(source, { withFileTypes: true });
        return dirents.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
    } catch (err) {
        console.error("Error reading directory:", err);
        return [];
    }
}

export default async function handler(req, res) {
    let buildings = [
        {
            code: "ALL",
            topscore: 800
        }
    ];

    // Get the absolute path to the directory
    const floorplansPath = path.join(process.cwd(), 'public', 'floorplans');
    
    try {
        let subdirs = await getDirectories(floorplansPath);

        for (let name of subdirs) {
            buildings.push({
                code: name,
                topscore: 800
            });
        }
        
        res.status(200).json(buildings);

    } catch (err) {
        console.error("Error getting directories:", err);
        res.status(500).send("Internal Server Error");
    }
}
