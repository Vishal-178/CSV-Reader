const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home_controller");
const fileUploadController = require("../controllers/fileUpload_Controller");
const fileDisplay = require("../controllers/fileDisplay_Controller");
// home page
router.get("/", homeController.home);
// upload file
router.post("/file-upload", fileUploadController.upload);
// open file
router.get("/open/", fileDisplay.open);

module.exports = router;
