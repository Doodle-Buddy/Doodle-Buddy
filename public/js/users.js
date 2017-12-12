// chancejs stuff 
var my_chance = new Chance();

var username;

// initialize the moddal 
$('.modal').modal(
    {
        dismissible: false // Modal can be dismissed by clicking outside of the modal
    }
);
// open the model 
$('#modal1').modal('open');
// on click we need to grab what the user put and if its  blank we give him a Chance.first();
$("#submit-btn").on("click", function(){
    // checck if the form was blank. 
    if($("#username").val().trim() === ""){
        username = Chance.first();
    }

    else{
        username = $("#username").val().trim();
    }
})

