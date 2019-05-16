// i hate this

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var startGame = false;
var gamePaused = false;
var mouseDown = false;

var charRadius = 20;

// event variables
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

var bullet = {
  posX: char.posX,
  posY: char.posY,
  width: 10,
  height: 10,
  speed: 5

};



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
canvas.addEventListener("mousedown", mouseDownHandler, false);
canvas.addEventListener("mouseup", mouseUpHandler, getCoords, false);

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
  } else if (event.key === "a") {
    leftPressed = true;
  } else if (event.key === "w") {
    upPressed = true;
  } else if (event.key === "s") {
    downPressed = true;
  } else if (event.key === "Escape") {
    escPressed = true;
    pauseGame();
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
    shootBullet();
  }
}

function drawChar() {
  ctx.beginPath();
  ctx.arc(char.posX, char.posY, charRadius, 0, Math.PI * 2, false);
  ctx.fillStyle = "#0095DD";
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

function bulletMovement() {
  if (rightPressed && upPressed && bullet.posX < canvas.width && bullet.posY > 0) {
    bullet.posX -= 2;
    bullet.posY += 2;
  } else if (leftPressed && upPressed && bullet.posX > 0 && bullet.posY > 0) {
    bullet.posX += 2;
    bullet.posY += 2;
  } else if (rightPressed && downPressed && bullet.posX < canvas.width && bullet.posY < canvas.height) {
    bullet.posX -= 2;
    bullet.posY -= 2;
  } else if (leftPressed && downPressed && bullet.posY < canvas.height && bullet.posX > 0) {
    bullet.posX += 2;
    bullet.posY -= 2;
  } else if (rightPressed && bullet.posX < canvas.width) {
    bullet.posX -= 2;
  } else if (leftPressed && bullet.posX > 0) {
    bullet.posX += 2;
  } else if (upPressed && bullet.posY > 0) {
    bullet.posY += 2;
  } else if (downPressed && bullet.posY < canvas.height) {
    bullet.posY -= 2;
  }

}


function drawGun() {
  ctx.beginPath();
  ctx.rect(char.posX - 5, char.posY - 5, 10, 10);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.closePath();
}



function getCoords(event) {
  var coorX
  var coorY
  coorX = event.offsetX;
  coorY = event.offsetY;
}

function drawBullet() {
  ctx.beginPath();
  ctx.rect(bullet.posX, bullet.posY, bullet.width, bullet.height);
  bullet.posX = char.posX;
  bullet.posY = char.posY;
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function bulletUpdate() {
  bullet.posX = char.posX;
  bullet.posY = char.posY;
}

function shootBullet() {
  if (mouseClicked) {
    mouseDown = true;
    console.log(event.offsetY);
  }
  if (!mouseClicked) {
    mouseDown = false;
  }


  if (mouseDown) {
    bullet.posX = bullet.posX + bullet.speed;
    bullet.speed = bullet.speed + 10;
    drawBullet();
  }
  if (!mouseDown){
      bullet.speed = 0;
      bulletUpdate();
      return;

  if (bullet.posX < canvas.width && bullet.posX > 0 && bullet.posY > 0 && bullet.posY < canvas.height && mouseDown) {
    var coorX = event.offsetX;
    var coorY = event.offsetY;
    var slope = (coorY-bullet.posY)/(coorX-bullet.posX);
    bullet.posX += 0.1
    bullet.posY += slope * 0.1
    drawBullet();

  }

}

//function


var animID;

function pauseGame() {
  if (!gamePaused) {
    gamePaused = true;
    mouseClicked = false;
    cancelAnimationFrame(animID)
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0.75)";
    ctx.fill();
    ctx.closePath();
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
  bulletMovement();
  animID = requestAnimationFrame(playGame);
}

playGame();
