// pages/api/write-comics-to-file.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getAllComics } from '../../services/marvel/marvel.service'; // Adjust the import path as needed
import fs from 'fs/promises'; // Import fs module for file operations
// pages/api/write-comics-to-file.ts



// Function to write comics data to snapshot-comics.json file
export const writeComicsToFile = async () => {
    try {
        // Fetch all comics
        const allComics = await getAllComics();

        // Serialize comics data to JSON format
        const comicsJSON = JSON.stringify(allComics, null, 2);

        // Write JSON data to snapshot-comics.json file
        await fs.writeFile('../data/snapshot-comics.json', comicsJSON);

        console.log('Comics data written to snapshot-comics.json successfully.');
    } catch (error) {
        console.error('Error writing comics data to snapshot-comics.json:', error);
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            // Call the function to write comics data to file
            await writeComicsToFile();

            // Respond with success message
            res.status(200).json({ message: 'Comics data written to file successfully.' });
        } catch (error) {
            console.error('Error writing comics data to file:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

