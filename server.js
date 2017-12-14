// Dependencies ================================================
const express = require("express");
const bodyParser = require("body-parser");
const socket = require("socket.io");

//local variables ==============================================
const PORT = process.env.PORT || 3000;
const app = express();

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


// Requiring our models for syncing
var db = require("./models");



// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

// following the socketIO docs.. i see them put the listener in the scoket function 
const io = socket(app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
}));

// Routes
// =============================================================
require("./routes/answer-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({
    force: true
}).then(function () {
    io;
});


// Routes
// =============================================================
require("./routes/answer-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/html-routes.js")(app);


// server setup for public files, handlebars and routes ==============================================

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

const routes = require("./routes/index");

// listen to to a port ==============================================
// - Danny: I commented this out but idk if we need this for later -- the io varibale has the listener though. 
// app.listen(PORT, () => { 
//     console.log(`App listening on port ${PORT}`);
// });


// this is a new connection trigger for the socket
io.sockets.on("connection", function(socket){
    var users = {};
    // connections have an id - we can use this to track clients. 
    console.log(socket.id);
    console.log("socket is connected!");

    // when we recieve data about the mouse from the client do a function. 
    socket.on("mouse", function (data) {
        // need to send out (broadcast) the data to the client. 
        socket.broadcast.emit("mouse", data);
    });

    socket.on("chat message", msg => {
        io.emit("chat message", msg);
        console.log(`message: ${msg}`);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

<<<<<<< HEAD
    //When the client emits 'add user', this listens and executes
    socket.on('add user', username => {

        socket.username = username;

        console.log(socket.username);
    })

=======
>>>>>>> 7b70cecf81ca33632fd700fc81c6a30e6a785f61
});


