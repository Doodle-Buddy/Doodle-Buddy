// Dependencies ================================================
const express = require("express");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const morgan = require("morgan");
const game = require("./game.js");

//local variables ==============================================
const PORT = process.env.PORT || 3000;
const app = express();


// use morgan for loggging
app.use(morgan('tiny'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));

app.use(express.static("./public"));

app.use(bodyParser.urlencoded({
    extended: false
}));

// server setup for public files, handlebars and routes ==============================================

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

const routes = require("./routes/index");

// Requiring our models for syncing
var db = require("./models");

// following the socketIO docs.. i see them put the listener in the scoket function 
const io = socket(app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
}));

// Routes
// =============================================================
require("./routes/answer-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
app.use("/", routes);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({
    force: false
}).then(function () {
    io;
});

// Danny: I wonder if we should move all this socket code to a seperate file.. maybe after we get it workiong we should or have it as a nice to have. 
// i think i need to put the users object outside the connect because it will get emptied everytime a socket is opened. 
var users = [];

// store variable for game 
var gameWord;
var drawer;
var drawerID;
var round = 0;
var userGuess;
var isGameReady = true;

// this is a new connection trigger for the socket
io.sockets.on("connection", function(socket){
    console.log("connection made!")

    // putting game function here. cause it needs the socket param. 
    function aRound(){
        console.log("the round method is called. ");
        //we get a gameword once 2 players enter and we can start the game. 
        game.getGameWord().then(function(fromResolve){
            //also we need to decide who is the drawer first. 
            if(round <= users.length){
                drawer = users[round].username
                drawerID = users[round].socketID[0];
                gameWord = fromResolve;
                
                console.log("drawer " + drawer)
                console.log("drawerID " + drawerID);

                //lets tell the drawer he is the drawer and what the word is. 
                socket.broadcast.to(drawerID).emit('chat message', 'You are the drawer. The word is '+ gameWord);
    
                //now that the drawer is set and we gave him the word.. we need to listen if anyone has said taht word.    
                socket.on("chat message", msg => {
                    for(i=0; i<msg.length; i++){
                        if(msg.charAt(i) === ":"){
                            userGuess = msg.substring(i+1, msg.length).trim();
    
                            // if the guess that came in was the gameword they won! 
                            if(userGuess === gameWord){
                                io.emit("chat message", "Correct! The word was " + gameWord);
    
                                // go to the next round. 
                                round++
                                aRound();
    
                            }
                        }
                    }
                });
    
            }
            else{
                io.emit("chat message", "Game is over.");
                isGameStarted = false;
            }
        });
    }

    // when we recieve data about the mouse from the client do a function. 
    socket.on("mouse", function (data) {
        // need to send out (broadcast) the data to the client. 
        socket.broadcast.emit("mouse", data);
    });

    socket.on("chat message", msg => {
        io.emit("chat message", msg);
        console.log(`message: ${msg}`);

        if(isGameReady){
            for(i=0; i<msg.length; i++){
                if(msg.charAt(i) === ":"){
                    var startGameMsg = msg.substring(i+1, msg.length).trim().toLowerCase();
        
                    // if they said
                    if(startGameMsg === "start game"){
                        io.emit("chat message", "Game on!");
                        aRound();
                        isGameReady = false;
                        
                    }
                }
            }
        }

        if(!isGameReady){
            for(i=0; i<msg.length; i++){
                if(msg.charAt(i) === ":"){
                    var startGameMsg = msg.substring(i+1, msg.length).trim().toLowerCase();
        
                    // if they said
                    if(startGameMsg === "end game"){
                        io.emit("chat message", "Game ended!");
                        isGameReady = true;
                        round = 0;
                    }
                }
            }
        }

    });

    socket.on("clear", function (data) {
        socket.broadcast.emit("clear", data);
    })

    socket.on("add user", function (username) {
        var exists = false;
        var userObj = {};
        console.log("users got hit on socket. ");
        for (i = 0; i < users.length; i++) {
            if (users[i].username === username) {
                users[i].socketID.push(socket.id);
                exists = true;
            }
        }

        if (!exists) {
            userObj = {
                username: username,
                socketID: [socket.id]
            };
            users.push(userObj);
            console.log(users.length);
        }
        console.log(users);

   })

    socket.on("disconnect", (reason) => {
        console.log("user disconnected - " + reason);
        // when a user disconnects we need to remove them from the list. 
        for(i=0; i<users.length; i++){
            if(users[i].socketID = socket.id){
                users.splice(i,1)
            }
        }
    });

});

