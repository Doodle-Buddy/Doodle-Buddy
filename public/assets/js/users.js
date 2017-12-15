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