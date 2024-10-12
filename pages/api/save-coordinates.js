import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { x, y } = req.body;
    const filePath = path.join(process.cwd(), 'coordinates.txt');
    const data = `X: ${x}, Y: ${y}\n`;

    fs.appendFile(filePath, data, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to save coordinates' });
      }
      return res.status(200).json({ message: 'Coordinates saved successfully' });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
