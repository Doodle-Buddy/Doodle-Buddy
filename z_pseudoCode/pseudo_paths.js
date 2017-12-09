//path drafts

//homepage
"/"
// GET

//lobby
"/lobby"
// GET

//answers
"/answers/api"
// POST to crowdsource more answers to add to library
// submit form

//chatroom
"/game/:id/"
// unique id of chatroom
// GET for current chatroom
// POST to generate chatroom
// DELETE upon hitting quit button
	// serve up lobby page to bring user back to main lobby

"/game/:id/answers/api"
// answers that have already been drawn by users in chatroom
// upon every new instance of game, answer id drawn and POST
	// current answer compared against these to make sure no duplicates
	










































