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


// Requiring our models for syncing
var db = require("./models");

// following the socketIO docs.. i see them put the listener in the scoket function 
const io = socket(app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
}));

//Routes
//=============================================================
require("./routes/answer-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
//require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({
    force: true
}).then(function () {
    io;
});

// server setup for public files, handlebars and routes ==============================================

app.use(express.static("./public"));

app.use(bodyParser.urlencoded({
    extended: false
}));

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


// Danny: I wonder if we should move all this socket code to a seperate file.. maybe after we get it workiong we should or have it as a nice to have. 
// i think i need to put the users object outside the connect because it will get emptied everytime a socket is opened. 
var users = {};
// this is a new connection trigger for the socket
io.sockets.on("connection", function(socket){
    
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

    socket.on("clear", function(data){
        socket.broadcast.emit("clear", data);
    })

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });


});




app.use("/", routes);