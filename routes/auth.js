//Dependencies
const express = require("express");
const passport = require("passport");
const router = express.Router();

//Google Authentication
//Get /auth/google route
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//Google Authentication Callback
//Get /auth/google/callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

//Logout User
//Get /auth/logout route
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

//Exports
module.exports = router;
