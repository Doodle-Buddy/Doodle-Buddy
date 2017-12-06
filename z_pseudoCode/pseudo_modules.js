// Main Page //

// input box for submitting user suggestions
// -- checks against current table and makes sure it's not a duplicate
// -- adds to table

// == Modules == //

//== User - Prototype ==//

//upon entering chatroom, player id created in ascending order
	/*
		User {
			id: player#
			name: ""
			wins:
			totalScore:
		}
	*/
//ready button to initiate gameplay
//quit button moves user from chatroom into lobby

//== User - class: Guesser

//view main image and multiple choice answers
//check user guess against multiple choice responses
//starts with 2-3 guesses


//== User - class: Artist

// view main image
// user wins if 
// - time runs out and other user does not guess correctly
// - other user uses up all guesses


//== Game ==//
/*
	User - Artist
	User - Guesser
	Answer
	GameOver
	NewGame
*/
//time interval to limit game time


//== Answers ==//
	//every game is new instance of answer
	//grab random id and compare against api
		//if no match, move forward with current answer
		//if match choose new answer
	//Table in mySQL
		/*
			id:
			answer:
		*/ 
	//grab random answer by id and post to api
	//grab choices stored in table and randomize them
	//populate into array in mixed order
	//print array to page
	//AnswerCheck
		//call ids posted to api and check against what was selected
		//takes current time interval stamp to add or subtract points
			// if correct, add points
			// if incorrect, subtract points
	//

//== Chatroom ==//
	// new instance of chatroom when join button is clicked
	// path id = chatroom id
	// if 2 sessions are occuring on path, new instance of game created
	// if user selects quit button, chatroom disbands



























