
const {Op} = require("sequelize");
const auth = require("../auth");

exports.setup = async ({express, models: {Product}}) => {

  express.get("/products", async (req, res) => {

    const options = {
      select: ["id", "code", "name", "price"],
      offset: req.query.offset || 0,
      limit : 3 * 4,
    };

    if (req.query.sortOrder) {
      options.order = [
        [req.query.sortField, req.query.sortOrder == 1 ? "ASC" : "DESC"],
      ];
    }

    if (req.query.code) {
      options.where = {
        code: {
          [Op.like]: `%${req.query.code}%`,
        },
      };
    }

    if (req.query.name) {
      options.where = {
        name: {
          [Op.like]: `%${req.query.name}%`,
        },
      };
    }

    res.json(
      await Product.findAndCountAll(options),
    );
  });

  express.get("/products/:id", async (req, res) => {

    const product = await Product.findOne({
      where: {id: req.params.id},
    });

    if (!product)
      return res.status(404).json({error: "Product not found"});

    res.json(product);
  });
};