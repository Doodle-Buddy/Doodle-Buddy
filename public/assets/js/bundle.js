/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var Answers = function (actualAnswer){
  //value of the answer is stored as actualAnswer
  this.actualAnswer = actualAnswer;
  //empty array will hold all used answer ids
  this.usedArray = [];
  //what's printed to DOM
  this.printedAnswer

};

//==============================//

//word selected during the new game passes into constructor
//individual word is stored as object
//Word
var Word = function(actualWord){
  //value of the word is stored as actualWord
  this.actualWord = actualWord;
  //empty array will hold all the individual letters
  this.wordArray = [];
  //empty array will hold what's printed to console
  this.displayArray = [];
  //call function to populate array
  this.RenderLetters();
  //
  this.CheckLetters = function(userGuess){

      this.displayArray = [];

      for(var i = 0; i < this.wordArray.length; i++){
        
        var currentLetter = this.wordArray[i];

        if (currentLetter.actualLetter === userGuess){

          currentLetter.currentDisplay = currentLetter.actualLetter;

          this.displayArray.push(currentLetter.currentDisplay);

        }else{

          this.displayArray.push(currentLetter.currentDisplay);

        };
      };

      console.log(this.displayArray);

    };
  //
  this.CheckWords = function(){
      for(var i = 0; i < this.actualWord.length; i++){
        if(this.actualWord.charAt(i) != this.displayArray[i]){
          return false;
        }
      }

      return true;

    };
};

//splits word into individual letters and push each to array
//individual letters passed into Letter constructor
//RenderLetters
Word.prototype.RenderLetters = function(){
  for(var i = 0; i < this.actualWord.length; i++){
    //passes each letter in actualWord through Letter constructor
    var pushLetter = new Letter(this.actualWord[i]);
    //pushes each Letter object into array
    this.wordArray.push(pushLetter);
    this.displayArray.push(pushLetter.currentDisplay);
  };

  console.log(this.displayArray);
};


module.exports = Word;


module.exports = Answers;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const answers = __webpack_require__(0);
const canvas = __webpack_require__(2);
const game = __webpack_require__(3);
const users = __webpack_require__(4);




/***/ }),
/* 2 */
/***/ (function(module, exports) {

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
// var socket;
// // the client needs to connect to the socket 
// socket = io.connect('http://localhost:3000');

const socket = io.connect();


// need a data object to send through the socket
var dataOfLine;

//when data comes into the client from the socket we need to draw on the client. 
socket.on("mouse", function (data) {
    //console.log("RECIEVING! " + data.x)
    ctx.beginPath();
    ctx.moveTo(data.oldx, data.oldy);
    ctx.lineTo(data.x, data.y);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
});

//when data comes into the client for the socket regarding the clear button we clear the canvas. 
socket.on("clear", function(data){
    //console.log("data: " + data);
    clearCanvas();
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

document.getElementById("clear").onclick = function () {
    clearCanvas();
    socket.emit("clear", "client hit clear.");    
};


// start the canvas code. 
init();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Answer = __webpack_require__(0);

//==============================//

//at the top of the game, a random answer is pulled and stored as chosenAnswer
//chosenAnswer is passed through Answer constructor and stored as object within New instnace of Game
var Game = function () {
	//all answers that could be chosen
	//randomAnswer is grabbed from all answers in GET call
	this.randomAnswer = function () {
		$.get("/api/answers", function (data) {
			var chosen = data[Math.floor(Math.random() * data.length)];
		});
		return chosen
	};
	//chosen answer is returned from randomAnswer function
	this.chosenAnswer = new Answer(this.randomAnswer);

};

//==============================//


module.exports = Game;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// chancejs stuff 
var my_chance = new Chance();

$( () => {
    let usernameInput = $("#username");
    let inputMessage = $("#m");
    let connected = false, username = null;
    const socket = io();

    // initialize the moddal 
    $('.modal').modal({
        dismissible: false // Modal can be dismissed by clicking outside of the modal
    });
    // open the model 
    $('#modal1').modal('open');
    // on click we need to grab what the user put and if its  blank we give him a Chance.first();
    $("#submit-btn").on("click", function () {
        // checck if the form was blank. 
        if (usernameInput.val().trim() === "") {
            username = my_chance.first();
        } else {
            username = $("#username").val().trim();
            setUsername();
        }
            console.log(username);
        
    })
    //Prevents input from having injected markup
    const cleanInput = input => {
        return $('<div/>').text(input).html();
    };

    const setUsername = () => {
        username = cleanInput(username);

        if (username) {
            socket.emit('add user', username);
        }
    };

    //Grabs chat message and emits to socket
    $('form').submit(function () {
        let message = inputMessage.val();
        message = cleanInput(message);
        $("#m").val("");
        socket.emit('chat message', message);
        e.preventDefault();
        
    });
    socket.on('chat message', function (msg) {

        $('#messages').append($('<li>').text(msg));
        
    });

});

/***/ })
/******/ ]);