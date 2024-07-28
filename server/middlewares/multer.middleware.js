const multer = require("multer");
const fs = require("fs");
const path = require("path");
const destinationDir = path.join(__dirname, "../public/assets");


if (!fs.existsSync(destinationDir)) {
   fs.mkdirSync(destinationDir, { recursive: true });
}
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, destinationDir);
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
   },
});

const upload = multer({ storage: storage });

module.exports = upload;
