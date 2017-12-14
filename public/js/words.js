//==============================//

//word selected during the new game passes into constructor
//individual word is stored as object
//Word
var Word = function(actualWord){
	//value of the word is stored as actualWord
	this.actualWord = actualWord;
	//check user against against every character in the chosen word
	this.CheckWords = function(userGuess){
		 	for(var i = 0; i < this.actualWord.length; i++){
		 		if(this.actualWord.charAt(i) != userGuess[i]){
		 			return false;
		 		}
	 		}

	 		return true;

		};
};
	console.log(`actualWord: ${this.actualWord}`);
};

//==============================//

module.exports = Word;
