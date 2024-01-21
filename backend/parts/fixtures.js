
const fs   = require("fs-extra");
const auth = require("./auth");

exports.setup = async ({dbPath, sequelize, models: {User, Product}}) => {

  if (await fs.exists(dbPath))
    return;

  await sequelize.sync();

  User.create({
    name    : "Cédric Tailly",
    email   : "test@example.com",
    password: auth.hashPassword("admin123"), // ;)
    role    : "admin",
  });

  for (const product of require("../data/products.json").data)
    Product.create(product);
};
