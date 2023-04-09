//Dependencies
const express = require("express");
const passport = require("passport");
const router = express.Router();

//Google authentication
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

//Google authentication callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

//Exports
module.exports = router;
