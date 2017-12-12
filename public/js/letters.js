
//==============================//

//individual letter from selected word passes into constructor
//individual letter is stored as object
//Letter
var Letter = function(actualLetter){
	// old //letter prints to display as a blank(underscore)
	// old //this.currentDisplay = "_";
	//value of the letter is stored as actualLetter
	this.actualLetter = actualLetter;
	//value of letter being guessed correctly starts as false
	//value will switch to true when user guesses correctly
	this.guessCorrect = false;
};

//==============================//

module.exports = Letter;