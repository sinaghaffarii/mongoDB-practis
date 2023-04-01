const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const type = {
  "image:png": "png",
  "image:jpg": "jpg",
  "image:jpeg": "jpeg",
};

const fileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = type[file.mimetype];
      cb(null, uuidv4(), ".", ext);
    },
  }),

  fileFilter: (req, file , cb) => {
    const isValid = !!type[file.mimetype] 
    let error = isValid ? null : new Error('invalid Type')
    cb(error , isValid)
  }
});

module.exports = fileUpload;
