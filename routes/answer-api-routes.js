// Requiring models
var db = require("../models");

// Routes
// ==============================
// ANSWERS
module.exports = function(app) {

// GET
  // route for getting all of the answers
  app.get("/api/answers", function(req, res) {
    // findAll returns all answers
    db.Answer.findAll({}).then(function(dbAnswer) {
      // all answers returned in callback
      res.json(dbAnswer);
    });
  });

// GET
	// route for getting one answer by id
  app.get("/api/answers/:id", function(req, res) {
    // findOne returns one answer
    db.Answer.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbAnswer) {
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

};

