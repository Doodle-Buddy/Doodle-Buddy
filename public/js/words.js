var Letter = require("./letters.js");

//==============================//

//word selected during the new game passes into constructor
//individual word is stored as object
//Word
var Word = function(actualWord){
	//value of the word is stored as actualWord
	this.actualWord = actualWord;
	//empty array will hold all the individual letters
	this.wordArray = [];
	// old //empty array will hold what's printed to console
	// old //this.displayArray = [];
	//call function to populate array
	this.RenderLetters();
	//
	// old //
	/*
	this.CheckLetters = function(userGuess){

			this.displayArray = [];

			for(var i = 0; i < this.wordArray.length; i++){
				
				var currentLetter = this.wordArray[i];

				if (currentLetter.actualLetter === userGuess){

					currentLetter.currentDisplay = currentLetter.actualLetter;

					this.displayArray.push(currentLetter.currentDisplay);

				}else{

					this.displayArray.push(currentLetter.currentDisplay);

				};
			};

			console.log(this.displayArray);

		};
		*/
	//
	this.CheckWords = function(userGuess){
		 	for(var i = 0; i < this.actualWord.length; i++){
		 		if(this.actualWord.charAt(i) != userGuess[i]){
		 			return false;
		 		}
	 		}

	 		return true;

		};
};

//splits word into individual letters and push each to array
//individual letters passed into Letter constructor
//RenderLetters
Word.prototype.RenderLetters = function(){
	for(var i = 0; i < this.actualWord.length; i++){
		//passes each letter in actualWord through Letter constructor
		var pushLetter = new Letter(this.actualWord[i]);
		//pushes each Letter object into array
		this.wordArray.push(pushLetter);
		// old //this.displayArray.push(pushLetter.currentDisplay);
	};

	console.log(`wordArray: ${this.wordArray}`);
};

//==============================//

module.exports = Word;
