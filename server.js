import jsonServer from 'json-server';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: './public'
});
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'public/uploads');

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    if (req.body.fileName) {
      cb(null, req.body.fileName);
    } else {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  }
});

const upload = multer({ storage: storage });

server.use(middlewares);

server.post('/upload', upload.single('file'), (req, res) => {
  try {
    const file = req.file;
    const fileUrl = `/uploads/${file.filename}`;

    res.json({
      success: true,
      url: fileUrl,
      fileName: file.filename,
      originalName: file.originalname,
      size: file.size
    });
  } catch (error) {
    console.error('Վերբեռնման ընթացքում առաջացավ սխալ:', error);
    res.status(500).json({
      success: false,
      error: 'Չհաջողվեց մշակել վերբեռնումը'
    });
  }
});

server.use(router);

const PORT = 4001;
server.listen(PORT, () => {
  console.log(`JSON Server-ը աշխատում է http://localhost:${PORT} հասցեում`);
});