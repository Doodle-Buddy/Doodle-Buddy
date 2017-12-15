// Requiring models
var db = require("../models");

// Routes
// ==============================

// FUNCTIONS

/*
function answerCompare(resultArray, dbArray){
  
  var random = dbArray[Math.floor(Math.random() * dbArray.length)];

  for(var i = 0; i < resultArray.length; i++){
    if(random === resultArray[i]){
        return true;
    }
  }
  return false;
};

function gameplay(resultArray, dbAnswer){

      var count = 0;

      if (count < 5){

        var compare = answerCompare(resultArray, dbAnswer);

        if (compare === true){
          
        }else{
          resultArray.push(compare);
          count++
        };

      }else{
        console.log(resultArray);
      };
};

var resultArray = [];
//var dbAnswer = ["hello", "sneaker", "spoon", "phone", "mouse"];
//gameplay(resultArray, dbAnswer);

*/




// ==============================

// ANSWERS
module.exports = function(app) {

// GET
  // route for getting all of the answers
  app.get("/api/answers", function(req, res) {
    // findAll returns all answers
    db.Answer.findAll({}).then(function(dbAnswer) {
      // all answers returned in callback
      console.log(dbAnswer);
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

