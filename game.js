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

function keyUpHandler(event) {
  if (event.key == "Right" || event.key == "ArrowRight") {
    rightPressed = false;
  } else if (event.key == "Left" || event.key == "ArrowLeft") {
    leftPressed = false;
  } else if (event.key == "Up" || event.key == "ArrowUp") {
    upPressed = false;
  } else if (event.key == "Down" || event.key == "ArrowDown") {
    downPressed = false;
  }
}

function keyDownHandler(event) {
  if (event.key == "Right" || event.key == "ArrowRight") {
    rightPressed = true;
  } else if (event.key == "Left" || event.key == "ArrowLeft") {
    leftPressed = true;
  } else if (event.key == "Up" || event.key == "ArrowUp") {
    upPressed = true;
  } else if (event.key == "Down" || event.key == "ArrowDown") {
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
