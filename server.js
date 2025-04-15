import express from 'express';
import path from 'path';
import multer from 'multer';
import { mergePdfs } from './merge.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 3000;

// Serve static files
app.use('/static', express.static('public'));

// Homepage
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'templates/index.html'));
});

// Handle PDF merge
app.post('/merge', upload.array('pdfs', 2), async (req, res) => {
  console.log(req.files);
  // if (!req.files || req.files.length < 2) {
  //   return res.status(400).send('Please upload two PDF files.');
  // }

  const pdf1 = join(__dirname, req.files[0].path);
  const pdf2 = join(__dirname, req.files[1].path);
  const outputPath = join(__dirname, 'public/merged.pdf');

  await mergePdfs(pdf1, pdf2, outputPath);

  res.redirect('/static/merged.pdf');
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
