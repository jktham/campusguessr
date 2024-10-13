import { readdirSync } from 'fs';
import path from 'path';

function getFiles(source) {
    try {
        return readdirSync(source, { withFileTypes: true })
            .filter(dirent => dirent.isFile() && dirent.name.endsWith('.png'))
            .map(dirent => dirent.name);
    } catch (err) {
        console.error("Error reading files:", err);
        return [];
    }
}

export default async function handler(req, res) {
    let building = (req.query.building || "HG").toUpperCase();
    let floors = [
        {
            code: "ALL",
            topscore: 200
        }
    ];

    // Use path.join to handle cross-platform paths
    if (building == "ALL") building = "HG";
    const buildingPath = path.join(process.cwd(), 'public', 'floorplans', building);

    try {
        let subfiles = getFiles(buildingPath);

        for (let name of subfiles) {
            // Assume the format is 'something_floorCode.png'
            let parts = name.split("_");
            if (parts.length > 1) {
                let floorCode = parts[1].replace('.png', '');

                floors.push({
                    code: floorCode,
                    topscore: 200
                });
            } else {
                console.warn(`Unexpected file format: ${name}`);
            }
        }

        res.status(200).json(floors);

    } catch (e) {
        console.error("Error processing request:", e);
        res.status(500).send("Internal Server Error");
    }
}
