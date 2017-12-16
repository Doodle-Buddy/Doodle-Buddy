// chancejs stuff 
const Chance = require("chance")
const chance = new Chance();

$( () => {
    var username;
    $('#username-form').submit(false);
    
    // initialize the moddal 
    $('.modal').modal(
        {
            dismissible: false // Modal can be dismissed by clicking outside of the modal
        }
    );
    // open the model 
    $('#modal1').modal('open');
    // on click we need to grab what the user put and if its  blank we give him a Chance.first();
    
    $("#submit-btn").on("click", function(e){
        e.preventDefault();
        // checck if the form was blank. 
    
        if($("#username").val().trim() === ""){
            username = chance.first();

            setUsername();
        } else {
            username = $("#username").val().trim();
            setUsername();
        }
            console.log(username);
        
    });
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
    $('form').submit(function (e) {
        let message = inputMessage.val();
        message = cleanInput(message);
        $("#m").val("");
        socket.emit('chat message', username + ": " + message);
        e.preventDefault();
        
    });
    socket.on('chat message', function (msg) {

        $('#messages').append($('<li>').text(msg));
        

    });

});