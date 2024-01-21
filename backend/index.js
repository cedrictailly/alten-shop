
(async () => {

  const express    = require("express");
  const bodyParser = require("body-parser");
  const session    = require("express-session");
  const cors       = require("cors");

  require("dotenv").config({path: "../.env"});

  const app = {
    express: express(),
  };

  app.express.use(express.static(__dirname + "/../frontend/dist/frontend/browser/"));
  app.express.use(bodyParser.json());
  app.express.use(cors({
    credentials: true,
    origin     : "http://localhost:4200",
  }));

  await require("./parts/database").setup(app);
  await require("./parts/session").setup(app);
  await require("./parts/fixtures").setup(app);
  await require("./parts/auth").setup(app);
  await require("./parts/routes").setup(app);

  app.express.listen(process.env.PORT, () => {
    console.log(`Server : http://localhost:${process.env.PORT}/`);
  });

})();
