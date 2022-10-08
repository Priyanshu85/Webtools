
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  checkans(userClickedPattern.length-1);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  
});

function checkans(color) {
  if(userClickedPattern[color]===gamePattern[color]){
    console.log("Success");
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(() => {
        nextSequence();
      }, 1000);

    }
  }
else{
  console.log("Wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("Game Over, Press Any Key to Restart");
  var audio = new Audio ("wrong.mp3");
  audio.play();
startover();
} 
}
function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}



function startover(){
  gamePattern = [];
  level = 0;
  started = false;
}





function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
  var randomnum;
  randomnum = Math.floor(Math.random()*4);
 var randomchosencolor = buttonColours[randomnum];
//  console.log(randomchosencolor);
 gamePattern.push(randomchosencolor);
 console.log(gamePattern);
 $("#" + randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomchosencolor);
}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}