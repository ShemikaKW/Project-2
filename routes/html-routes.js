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
      .then(function(dbItems) {
        res.render("items", {
          items: dbItems
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
    res.render("add-item");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
