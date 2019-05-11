// TODO:
// DRAW GUN AS RECTANGLE
// MAKE GUN FOLLOW CHARACTER



var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var startGame = false;
var gamePaused = false;

var charRadius = 20;
var gunPosition = charRadius / 2;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var escPressed = false;
var mouseClicked = false;

var char = {
  posX: (canvas.width / 2),
  posY: (canvas.height / 2)

};

var gun = {
  posX: (canvas.width / 2),
  posY: (canvas.height / 2)
};

var bullet = {
  posX: gun.posX - 4,
  posY: gun.posY - 4,
  width: 8,
  height: 8,
  speed: 1
};



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




// Checking which keys are being pressed
function keyDownHandler(event) {
  if (event.key === "d") {
    rightPressed = true;
    gun.posX = gun.posX - gunPosition;
  } else if (event.key === "a") {
    leftPressed = true;
    gun.posX = gun.posX + gunPosition;
  } else if (event.key === "w") {
    upPressed = true;
    gun.posY = gun.posY - gunPosition;
  } else if (event.key === "s") {
    downPressed = true;
    gun.posY = gun.posY + gunPosition;
  } else if (event.key === "Escape") {
    escPressed = true;
    pauseGame();
  } else {
    gun.posX = char.posX;
    gun.posY = char.posY;
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
  ctx.arc(char.posX, char.posY, charRadius, 0, Math.PI * 2, false);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawGun() {
  ctx.beginPath();
  ctx.rect(char.posX - 5, char.posY - 5, 10, 10);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.closePath();
}

function fireBullet() {
  ctx.beginPath();
  ctx.rect(bullet.posX, bullet.posY, bullet.width, bullet.height);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function playerMovement() {
  if (rightPressed && upPressed && char.posX < canvas.width && char.posY > 0) {
    char.posX += 2;
    char.posY -= 2;
  } else if (leftPressed && upPressed && char.posX > 0 && char.posY > 0) {
    char.posX -= 2;
    char.posY -= 2;
  } else if (rightPressed && downPressed && char.posX < canvas.width && char.posY < canvas.height) {
    char.posX += 2;
    char.posY += 2;
  } else if (leftPressed && downPressed && char.posY < canvas.height && char.posX > 0) {
    char.posX -= 2;
    char.posY += 2;
  } else if (rightPressed && char.posX < canvas.width) {
    char.posX += 2;
  } else if (leftPressed && char.posX > 0) {
    char.posX -= 2;
  } else if (upPressed && char.posY > 0) {
    char.posY -= 2;
  } else if (downPressed && char.posY < canvas.height) {
    char.posY += 2;
  }
}

function shootBullet() {
  if (mouseClicked) {

    while (bullet.posX < canvas.width) {
      fireBullet();
      bullet.posX = bullet.posX + bullet.speed;
    }
  }
}

var animID;

function pauseGame() {
  if (!gamePaused) {
    gamePaused = true;
    cancelAnimationFrame(animID)
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("GAME PAUSED", canvas.width / 2.5, canvas.height / 2);
  } else if (gamePaused) {
    gamePaused = false;
    requestAnimationFrame(playGame);
  }
}

function playGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawChar();
  drawGun();
  playerMovement();
  shootBullet();
  animID = requestAnimationFrame(playGame);
}

playGame();
