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

function Bullet(m, speed) {
  this.posX = char.posX;
  this.posY = char.posY;
  this.width = 10;
  this.height = 10;
  this.speed = speed;
  this.slope = m;
}

var bullets = [];

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
canvas.addEventListener("click", drawBullet);


function drawBullet(event) {
  let coorX = event.offsetX;
  let coorY = event.offsetY;
  let slope = (coorY - char.posY) / (coorX - char.posX);
  console.log(slope);
  // bullet speed too fast when facing north and south
  // if (slope > 1 || slope < -1 && coorX < char.posX) {
  //   speed = 1
  // } else if (slope > 1 || slope < -1 && coorX > char.posX) {
  //   speed = -1
  // }
  if (coorX < char.posX) {
    speed = -6
  } else {
    speed = 6
  }
  bullets.push(new Bullet(slope, speed));
}


function shootBullet() {
  for (i = 0; i < bullets.length; i++) {
    bullet = bullets[i];
    ctx.beginPath();
    ctx.rect(bullet.posX + 20, bullet.posY, bullet.width, bullet.height);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    bullet.posY += bullet.slope * bullet.speed;
    bullet.posX += bullet.speed;
  }
}

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

function drawCharRight() {
  var img = new Image();
  img.src = "images/charright.png";
  ctx.drawImage(img, char.posX - 90, char.posY - 90, 150, 150);
}

function drawCharLeft() {
  var img = new Image();
  img.src = "images/charleft.png";
  ctx.drawImage(img, char.posX - 90, char.posY - 90, 150, 150);
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

function drawGun() {
  ctx.beginPath();
  ctx.rect(char.posX, char.posY, 20, 10);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.closePath();
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

var animID;

function pauseGame() {
  if (!gamePaused) {
    canvas.removeEventListener("click", drawBullet); //Prevent spam clicking bullets while paused
    gamePaused = true;
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
    canvas.addEventListener("click", drawBullet); //add back the ability to click to spawn bullets
    requestAnimationFrame(playGame);
  }
}

function playGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGun();
  playerMovement();
  shootBullet();
  spawnMonsters();
  animID = requestAnimationFrame(playGame);
}

playGame();
