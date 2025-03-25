import express from 'express';
import jsonServer from 'json-server';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import cors from 'cors';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const jsonRouter = jsonServer.router('db.json');

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173'
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS-ը չի թույլատրում'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Token', 'Username', 'x-username'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const UPLOADS_BASE_DIR = path.join(__dirname, 'public', 'uploads');
const DEFAULT_UPLOAD_DIR = path.join(UPLOADS_BASE_DIR, 'default');

const extractUsername = (req) => {
  const usernameStrategies = [
    () => req.body.Username,
    () => req.body.username,
    () => req.headers.username,
    () => req.headers['x-username'],
    () => 'default'
  ];

  for (const strategy of usernameStrategies) {
    const username = strategy();
    if (username) {
      return username
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase()
      .trim();
    }
  }

  return 'default';
};

const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    try {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`📁 Պապկա ստեղծված է: ${dirPath}`);
    } catch (err) {
      console.error(`❌ Սխալ պապկայի ստեղծման ժամանակ ${dirPath}:`, err);
    }
  }
};

ensureDirectoryExists(UPLOADS_BASE_DIR);
ensureDirectoryExists(DEFAULT_UPLOAD_DIR);

app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const username = extractUsername(req);

    const userUploadDir = username !== 'default'
      ? path.join(UPLOADS_BASE_DIR, username)
      : DEFAULT_UPLOAD_DIR;

    ensureDirectoryExists(userUploadDir);
    cb(null, userUploadDir);
  },
  filename: (req, file, cb) => {
    const username = extractUsername(req);

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const sanitizedOriginalName = file.originalname
    .replace(/[^a-zA-Z0-9.]/g, '_');

    cb(null, `${username}-${uniqueSuffix}-${sanitizedOriginalName}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      console.warn(`⚠️ Անթույլատրելի ֆայլի տեսակ: ${file.mimetype}`);
      cb(new Error('Թույլատրված են միայն պատկերներ'), false);
    }
  }
});

app.post('/upload', upload.single('file'), (req, res) => {
  console.group('📡 Server Upload Endpoint');

  try {
    const file = req.file;

    if (!file) {
      console.error('❌ Ոչ մի ֆայլ չի վերբեռնվել');
      console.groupEnd();
      return res.status(400).json({
        success: false,
        error: 'Ոչ մի ֆայլ ընտրված չէ'
      });
    }

    const username = extractUsername(req);
    console.log('🔑 Քաղված Username:', username);
    console.groupEnd();

    const fileUrl = `http://localhost:4001/uploads/${username}/${file.filename}`;

    res.json({
      success: true,
      url: fileUrl,
      fileName: file.filename,
      originalName: file.originalname,
      size: file.size
    });
  } catch (error) {
    console.error('🚨 Վերբեռնման սխալ:', error);
    res.status(500).json({
      success: false,
      error: 'Վերբեռնումը ձախողվեց'
    });
  }
});

app.use('/api', jsonRouter);

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`🚀 Սերվերը աշխատում է http://localhost:${PORT} հասցեում`);
});