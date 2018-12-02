var db = require("../models");

module.exports = function(app) {
  //Get all sellers
  app.get("/api/:table", function(req, res) {
    var reqParam = req.params.table,
      selectedTable;

    //Set selected table variable
    if (reqParam === "seller") {
      selectedTable = "Seller";
    } else if (reqParam === "item") {
      selectedTable = "Item";
    } else if (reqParam === "category") {
      selectedTable = "Category";
    } else {
      res.render("404");
    }

    //Select all from chosen table
    db[selectedTable].findAll({}).then(function(data) {
      res.json(data);
    });
  });

  //Create a new seller
  app.post("/api/seller", function(req, res) {
    db.Seller.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }).then(function(data) {
      res.json(data);
    });
  });

  //Create a new category
  app.post("/api/category", function(req, res) {
    db.Category.create({
      name: req.body.name
    }).then(function(data) {
      res.json(data);
    });
  });

  //Create a new item
  app.post("/api/item", function(req, res) {
    db.Item.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      fileURL: req.body.fileURL
    }).then(function(data) {
      res.json(data);
    });
  });

  //Delete item by id
  app.put("/api/item/:id", function(req, res) {
    db.Item.update(
      { purchased: true },
      {
        where: { id: parseInt(req.params.id) }
      }
    ).then(function(data) {
      res.json(data);
    });
  });
};
