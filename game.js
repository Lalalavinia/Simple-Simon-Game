// Initialize 
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let gameStart = false;
let level = 0;
let click = 0;

// Press key to start.
$(document).keypress(() => {
    if (!gameStart) {
        $("#level-title").text("level " + level);
        nextSequence();
        gameStart = true;
    }
})

// User clicks button.
$(".btn").click(function () {
    click++;
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animationPress(userChosenColor);
    checkAnswer(userChosenColor);

})

// Check every answer.
function checkAnswer(currenLevel) {
    if (currenLevel === gamePattern[click - 1]) {
        if (userClickedPattern.length === gamePattern.length) {
            userClickedPattern = [];
            click = 0;
            setTimeout(nextSequence(), 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {$("body").removeClass("game-over")}, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }


}
// Start over initialize.
function startOver() {
    userClickedPattern = [];
    buttonColors = ["red", "blue", "green", "yellow"];
    gamePattern = [];
    gameStart = false;
    level = 0;
    click = 0;
}

// Call for next random button.
function nextSequence() {
    level++;
    $("#level-title").text("level " + level);
    let randomNumber = Math.ceil(Math.random() * 3);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    for (let i = 0; i <= gamePattern.length; i++) {
        playSound(randomChosenColor);
        $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    }
}

// Play audio.
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

// Play animation on pressed.
function animationPress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed"); 100
    })
}
