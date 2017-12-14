$(function () {

    var username;
    // listening for event - username being created. 
    window.addEventListener("userCreated", function (e) {
        console.log(e.detail);
        username = e.detail;
    });

    var socket = io();
    $('form').submit(function () {

        socket.emit('chat message', username + ": " + $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function (msg) {

        $('#messages').append($('<li>').text(msg));
    });
});