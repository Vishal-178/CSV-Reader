const Files = require("../models/files");
// home page display all files from db
module.exports.home = async function (req, res) {
  // get all files from db
  const files = await Files.find();
// render home page with all files
  res.render("home", {
    title: "Home",
    files: files,
  });
};
