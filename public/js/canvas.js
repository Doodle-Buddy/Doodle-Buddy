// set variables for the canvas. 
var canvas;
var ctx;
var flag = false;
var prevX = 0;
var currX = 0;
var prevY = 0;
var currY = 0;

var dot_flag = false;
// the socket is here -- 
var socket;
// the client needs to connect to the socket 
socket = io.connect('http://localhost:3000');
// need a data object to send through the socket
var dataOfLine;

//when data comes into the client from the socket we need to draw on the client. 
socket.on("mouse", function (data) {
    console.log("RECIEVING! " + data.x)
    ctx.beginPath();
    ctx.moveTo(data.oldx, data.oldy);
    ctx.lineTo(data.x, data.y);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
})

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
    // store the x and y positions to an object so we can send this object through the socket. 
    dataOfLine = {
        oldx: prevX,
        oldy: prevY,
        x: currX,
        y: currY
    }
    // this line here sends the current x and y of the mouse on the canvas through the socket. 
    socket.emit("mouse", dataOfLine);

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


const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

document.getElementById("clear").onclick = clearCanvas;


// start the canvas code. 
init();