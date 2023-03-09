const express = require("express");
const router = express.Router();
const filesController = require("../controllers/files");
const { ensureAuth } = require("../middleware/auth");

//File Routes
router.get("/:id", ensureAuth, filesController.getFile);

//Enables user to create file
router.post("/createFile", upload.single("file"), filesController.createFile);

//Enables user to delete file. In controller, uses POST model to delete file from MongoDB collection
router.delete("/deleteFile/:id", filesController.deleteFile);

module.exports = router;
