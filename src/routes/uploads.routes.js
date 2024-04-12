const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const controller = require("../controllers/uploads.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), controller.uploads);
router.delete('/:filename', controller.delete)

module.exports = router;