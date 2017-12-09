// Dependencies ================================================
const express = require("express");
const bodyParser = require("body-parser");
const socket = require('socket.io');

//local variables ==============================================
const PORT = process.env.PORT || 3000;
const app = express();


// server setup for public files, handlebars and routes ==============================================
app.use(express.static("./public"));

app.use(bodyParser.urlencoded({ extended: false }));

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const routes = require("./routes/index")

// listen to to a port ==============================================
// - Danny: I commented this out but idk if we need this for later -- the io varibale has the listener though. 
// app.listen(PORT, () => { 
//     console.log(`App listening on port ${PORT}`);
// });

const io = socket(app.listen(PORT, () => { 
    console.log(`App listening on port ${PORT}`);
}));

// this is a new connection trigger for the socket
io.sockets.on("connection", function(socket){
    // connections have an id - we can use this to track clients. 
    console.log(socket.id);
    console.log("socket is connected!");

    // when we recieve data about the mouse from the client do a function. 
    socket.on("mouse", function(data){
        console.log("data from mouse: " + data);
        // need to send out (broadcast) the data to the client. 
        socket.broadcast.emit("mouse", data);
    })
})

app.use("/", routes)