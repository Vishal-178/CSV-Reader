const files = require("../models/files");
const csv = require("csv-parser");
const fs = require("fs");
// open file  and read it
module.exports.open = async function (req, res) {
  // read file from database using req.query.id
  const file = await files.findById(req.query.id);
  // result is a array of objects
  const results = [];
  //
  let header = [];
  // read file and parse it to array of objects
  const pushedData = await fs
    .createReadStream(file.file)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("headers", (headers) => {
      header = headers;
    });
  // render file to view with header and results
  pushedData.on("end", () => {
    res.render("open", {
      title: "Open",
      results: results,
      header: header,
    });
  });
};
