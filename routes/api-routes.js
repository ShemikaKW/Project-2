var bcrypt = require("bcrypt"),
  saltRounds = 10,
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

  // //Login
  app.post("/api/login", function(req, res) {
    db.User.findOne({
      where: { email: req.body.email }
    })
      .then(function(data) {
        bcrypt.compare(req.body.password, data.password).then(function(valid) {
          //check if the password provided matches the stored password
          if (valid) {
            res.cookie("email", data.email);
            res.sendStatus(200);
          } else {
            res.send("Incorrect Password");
          }
        });
      })
      .catch(function() {
        res.send("No Account");
      });
  });

  //Create a new user
  app.post("/api/user", function(req, res) {
    db.User.findAndCountAll({
      where: {
        email: req.body.email
      },
      limit: 1
    }).then(function(result) {
      console.log("Count: " + result.count);
      console.log(result.rows);
      if (result.count > 0) {
        res.json(result.count);
      } else {
        //encrypt password
        bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
          //create user in database
          db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash
          }).then(function(data) {
            res.json(data);
          });
        });
      }
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
    console.log(req.body, "====>");
    // db.User.findOne({
    //     where: {
    //       email:" "
    //     }
    // })
    db.Item.create({
      uname: req.body.email,
      name: req.body.item,
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
