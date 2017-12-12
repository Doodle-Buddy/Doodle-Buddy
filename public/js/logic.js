// logic connected to the html page

//==============================//

var Letter = require("./letters.js");
var Word = require("./words.js");
var Game = require("./game.js");

//==============================//

//FUNCTIONS
//------------------------------

//Timer
function startTimer() {
	intervalId = setInterval(decrement, 1000);
};

//timer decreases in value to count down game time
function decrement() {
    //print countdown in #start-timer div
    $("#start-timer").html("<h2>" + countdown + "</h2>");

    //countdown decreases by 1 and stores its value
    countdown--;
};

//newGame to be called at the end of each round
function newGame() {
	//new Round is generated and stored
  newRound = new Round();
  //intervalId is cleared
  clearInterval(intervalId);
  //reset countdown
  countdown = 30;
  //start timer anew
  startTimer();
};

//Global Variables
//---------------------------------------------

//countdown starts at 30
var countdown = 30;
//stores interval value
var intervalId;
var newRound;

//Gameplay
//---------------------------------------------

//when two players are on the page: 
//the game starts
newGame();

//if countdown is 0, game must restart
if(countdown === 0){
		console.log("You lose!");
		newGame();
	}

//user inputs answer through chat
//chat response is grabbed

$("#submit-button").click(){
	
	var rawGuess = $("#chat-box").val().trim();
	var userGuess = rawGuess.toLowerCase();

	if (newGame.chosenWord.CheckWords() === true){
		
		console.log("Winner!");
		newGame();

	}

};

//==============================//
