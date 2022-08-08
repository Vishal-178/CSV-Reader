const mongoose = require("mongoose");
// multer is used to upload files
const multer = require("multer");
const path = require("path");
const File_Path = path.join("/uploads/files");

// connectSchema is used to connect to mongodb
const connectSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// storage is used to store files in folder with new file name and path
const storage = multer.diskStorage({
  // destination is used to store files in folder
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", File_Path));
  },
  // filename is used to store files with new file name
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
// uploadFile multer is used to upload files and check if file is correct format
connectSchema.statics.uploadFile = multer({
  storage: storage,
  // fileFilter is used to check if file is correct format
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "text/csv") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
}).single("file");
// filePath is used to get static file path
connectSchema.statics.filePath = File_Path;

// CsvFile is used to create schema for csv file
const CsvFile = mongoose.model("CsvFile", connectSchema);
module.exports = CsvFile;
