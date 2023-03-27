//Dependencies
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const filesController = require("../controllers/files");
const { ensureAuth } = require("../middleware/auth");

//Main Routes
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, filesController.getProfile);
router.get("/client", filesController.getClient);

//Exports
module.exports = router;
