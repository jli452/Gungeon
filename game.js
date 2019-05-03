var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


var charRadius = 20;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

var charPosX = (canvas.width - charRadius);
var charPosY = (canvas.height - charRadius);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Keycodes for WASD
// W: 87
// A: 65
// S: 83
// D: 68

function keyUpHandler(event) {
  if (event.keyCode === 68) {
    rightPressed = false;
  } else if (event.keyCode === 65) {
    leftPressed = false;
  } else if (event.keyCode === 87) {
    upPressed = false;
  } else if (event.keyCode === 83) {
    downPressed = false;
  }
}

function keyDownHandler(event) {
  if (event.keyCode === 68) {
    rightPressed = true;
  } else if (event.keyCode === 65) {
    leftPressed = true;
  } else if (event.keyCode === 87) {
    upPressed = true;
  } else if (event.keyCode === 83) {
    downPressed = true;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(charPosX, charPosY, charRadius, 0, Math.PI * 2, false);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function playerMovement() {
  if (rightPressed && upPressed) {
    charPosX += 3;
    charPosY -=3;
  }
  else if(leftPressed && upPressed) {
    charPosX -= 3;
    charPosY -=3;
  }
  else if(rightPressed && downPressed) {
    charPosX += 3;
    charPosY +=3;
  }
  else if(leftPressed && downPressed) {
    charPosX -= 3;
    charPosY +=3;
  }
  else if (rightPressed && charPosX < canvas.width) {
    charPosX += 3;
  } else if (leftPressed && charPosX > 0) {
    charPosX -= 3;
  } else if (upPressed && charPosY > 0) {
    charPosY -= 3;
  } else if (downPressed && charPosY < canvas.height) {
    charPosY += 3;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  playerMovement();
}
var interval = setInterval(draw, 10);
