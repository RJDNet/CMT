const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');

// Mongoose Model Imports
const User = require('../models/user');
// const keys = require('./keys');
const bcrypt = require('bcryptjs');

// Serialize/Deserialize cookie
passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      return done(null, user);
    });
});

// Global Variables
const { googleClientID, googleClientSecret } = require('./keys');
//const { googleClientID, googleClientSecret } = process.env;

// Passport Strategies 
module.exports = passport => {
  passport.use(
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'pass'
    }, (email, pass, done) => {
      const lowerEmail = email.toLowerCase();
      User.findOne({ email: lowerEmail })
        .then(currentUser => {
          if (!currentUser) {
            return done(null, false, { message: 'Invalid Login' })
          } else {
            bcrypt.compare(pass, currentUser.password).then(isMatch => {
              if (isMatch) {
                const cuser = currentUser
                cuser.password = ''
                return done(null, cuser)
              } else {
                return done(null, false, { message: 'Invalid Login' })
              }
            })
          }
        });
    })
  );

  passport.use(
    new GoogleStrategy({
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleProfileID: profile.id })
        .then(currentUser => {
          if (currentUser) {
            done(null, currentUser)
          } else {
            new User({
              googleProfileID: profile.id
            })
              .save()
              .then(newUser => {
                done(null, newUser);
              });
          }
        });
    })
  );

};
