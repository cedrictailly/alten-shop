
const bcrypt        = require("bcrypt");
const session       = require("express-session");
const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;

exports.createSalt = () => bcrypt.genSaltSync();

exports.hashPassword = password => bcrypt.hashSync(password, process.env.PASSWORD_SALT);

exports.logged = (req, res, next) => {

  if (!req.isAuthenticated())
    return res.status(403).json({error: "You must be logged in"});

  next();
};

exports.setup = async ({express, models: {User}}) => {

  if (!process.env.PASSWORD_SALT)
    throw new Error("You must define a salt in .env file");

  express.use(passport.initialize());
  express.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, {id: user.id});
  });

  passport.deserializeUser(async (user, done) => {
    done(null, await User.findOne({where: {id: user.id}}));
  });

  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
  }, async (email, password, done) => {

    const user = await User.findOne({where: {email}});

    if (!user)
      return done(null, false);

    if (!bcrypt.compareSync(password, user.password))
      return done(null, false);

    return done(null, user);
  }));

  express.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({status: "ok"});
  });

  express.post("/logout", (req, res) => {
    req.logout(() => {
      res.json({status: "ok"});
    });
  });

  express.get("/credentials", (req, res) => {
    res.json({
      status: req.isAuthenticated() ? "ok" : "error",
      name  : req.user?.name || null,
      email : req.user?.email || null,
      role  : req.user?.role || null,
    });
  });
};
