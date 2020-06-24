var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;
var lifeLines = 3;
var lives = 3;
var restarted = false;
var restartLevel = 0;

//On a button click, activate an action
$(".lifeline-btn").click(function() {
  lifeLines--;
  if (alterOutput(lifeLines, level) == 1) {
    for (var i = 0; i < level; i++) {
      showPattern(i);
    }
  };
});


//Get the pattern to go continously
function showPattern(i) {
  setTimeout(function() {
    $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
    playSound(i);
  }, 500 * i);
}


//Press a key to start
$(document).keydown(function() {
  $("#lives").html("Lives: ❤️❤️❤️");
  $("#lifelines").html("Lifelines: ⭐⭐⭐");

  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});


//Choose a color
$(".btn").click(function() {
  console.log("You have clicked a color");

  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  console.log("This is level: " + level);
  if (!restarted) {
    checkAnswer(userClickedPattern.length - 1);
  } else {
    console.log("Considering you have restarted, check from level 0");
    checkAnswer(restartLevel);
    restarted = false;
  };
});


//Check the user has picked the correct color
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Correct Color chosen");
    if (restarted) {
      restartLevel++;
    }
    console.log("restartLevel" + restartLevel);
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    lives--;
    console.log("Number of lives: " + lives);
    alterOutput(lives, level);

    $("body").addClass("game-over");
    $("#level-title").text(lives + " lives remaining, Please input the pattern again!");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");

    if (lives > 0) {
      //reset user input values
      redoSequence();
    } else {
      //play game over sound?
      gameOver();
      startOver();

    }
  }
}


function gameOver() {
  $("body").addClass("game-over");
  $("#level-title").text("Game Over! Press any key to restart");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 700);
}


function alterOutput(type, currLevel) {
  console.log("alterOutput");
  console.log("how many lives?");
  if (type === lifeLines) {
    if (lifeLines === 2) {
      $("#lifelines").html("Lifelines: ⭐⭐");
      return 1;
    } else if (lifeLines == 1) {
      $("#lifelines").html("Lifelines: ⭐");
      return 1;
    } else {
      $("#lifelines").html("Sorry, You have no lifelines left!");
      return 0;
    }
  } else {
    if (lives === 2) {
      $("#lives").html("Lives: ❤️❤️");
    } else if (lives === 1) {
      $("#lives").html("Lives: ❤️");
    } else {
      console.log("You have zero lives left");
      $("#lives").html("Sorry, You have no lives left!");
      return 0;
    }
  }
  return 0;

}
//Show the color
function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


//Play Sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


//Flash the button
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Start Over
function startOver() {
  level = 0;
  lives = 3;
  gamePattern = [];
  started = false;
  restarted = false;

}

function redoSequence() {
  userClickedPattern = [];
  restarted = true;
  restartLevel = 0;
}
