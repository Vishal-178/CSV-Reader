// require the library
const mongoose = require("mongoose");
const env = require("./environment");
// connect to the database and naming the data base.
mongoose.connect(`${env.DB}`);

// acquire the connection to check if it is successful
const db = mongoose.connection;

// error
db.on("error", console.error.bind(console, "error connecting to db"));

// up and running then print the success message.
db.once("open", function () {
  console.log("successfully connected to the data base");
});
