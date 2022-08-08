const Files = require("../models/files");
// upload file
module.exports.upload = async function (req, res) {
  // upload file to folder and save path and name in database
  Files.uploadFile(req, res, function (err) {
    if (err) {
      // if file not correct format
      return res.end("Error uploading file, please upload correct format");
    } else {
      // if file is correct format
      // create new file in database
      Files.create(
        { filename: req.file.originalname, file: req.file.path },
        // if file is created successfully
        function (err, file) {
          if (err) {
            console.log("**** Error in creating file ****", err);
            return;
          }

          res.redirect("/");
        }
      );
    }
  });
};
