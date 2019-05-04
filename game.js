var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var startGame = false;
var gamePaused = false;

var charRadius = 20;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var escPressed = false;
var mouseClicked = false;


var charPosX = (canvas.width / 2 - charRadius);
var charPosY = (canvas.height / 2 - charRadius);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);


// Checking which keys are not being pressed
function keyUpHandler(event) {
  if (event.key === "d") {
    rightPressed = false;
  } else if (event.key === "a") {
    leftPressed = false;
  } else if (event.key === "w") {
    upPressed = false;
  } else if (event.key === "s") {
    downPressed = false;
  } else if (event.key === "Escape") {
    escPressed = false;
  }
}

// Cheecking which keys are being pressed
function keyDownHandler(event) {
  if (event.key === "d") {
    rightPressed = true;
  } else if (event.key === "a") {
    leftPressed = true;
  } else if (event.key === "w") {
    upPressed = true;
  } else if (event.key === "s") {
    downPressed = true;
  } else if (event.key === "Escape") {
    escPressed = true;
    pauseGame()
  }
}

// Check if mouse is being clicked
function mouseUpHandler(event) {
  if (event.button === 0) {
    mouseClicked = false;
  }
}

function mouseDownHandler(event) {
  if (event.button === 0) {
    mouseClicked = true;
  }
}

function drawChar() {
  ctx.beginPath();
  ctx.arc(charPosX, charPosY, charRadius, 0, Math.PI * 2, false);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function playerMovement() {
  if (rightPressed && upPressed && charPosX < canvas.width && charPosY > 0) {
    charPosX += 2;
    charPosY -= 2;
  } else if (leftPressed && upPressed && charPosX > 0 && charPosY > 0) {
    charPosX -= 2;
    charPosY -= 2;
  } else if (rightPressed && downPressed && charPosX < canvas.width && charPosY < canvas.height) {
    charPosX += 2;
    charPosY += 2;
  } else if (leftPressed && downPressed && charPosY < canvas.height && charPosX > 0) {
    charPosX -= 2;
    charPosY += 2;
  } else if (rightPressed && charPosX < canvas.width) {
    charPosX += 2;
  } else if (leftPressed && charPosX > 0) {
    charPosX -= 2;
  } else if (upPressed && charPosY > 0) {
    charPosY -= 2;
  } else if (downPressed && charPosY < canvas.height) {
    charPosY += 2;
  }
}

function shootBullet() {
  if (mouseClicked) {
    ctx.beginPath();
    ctx.arc(100, 100, 10, 0, Math.PI * 2, false);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
}

var animID;

function pauseGame() {
  if (!gamePaused) {
    gamePaused = true;
    cancelAnimationFrame(animID)
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("GAME PAUSED", 80, 650);
  } else if (gamePaused) {
    gamePaused = false;
    requestAnimationFrame(playGame);
  }
}

function playGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawChar();
  playerMovement();
  shootBullet();
  animID = requestAnimationFrame(playGame);
}

playGame();
