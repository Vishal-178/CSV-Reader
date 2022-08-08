const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("./config/environment");
const logger = require("morgan");
const bodyParser = require("body-parser");
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const port = env.PORT;

//body parser to parse the post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cookie parser to get and set cookie
// app.use(express.urlencoded);
app.use(cookieParser());

app.use(express.static("assets"));
// setting up views layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use(logger(env.morgan.mode, env.morgan.option));
// expressLayouts is used to set layout for ejs files
app.use(expressLayouts);
// setting up the view engine to ejs
app.set("view engine", "ejs");
app.set("views", "./views");

//setting up routes
app.use("/", require("./routes/index"));

//listening to port
app.listen(port, (error) => {
  if (error) {
    console.log("error while running app");
    return;
  }
  console.log("Server is running on Port: ", port);
});
