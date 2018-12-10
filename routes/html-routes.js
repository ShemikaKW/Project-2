var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/search", function(req, res) {
    //  let userEmail = req.cookies('email');
    //   console.log(userEmail, '---->');
    db.sequelize.models.Item.findAll({
      where: {
        purchased: false
      },
      order: ["name"]
    }).then(function(dbItems) {
      res.render("items", {
        items: dbItems,
        uname: req.params.email
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("/", function(req, res) {
    res.render("index");
  });
  // Load login page
  app.get("/login", function(req, res) {
    res.render("login");
  });
  // Render form to create new items
  app.get("/add-item", function(req, res) {
    res.render("add-item");
  });

  //Load main page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
