require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  //if sync drops tables, seed database
  if (syncOptions.force) {
    db.sequelize.models.Seller.bulkCreate([
      {
        id: 1,
        firstName: "Daffy",
        lastName: "Duck",
        email: "rabbitsAreDumb@aol.com"
      },
      {
        id: 2,
        firstName: "Bugs",
        lastName: "Bunny",
        email: "carrotLover@gmail.com"
      },
      {
        id: 3,
        firstName: "Elmer",
        lastName: "Fudd",
        email: "bestHunterEver@comcast.net"
      }
    ]);

    db.sequelize.models.Category.bulkCreate([
      {
        id: 1,
        name: "Electronics"
      },
      {
        id: 2,
        name: "Kitchen"
      },
      {
        id: 3,
        name: "Lawn and Garden"
      }
    ]);

    db.sequelize.models.Item.bulkCreate([
      {
        id: 1,
        name: "Playstation 4",
        description: "This is a playstation 4 with 1 controller.",
        price: 299.99,
        fileURL: "Insert Path Here",
        CategoryId: 1,
        SellerId: 1
      },
      {
        id: 2,
        name: "Stand Mixer",
        description: "Red stand mixer",
        price: 105,
        fileURL: "Insert Path Here",
        CategoryId: 2,
        SellerId: 2
      },
      {
        id: 3,
        name: "Toaster Oven",
        description: "Slightly used toaster oven, works great!",
        price: 35.25,
        fileURL: "Insert Path Here",
        CategoryId: 2,
        SellerId: 2
      },
      {
        name: "Lawn Mower",
        description: "Gas powered, push mower",
        price: 165.87,
        fileURL: "Insert Path Here",
        CategoryId: 3,
        SellerId: 3
      }
    ]);
  }

  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
