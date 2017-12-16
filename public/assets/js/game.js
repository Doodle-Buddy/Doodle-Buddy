// var Answer = require("./answers.js");

// //==============================//

// //at the top of the game, a random answer is pulled and stored as chosenAnswer
// //chosenAnswer is passed through Answer constructor and stored as object within New instnace of Game
// var Game = function () {
// 	//all answers that could be chosen
// 	//randomAnswer is grabbed from all answers in GET call
// 	this.randomAnswer = function () {
// 		$.get("/api/answers", function (data) {
// 			var chosen = data[Math.floor(Math.random() * data.length)];
// 		});
// 		return chosen
// 	};
// 	//chosen answer is returned from randomAnswer function
// 	this.chosenAnswer = new Answer(this.randomAnswer);

// };

// //==============================//


// module.exports = Game;