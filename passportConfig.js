/* eslint-disable new-cap */
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;
const User = require('./model/db');

module.exports = (passport) => {
  passport.use(
    new localStrategy((username, password, done) => {
      // eslint-disable-next-line consistent-return
      User.findOne({ username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (error, result) => {
          if (error) throw error;
          if (result === true) {
            return done(null, user);
          }
          return done(null, false);
        });
      });
    }),
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
        _id: user.id,
      };
      cb(err, userInformation);
    });
  });
};
