const path = require('path');
const fs = require('fs');

exports.uploads = async (req, res) => {
    const IMG_URL = `/images/${req.file.filename}`;
    // const IMG_URL = `http://localhost:3000/images/${req.file.filename}`;
    console.log(IMG_URL)
    res.json({ url: IMG_URL });
}

exports.delete = async (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '../../public/images', filename);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      res.send('File deleted successfully.');
    });
}
