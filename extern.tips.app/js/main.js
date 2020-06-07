//Your code here
// Get the current window
var win = nw.Window.get();

win.onOpenFiles = function(files){
console.log("onOpenFiles",files);
$("#tipsDiv").addClass("hidden");
$("#welcomeText").removeClass("hidden");
}

function checkIfUserDetailsAreDone() {
    if ($("#userName").val() != "" && $("#userPassword").val() == $("#userPasswordCheck").val() && $("#userPassword").val() !="") {
        $("#letsGoButton").removeAttr('disabled');
    } else {
        $("#letsGoButton").attr('disabled','disabled');
    }
}

function confirmUserDetails(returnedResults) {
    console.log("confirmUserDetails: "+returnedResults);
    console.log("gets here A")
    if (String(returnedResults).indexOf("passwd: password unchanged") != -1) {
        console.log("gets here");
        $("#PassError").removeClass("hidden");
        $(".modal").removeClass("hidden");
	$("#letsGoButton").removeAttr('disabled');
    } else {
        console.log("success");
	win.doneUserSetup();
	$("#welcomeText").addClass("hidden");
	$("#tipsDiv").removeClass("hidden");
	$('.carousel').carousel(0);
    }
    console.log("gets here B")
}

$('.avatar').on('click', function() {
    $(".avatar").removeClass("selectedAvatar");
    $(this).addClass("selectedAvatar");
});

function closePopupDialogue() {
    $(".modal").addClass("hidden");
}

function setUserDetails() {
        var userDetails = {username:"extern", name: $("#userName").val(), avatar: $(".selectedAvatar > img").attr("avatarName"),password: $("#userPassword").val()};
        console.log("USER DETAILS",userDetails);
	$("#letsGoButton").attr('disabled','disabled');
        win.setUserDetails(userDetails,"extern",confirmUserDetails);
}

$( document ).ready(function() {

    $("#letsGoButton").attr('disabled','disabled');

    $('.form-control').on('input', function() { 
    checkIfUserDetailsAreDone();
});

    $(".carousel").carousel({
        interval: 10000,
	pause: "false"
    });
});
//win.showDevTools();
