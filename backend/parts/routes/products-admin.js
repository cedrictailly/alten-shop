
const {Op} = require("sequelize");
const auth = require("../auth");

exports.setup = async ({express, models: {Product}}) => {

  express.get("/admin/products", auth.logged, async (req, res) => {

    const options = {
      offset: req.query.offset || 0,
      limit : req.query.limit || 10,
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

  express.get("/admin/products/:id", auth.logged, async (req, res) => {

    const product = await Product.findOne({
      where: {id: req.params.id},
    });

    if (!product)
      return res.status(404).json({error: "Product not found"});

    res.json(product);
  });

  express.post("/admin/products", auth.logged, async (req, res) => {

    try {

      const {id} = await Product.create(req.body);

      res.json({status: "ok", id});

    } catch (error) {

      res.json({status: "error", errors: error.errors.map(e => e.message)});
    }
  });

  express.put("/admin/products/:id", auth.logged, async (req, res) => {

    if (await Product.count({
      where: {id: req.params.id},
    }) == 0) {
      return res.status(404).json({
        status: "error",
        errors: [`Product ${req.params.id} not found`],
      });
    }

    try {

      await Product.update(req.body, {
        where    : {id: req.params.id},
        returning: true,
      });

      res.json({status: "ok"});

    } catch (error) {

      res.json({
        status: "error",
        errors: error.errors.map(e => e.message),
      });
    }
  });

  express.delete("/admin/products", auth.logged, async (req, res) => {

    if (!Array.isArray(req.body.ids))
      return res.status(400).send("Bad request");

    if (await Product.count({
      where: {id: {[Op.in]: req.body.ids}},
    }) != new Set(req.body.ids).size) {
      return res.status(404).json({
        status: "error",
        errors: ["One or more product(s) to deleted not found"],
      });
    }

    await Product.destroy({
      where: {
        id: {
          [Op.in]: req.body.ids,
        },
      },
    });

    res.json({status: "ok"});
  });
};
