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
canvas.addEventListener("mouseup", mouseUpHandler, false);

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


// function drawChar() {
//   var img = new Image();
//   img.src = "images/charright.png";
//   ctx.drawImage(img, char.posX, char.posY, 150, 150);
// }

function drawCharRight() {
  var img = new Image();
  img.src = "images/charright.png";
  ctx.drawImage(img, char.posX, char.posY, 150, 150);
}

function drawCharLeft() {
  var img = new Image();
  img.src = "images/charleft.png";
  ctx.drawImage(img, char.posX, char.posY, 150, 150);
}

function playerMovement() {
  if (rightPressed && upPressed && char.posX < canvas.width && char.posY > 0) {
    drawCharRight();
    char.posX += 2;
    char.posY -= 2;
  } else if (leftPressed && upPressed && char.posX > 0 && char.posY > 0) {
    drawCharLeft();
    char.posX -= 2;
    char.posY -= 2;
  } else if (rightPressed && downPressed && char.posX < canvas.width && char.posY < canvas.height) {
    drawCharRight();
    char.posX += 2;
    char.posY += 2;
  } else if (leftPressed && downPressed && char.posY < canvas.height && char.posX > 0) {
    drawCharLeft();
    char.posX -= 2;
    char.posY += 2;
  } else if (rightPressed && char.posX < canvas.width) {
    drawCharRight();
    char.posX += 2;
  } else if (leftPressed && char.posX > 0) {
    drawCharLeft();
    char.posX -= 2;
  } else if (upPressed && char.posY > 0) {
    drawCharRight();
    char.posY -= 2;
  } else if (downPressed && char.posY < canvas.height) {
    drawCharRight();
    char.posY += 2;
  } else {
    drawCharRight();
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
  ctx.rect(char.posX + 90, char.posY + 90, 20, 10);
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
  ctx.rect(bullet.posX + 90, bullet.posY + 90, bullet.width, bullet.height);
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
    // console.log(event.offsetY);
  }
  if (!mouseClicked) {
    mouseDown = false;
  }


  if (mouseDown) {
    bullet.posX = bullet.posX + bullet.speed;
    bullet.speed = bullet.speed + 10;
    drawBullet();
    // var coorX = event.offsetX;
    // var coorY = event.offsetY;
    // var slope = (coorY-bullet.posY)/(coorX-bullet.posX);
    // bullet.posX += 0.1
    // bullet.posY += slope * 0.1
    // drawBullet();
  }
  if (!mouseDown) {
    bullet.speed = 0;
    bulletUpdate();
    return;
}
}
// newly spawned objects start at Y=25
var spawnLineX = 1280;
// spawn a new object every 1500ms
var spawnRate = 500;
// set how fast the objects will fall
var spawnRateOfDescent = 2.5;
// when was the last object spawned
var lastSpawn = -1;
// this array holds all spawned object
var objects = [];
// save the starting time (used to calc elapsed time)
var startTime = Date.now();

function spawnRandomObject() {

  // select a random type for this new object
  var t;


  if (Math.random() < 0.50) {
    t = "red";
  } else {
    t = "blue";
  }

  // create the new object
  var object = {
    // set this objects type
    type: t,
    // set x randomly but at least 15px off the canvas edges
    x: spawnLineX,
    // set x to start on the line where objects are spawned
    y: Math.random() * (canvas.width - 30) + 15,
  }

  // add the new object to the objects[] array
  objects.push(object);
}



function spawnMonsters() {
  // get the elapsed time
  var time = Date.now();
  // see if its time to spawn a new object
  if (time > (lastSpawn + spawnRate)) {
    lastSpawn = time;
    spawnRandomObject();
  }
  // draw the line where new objects are spawned
  ctx.beginPath();
  ctx.moveTo(spawnLineX, 0);
  ctx.lineTo(spawnLineX, canvas.height);
  ctx.stroke();
  // move each object down the canvas
  for (var i = 0; i < objects.length; i++) {
    var object = objects[i];
    object.x -= spawnRateOfDescent;
    ctx.beginPath();
    ctx.arc(object.x, object.y, 8, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = object.type;
    ctx.fill();
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
  drawGun();
  playerMovement();
  shootBullet();
  bulletMovement();
  spawnMonsters();
  animID = requestAnimationFrame(playGame);
}

playGame();
