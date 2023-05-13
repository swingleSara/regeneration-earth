//Dependencies
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

//Exports
module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
          "https://web-production-7ff1.up.railway.app/auth/google/callback",
      }
      // async (accessToken, refreshToken, profile, done) => {
      //   const newUser = {
      //     googleId: profile.id,
      //     firstName: profile.name.givenName,
      //     lastName: profile.name.familyName,
      //     admin: false,
      //   };
      //   try {
      //     let user = await User.findOne({ googleId: profile.id });
      //     if (user.admin === true) {
      //       done(null, user);
      //     }
      //   } catch (err) {
      //     console.error(err);
      //   }
      // }
    )
  );

  //Serialize User
  passport.serializeUser((user, done) => done(null, user.id));

  //Deserialize User
  passport.deserializeUser((user, done) => {
    process.nextTick(() => done(null, user));
  });
};
