const passport = require("passport");
const passportJWT = require("passport-jwt");
require("dotenv").config();

module.exports = (knex) => {
  const ExtractJWT = passportJWT.ExtractJwt;
  passport.use(
    new passportJWT.Strategy(
      {
        secretOrKey: process.env.jwt_secret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
      },
      async (req, payload, done) => {
        const user = await knex("users").where("id", payload.id).first();
        if (user) {
          return done(null, user);
        } else {
          return done(new Error("User not found"), false);
        }
      }
    )
  );
  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate("jwt", { session: false });
    },
  };
};
