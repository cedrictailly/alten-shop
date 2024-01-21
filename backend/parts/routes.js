
exports.setup = async app => {
  await require("./routes/products").setup(app);
  await require("./routes/products-admin").setup(app);
};
