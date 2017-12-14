// Requiring models
var db = require("../models");

// Routes
// ==============================
// USERS
module.exports = function(app) {

// GET
  // route for getting all of the users
  app.get("/api/users", function(req, res) {
    // findAll returns all users
    db.User.findAll({}).then(function(dbUser) {
      // all answers returned in callback
      res.json(dbUser);
    });
  });

// GET
	// route for getting one user by id
  app.get("/api/users/:id", function(req, res) {
    // findOne returns one user
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

// POST 
  // route for saving a new user
  app.post("/api/users", function(req, res) {
    console.log(req.body);
    // create new user
    db.User.create({
      name: req.body.username
    }).then(function(dbUser) {
      // new user returned in callback
      res.json(dbUser);
    });
  });

// DELETE
  // route for getting rid of user
  app.delete("/api/users/:id", function(req, res) {
    // destroy user
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

// PUT 
  //route for updating users
  app.put("/api/users", function(req, res) {
    db.User.update({
      name: req.body.name,
      password: req.body.password
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};