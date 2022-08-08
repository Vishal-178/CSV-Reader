const fs = require("fs");
const path = require("path");
const rfs = require("rotating-file-stream");

const logDirectory = path.join(__dirname, "../logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// ensure log directory exists
const accessLogStream = rfs.createStream("access.log", {
  size: "10M", // rotate every 10 MegaBytes written
  interval: "1d", // rotate daily
  compress: "gzip", // compress rotated files
  path: logDirectory,
});

const development = {
  name: "development",
  PORT: 8000,
  DB: "csvReader",
  morgan: {
    mode: "dev",
    option: {
      stream: accessLogStream,
    },
  },
};
const production = {
  name: "production",
  PORT: process.env.PORT || 8000,
  DB: process.env.DB,
  morgan: {
    mode: "combined",
    option: {
      stream: accessLogStream,
    },
  },
};
module.exports =
  eval(process.env.ENVIRONMENT) === undefined
    ? development
    : eval(process.env.ENVIRONMENT);
