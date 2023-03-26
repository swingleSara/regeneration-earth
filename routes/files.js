//Dependencies
const express = require("express");
const router = express.Router();
const filesController = require("../controllers/files");

//File routes
// router.get("/:id", ensureAuth, filesController.getFile);
router.get("/getClient", filesController.getClient);

//Enables user to create file
router.post("/createFile", filesController.createFile);

//Enables user to delete file. In controller, uses POST model to delete file from MongoDB collection
router.delete("/deleteFile/:id", filesController.deleteFile);

//Exports
module.exports = router;
