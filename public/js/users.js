// chancejs stuff 
var chance = new Chance();

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
        username = chance.first();
    }

    else{
        username = $("#username").val().trim();
    }
    // how can i get this username and use it from another js file? -- make a constructor and then call that function to run this code about the modal else where??? 
    console.log(username);
})

