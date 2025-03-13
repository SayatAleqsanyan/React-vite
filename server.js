// server.js
// server.js-ի փոփոխված տարբերակը
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
// const fs = require('fs');

// Կարգավորել multer պահեստավորումը
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Սահմանել նպատակակետը որպես ձեր public դիրեկտորիա
    const uploadPath = path.join(__dirname, 'public/uploads');

    // Ստեղծել դիրեկտորիա, եթե այն գոյություն չունի
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Օգտագործեք req.body.fileName-ը, եթե այն տրված է
    if (req.body.fileName) {
      cb(null, req.body.fileName);
    } else {
      // Հակառակ դեպքում ստեղծեք եզակի ֆայլի անուն
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  }
});

const upload = multer({ storage: storage });

// Օգտագործել միջանկյալ ծրագրեր
server.use(middlewares);

// Ավելացնել վերբեռնման երթուղի
server.post('/upload', upload.single('file'), (req, res) => {
  try {
    // Ստանալ վերբեռնված ֆայլը
    const file = req.file;

    // Ստեղծել URL, որը հղում է public դիրեկտորիայի հարաբերական ճանապարհին
    const fileUrl = `/uploads/${file.filename}`;

    // Ուղարկել պատասխան
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

// Օգտագործել router
server.use(router);

// Սկսել սերվերը
const PORT = 4001;
server.listen(PORT, () => {
  console.log(`JSON Server-ը աշխատում է http://localhost:${PORT} հասցեում`);
});