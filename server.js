const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("./public"));

app.use(bodyParser.urlencoded({ extended: false }));

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const routes = require("./routes/index");

app.listen(PORT, () => { 
    console.log(`App listening on port ${PORT}`);
});

app.use("/", routes);

io.on("connection", socket => {
    socket.emit("news", {hello: "world"});
    socket.on("my other event", data => {
        console.log(data);
    });
});