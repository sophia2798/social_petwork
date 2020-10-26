// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var exphbs = require("express-handlebars");
const cloudinary = require('cloudinary').v2;

// Set up dotenv to hide session secret
require("dotenv").config();

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Set up for user authentication
const bcrypt = require("bcrypt");
const session = require("express-session");

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2*60*60*1000
  }
}));

// Routes
// =============================================================
// require("./routes/routes.js")(app);


const picRoutes = require("./controllers/picsController");
app.use("/pics/", picRoutes);

const authRoutes = require("./controllers/authController");
app.use(authRoutes);

const frontendRoutes = require("./controllers/frontendController");
app.use(frontendRoutes);

const petRoutes = require("./controllers/petController");
app.use("/api/pets",petRoutes);

const favRoutes = require("./controllers/favController");
app.use("/fav", favRoutes);
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
