var Answer = require("./answers.js");

//==============================//

//at the top of the game, a random answer is pulled and stored as chosenAnswer
//chosenAnswer is passed through Answer constructor and stored as object within New instnace of Game
var Round = function(){
	
	this.randomAnswer();

	//chosen answer is returned from randomAnswer function
	this.chosenAnswer = new Answer(this.randomAnswer());

};

//randomAnswer is grabbed from all answers in GET call
Round.prototype.randomAnswer = function(){
	 	$.get("/api/answers", function(dbAnswer) {
	  	console.log(dbAnswer);    
	  });
	};

var newRound = new Round;
newround.randomAnswer();


		/*
		if (this.chosenAnswer && this.wrongOne && this.wrongTwo){
			$.get("/api/answers", function(data) {
	      var chosen = data[Math.floor(Math.random() * data.length)];
	    

	    });


			return "six";
		}
		
		if (this.chosenAnswer && this.wrongOne){
			$.get("/api/answers", function(data) {
	      var chosen = data[Math.floor(Math.random() * data.length)];
	    

	    });


			return "six";
		}
		
		if (this.chosenAnswer){
			let chosenAnswer = this.chosenAnswer;

			$.get("/api/answers", function(data) {
	      var wrongOne = data[Math.floor(Math.random() * data.length)];
	    	if (chosenAnswer === wrongOne){

	    	}else{

	    	}
	    });
		}

		else{
			$.get("/api/answers", function(data) {
	      var chosen = data[Math.floor(Math.random() * data.length)];
	    	return chosen;
	    });	
		}
		*/
		



//usedPush pushes the current answer to the used Array


/*
function(){
		let chosen = this.randomAnswer();
		if (chosen === this.chosenAnswer){

		}
	}



		$.get("/api/answers", function(data) {
	      var chosen = data[Math.floor(Math.random() * data.length)];
	    });
		return chosen
	};

//
Game.prototype.wrongAnswer = function(){
*/



//==============================//

module.exports = Round;








