var db = require("../models");

module.exports = function(app) {
  //Load main page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load index page
  app.get("/search", function(req, res) {
    db.sequelize.models.Item.findAll({
      where: {
        purchased: false
      },
      order: ["name"]
    })
      .then(function(data) {
        //empty array for items
        var items = [];

        for (var i = 0; i < data.length; i++) {
          var item = {
            id: data[i].id,
            name: data[i].name,
            description: data[i].description,
            price: new Intl.NumberFormat("en-EN", {
              style: "currency",
              currency: "USD"
            }).format(data[i].price), //formats as currency
            image: data[i].image
          };

          //push item into array
          items.push(item);
        }

        //render items.handlebars
        res.render("items", {
          items: items
        });
      })
      .catch(function(err) {
        console.error(err);
        res.end();
      });
  });

  // Load login page
  app.get("/login", function(req, res) {
    res.render("login");
  });

  // Render form to create new items
  app.get("/add-item", function(req, res) {
    db.sequelize.models.Category.findAll()
      .then(function(dbCatagories) {
        res.render("add-item", {
          catagories: dbCatagories
        });
      })
      .catch(function(err) {
        console.error(err);
        res.end();
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
