//Dependencies
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const filesController = require("../controllers/files");
const { ensureAuth } = require("../middleware/auth");

//Main Routes
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, filesController.getProfile);

//Routes for user login/signup
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

//Exports
module.exports = router;
