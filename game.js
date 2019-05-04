var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var startGame = false;

var charRadius = 20;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var escPressed = false;
var escCounter = 0;

var charPosX = (canvas.width/2 - charRadius);
var charPosY = (canvas.height/2 - charRadius);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


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
    escCounter ++;
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
  }
  else if(leftPressed && upPressed && charPosX > 0 && charPosY > 0) {
    charPosX -= 2;
    charPosY -= 2;
  }
  else if(rightPressed && downPressed && charPosX < canvas.width && charPosY < canvas.height) {
    charPosX += 2;
    charPosY += 2;
  }
  else if(leftPressed && downPressed && charPosY < canvas.height && charPosX > 0) {
    charPosX -= 2;
    charPosY +=2;
  }
  else if (rightPressed && charPosX < canvas.width) {
    charPosX += 2;
  } else if (leftPressed && charPosX > 0) {
    charPosX -= 2;
  } else if (upPressed && charPosY > 0) {
    charPosY -= 2;
  } else if (downPressed && charPosY < canvas.height) {
    charPosY += 2;
  }
}

var isRunning = true;
var isPaused = escCounter % 2;

function pauseGame() {
  if (escCounter > 0 && escPressed) {
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("PAUSED", 80, 650);
    isRunning = !isRunning;
  }
}


function playGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawChar();
  playerMovement();
  pauseGame();
  if (isRunning) {
    requestAnimationFrame(playGame);
  }
}

playGame();
