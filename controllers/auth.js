//Dependencies
const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

//Controller methods exports
//Login to the website for existing users
exports.getLogin = (req, res) => {
  if (req.user) {
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
    return res.redirect("/login");
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
      return res.redirect("/login");
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
  //Erorr if session cannot be destroyed during logout
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

//Signup
exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

//After successful signup
exports.postSignup = async (req, res, next) => {
  //Input Validation
  const validationErrors = [];
  if (!validator.isLength(req.body.userName, { min: 3, max: 25 }))
    validationErrors.push({
      msg: "Username must be between 3 to 25 characters",
    });
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (!validator.equals(req.body.password, req.body.confirmPassword))
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }

  try {
    //Email and userName sanitization
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
      all_lowercase: true,
    });

    req.body.userName = req.body.userName.toLowerCase();

    //Verify if username or email already exist
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { userName: req.body.userName }],
    });

    if (existingUser) {
      req.flash("errors", {
        msg: "Account with that email address or username already exists.",
      });
      return res.redirect("../signup");
    } else {
      //Add new user to User collection
      const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
      });

      //Save new user
      await user.save();
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/profile");
      });
    }
  } catch (err) {
    console.log(err);
  }
};
