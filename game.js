// require models so we can query the db for game words. 
var db = require("./models");

var currentWord;
var gamewords; 

const game = {

    getGameWord: function() {
        return new Promise(function(resolve, reject){
            //query the db to get all the words. 
            db.Answer.findAll({}).then(function(dbAnswer) {
                // all answers returned in callback
                gamewords = dbAnswer;

                // need to put this here cause async stuff. 
                currentWord = gamewords[Math.floor(Math.random()*gamewords.length)].answers
                console.log("The current word is: " + currentWord);

                if(currentWord.length>0){
                    resolve(currentWord);
                }
                
                else{
                    reject();
                }
            });
        })
    }
}

module.exports = game;