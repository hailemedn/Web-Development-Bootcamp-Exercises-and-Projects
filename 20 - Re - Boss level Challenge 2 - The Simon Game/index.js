var started = false;
var colors = ["blue", "yellow", "red", "green"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;


function nextColor() {
    userClickPattern = [];
    level++;
    // change h1 to the the level number
    $(".title").text("Level " + level);
    started = true;
    //takes a randomnumber from 0 - 3
    var randomNumber = Math.floor(Math.random() * 4);
    //chooses a random color from colors using the random number
    var randomChosenColor = colors[randomNumber];
    //add that color to the game pattern
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    //flash the chosen color to the user
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function animate(button) {
    // add the class pressed to it which changes the background to gray
    $("#" + button).addClass("pressed");
    // and then removes the class pressed after 1000 ms
    setTimeout(function() {
        $("#" + button).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickPattern[currentLevel]) {
        if (gamePattern.length == userClickPattern.length) {
            console.log(gamePattern);
            console.log(userClickPattern);
            console.log("success");
            $("body").addClass("success");
            setTimeout(() => {
                $("body").removeClass("success");
            }, 500);
            
            setTimeout(function() {
                nextColor();
            }, 1000);
        }
    }

    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("wrong");
        setTimeout(() => {
            $("body").removeClass("wrong")
        }, 500);
        $(".title").text("Failed, Press any Key to Try again.");
        startOver();
    }
}

function startOver() {
    started = false;
    gamePattern = [];
    level = 0;
}

function playSound(sound) {
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

// keydown
$(document).keydown(function() {
    //  if the game hasn't started call nextColor()
    if(!started) {
        nextColor()
    }
})


// .btn click
$(".btn").click(function() {
//grab the id of the pressed button
    if (started){
        var clickedButton = $(this).attr("id");
        //add the id/color to the userClickPattern
        userClickPattern.push(clickedButton);
        console.log(userClickPattern);
        //animate that button passing in the id
        animate(clickedButton);
        playSound(clickedButton);
        //checkanswers by passing in the level
        checkAnswer(userClickPattern.length - 1)
    }



})


