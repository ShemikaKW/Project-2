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
    db[selectedTable]
      .findAll({})
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        console.error(err);
        res.end();
      });
  });

  //Login
  app.post("/api/login", function(req, res) {
    db.User.findOne({
      where: { email: req.body.email }
    })
      .then(function(data) {
        bcrypt
          .compare(req.body.password, data.password)
          .then(function(valid) {
            //check if the password provided matches the stored password
            if (valid) {
              res.status(200).send(data);
            } else {
              res.send("Incorrect Password");
            }
          })
          .catch(function(err) {
            console.error(err);
            res.end();
          });
      })
      .catch(function() {
        res.send("No Account");
      });
  });

  //Create a new user
  app.post("/api/user", function(req, res) {
    //Take password from request and hash it for storage in database
    bcrypt
      .hash(req.body.password, saltRounds)
      .then(function(hash) {
        //create user in database
        db.User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash
        })
          //return newly created user to the front-end
          .then(function(data) {
            res.json(data);
          })
          //catch error and return to front-end
          //ex. Email already exists in database
          .catch(function(err) {
            res.send(err);
          });
      })
      .catch(function(err) {
        console.error(err);
        res.end();
      });
  });

  //Create a new category
  app.post("/api/category", function(req, res) {
    db.Category.create({
      name: req.body.name
    })
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        console.error(err);
        res.end();
      });
  });

  //Create a new item
  app.post("/api/item", function(req, res) {
    db.Item.create({
      name: req.body.item,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      CategoryId: req.body.CategoryId,
      UserId: req.body.userId
    })
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        console.error(err);
        res.end();
      });
  });

  //Update item by id
  app.put("/api/item/:id", function(req, res) {
    db.Item.update(
      { purchased: true },
      {
        where: { id: parseInt(req.params.id) }
      }
    )
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        console.error(err);
        res.end();
      });
  });
};
