//Dependencies
const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

//Controller methods exports
//Login to the website for existing users
exports.getLogin = (req, res) => {
  if (
    req.user.googleId == "105965140769894102733" ||
    req.user.googleId == "100547375198602010404"
  ) {
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "Login",
  });
};

//Create login session
exports.postLogin = (req, res, next) => {
  //Create array of errors if errors occur
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });
  //If the errors array is not empty, show errors
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/");
  }
  //Email sanitization
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  //Local authentication
  passport.authenticate("local", (err, user, info) => {
    //If error, return error
    if (err) {
      return next(err);
    }
    //If the user doesn't exist, flash error and return to login screen
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/");
    }
    //Login
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      //If valid user, redirect to their profile
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

//Logout
exports.logout = (req, res) => {
  req.session.regenerate(() => {
    console.log("User has logged out.");
  });
  //Error if session cannot be destroyed during logout
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};
