
const bcrypt        = require("bcrypt");
const session       = require("express-session");
const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;

exports.createSalt = () => bcrypt.genSaltSync();

exports.setup = async app => {

  if (!process.env.SESSION_SECRET)
    throw new Error("You must define a SESSION_SECRET in .env file");

  const SequelizeStore = require("connect-session-sequelize")(session.Store);

  app.express.use(
    session({
      secret           : process.env.SESSION_SECRET,
      store            : new SequelizeStore({db: app.sequelize}),
      resave           : false,
      saveUninitialized: true,
      // cookie           : {secure: true},
    }),
  );
};
