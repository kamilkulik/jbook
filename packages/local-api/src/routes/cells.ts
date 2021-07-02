import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    try {
      // Read the file
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });

      res.send(JSON.parse(result));
    } catch (err) {
      if (err.code === 'ENOENT') {
        // Add code to create a file and add default cells
      } else {
        throw new Error(err);
      }
    }
    // If read throws an error
    // Inspect the error, see if it ays that the file doesn't exist
    // Parse a list of cells out of it
    // send list of lists cells back to the browser
  });

  router.post('/cells', async (req, res) => {
    // Take the list of cells from the request obj
    const { cells }: { cells: Cell[] } = req.body;
    // serialise them, Write the cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'ok' });
  });

  return router;
};
