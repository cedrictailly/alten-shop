
const path                   = require("path");
const {Sequelize, DataTypes} = require("sequelize");

const inventoryStatuses = ["INSTOCK", "LOWSTOCK", "OUTOFSTOCK"];
const categories        = ["Accessories", "Clothing", "Electronics", "Fitness"];

exports.setup = async app => {

  app.dbPath = path.join(__dirname, "/../../local/database.db");

  const sequelize = app.sequelize = new Sequelize({
    dialect: "sqlite",
    storage: app.dbPath,
    logging: false,
  });

  app.models = {};

  const User = app.models.User = sequelize.define("User", {
    id: {
      type         : DataTypes.INTEGER,
      primaryKey   : true,
      autoIncrement: true,
    },
    name: {
      type     : DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type     : DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type     : DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type     : DataTypes.STRING,
      allowNull: false,
    },
  });

  const Product = app.models.Product = sequelize.define("Product", {
    id: {
      type         : DataTypes.INTEGER,
      primaryKey   : true,
      autoIncrement: true,
    },
    code: {
      type     : DataTypes.STRING,
      allowNull: false,
      validate : {
        len           : [2, 10],
        isAlphanumeric: true,
      },
    },
    name: {
      type     : DataTypes.STRING,
      allowNull: false,
      validate : {
        len: [2],
      },
    },
    description: {
      type     : DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type     : DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type     : DataTypes.FLOAT,
      allowNull: false,
    },
    inventoryStatus: {
      type     : DataTypes.ENUM,
      values   : inventoryStatuses,
      allowNull: false,
      validate : {
        isIn: [inventoryStatuses],
      },
    },
    category: {
      type     : DataTypes.ENUM,
      values   : categories,
      allowNull: false,
      validate : {
        isIn: [categories],
      },
    },
    image: {
      type: DataTypes.STRING,
    },
    rating: {
      type    : DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 5,
      },
    },
  });
};
