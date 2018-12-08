var crypt = require("apache-crypt"),
  db = require("../models");

module.exports = function(app) {
  //Get all sellers
  app.get("/api/:table", function(req, res) {
    var reqParam = req.params.table,
      selectedTable;

    //Set selected table variable
    if (reqParam === "user") {
      selectedTable = "User";
    } else if (reqParam === "item") {
      selectedTable = "Item";
    } else {
      selectedTable = "Category";
    }

    //Select all from chosen table
    db[selectedTable].findAll({}).then(function(data) {
      res.json(data);
    });
  });

  //Login
  app.post("api/login", function(req, res) {
    db.User.find({
      where: { email: req.body.email }
    })
      .then(function(data) {
        //get submitted password
        var pass = req.body.password;

        //check if the password provided matches the stored password
        if (crypt(pass, encryptedPassword) === data.password) {
          res.send(200);
        } else {
          res.send(401);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  //Create a new user
  app.post("/api/user", function(req, res) {
    var encryptedPassword = crypt(req.body.password);
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: encryptedPassword
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
      image: req.body.image
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
