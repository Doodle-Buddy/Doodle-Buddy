// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // ==== ANSWERS ==== //

  // GET
  // route for getting all of the answers
  app.get("/api/answers", function(req, res) {
    // findAll returns all answers
    db.Answer.findAll({}).then(function(dbAnswer) {
      // all answers returned in callback
      res.json(dbAnswer);
    });
  });

  // POST 
  // route for saving a new answer
  app.post("/api/answers", function(req, res) {
    console.log(req.body);
    // create new answer
    db.Answer.create({
      name: req.body.name,
      description: req.body.description
    }).then(function(dbAnswer) {
      // new answer returned in callback
      res.json(dbAnswer);
    });
  });

  // DELETE
  // route for getting rid of answer
  app.delete("/api/answers/:id", function(req, res) {
    // destroy answer
    db.Answer.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbAnswer) {
      res.json(dbAnswer);
    });
  });

  // PUT 
  //route for updating answers
  app.put("/api/answers", function(req, res) {
    db.Answer.update({
      name: req.body.name,
      description: req.body.description
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbAnswer) {
      res.json(dbAnswer);
    });
  });

  // ==== USERS ==== //
  
  // GET
  // route for getting all of the users
  app.get("/api/users", function(req, res) {
    // findAll returns all users
    db.User.findAll({}).then(function(dbUser) {
      // all answers returned in callback
      res.json(dbUser);
    });
  });

  // POST 
  // route for saving a new user
  app.post("/api/users", function(req, res) {
    console.log(req.body);
    // create new user
    db.User.create({
      name: req.body.name,
      password: req.body.password
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
