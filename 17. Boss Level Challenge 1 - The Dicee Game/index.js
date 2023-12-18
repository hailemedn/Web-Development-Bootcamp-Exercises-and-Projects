var randomNo1 = Math.floor(Math.random() * 6) + 1;
var randomNo2 = Math.floor(Math.random() * 6) + 1;


var randomDiceImage1 =  "dice" + randomNo1 + ".png";
var randomDiceImage2 =  "dice" + randomNo2 + ".png";

var randomImageSource1 = "images/" + randomDiceImage1;
var randomImageSource2 = "images/" + randomDiceImage2;

document.querySelector(".img1").setAttribute("src", randomImageSource1);
document.querySelector(".img2").setAttribute("src", randomImageSource2);

//if player 1 wins
if(randomNo1 > randomNo2) {
    document.querySelector("h1").textContent = "🚩 Player 1 Wins"
}

//if player 2 wins
else if(randomNo1 < randomNo2) {
    document.querySelector("h1").textContent = "Player 2 Wins 🚩"
}

//draw
else {
    document.querySelector("h1").textContent = "Draw!"
}