
$(function () {
    var socket = io();

    var username;
    // listening for event - username being created. 
    window.addEventListener("userCreated", function (e) {
        console.log(e.detail);
        username = e.detail;
        socket.emit("username", username);
    });

    $('form').submit(function () {

        console.log(username + " this si the user name!")

        socket.emit('chat message', username + ": " + $('#m').val());
        $('#m').val('');
        // return false;
    });
    socket.on('chat message', function (msg) {

        $('#messages').append($('<li>').text(msg));
    });
});