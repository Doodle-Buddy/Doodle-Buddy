var Word = require("./words.js");

//==============================//

//at the top of the game, a random word is pulled and stored as chosenWord
//chosenWord is passed through Word constructor and stored as object within NewGame
var Round = function(){
	//all words that could be chosen
	this.wordList();
	//randomWord is grabbed from all words
	this.randomWord();
	//randomWord is passed into Word constructor
	//chosenWord is stored as Word object
	this.chosenWord = new Word(this.randomWord);
	//guesses available in NewGame starts as 9

};

Round.prototype.wordList = function(){
    // Send the GET request.
    $.get("/api/answers", function(data){
      console.log("answers", data);
      	return data;
    });
};

Round.prototype.randomWord = function(){
	var random = (this.wordList[Math.floor(Math.random() * this.wordList.length)]);
	var randomName = random.name;

	randomName.toLowerCase();

	return randomName;
}


//==============================//

module.exports = Round;








