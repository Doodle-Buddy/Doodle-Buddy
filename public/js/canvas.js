// var canvas = document.getElementById('myCanvas');
// var ctx = canvas.getContext('2d');
var canvas
var ctx
var flag = false
var prevX = 0
var currX = 0
var prevY = 0
var currY = 0
var dot_flag = false;
// the socket is here -- 
var socket; 
// the client needs to connect to the socket 
socket = io.connect('http://localhost:3000');
// need a data object to send through the socket
var data; 

var x = "black";
var y = 2;

function init() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    console.log("x: " + currX + " y: " + currY);
    data = {
        x: currX,
        y: currY
    }
    // this line here sends the current x and y of the mouse on the canvas through the socket. 
    socket.emit("mouse", data);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();

}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}



init();