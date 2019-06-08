// i hate this

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var startGame = false;
var gamePaused = false;
var mouseDown = false;

var charName = prompt("Please enter your name");
var bossHp = 2000;
var charHp = 10;

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
  if (coorX < char.posX) {
    speed = -5
  } else {
    speed = 5
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
    if (bossHp > 0) {
      if ((bullet.posX > 1040 && bullet.posX < 1050 && bullet.posY > 6 && bullet.posY < 170) || (bullet.posX > 1040 && bullet.posX < 1050 && bullet.posY > 505 && bullet.posY < 650)) {
        bossHp -= 50;
        console.log(bossHp);
      }
    }
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
  ctx.drawImage(img, char.posX - 90, char.posY - 80, 150, 150);
}

function drawCharLeft() {
  var img = new Image();
  img.src = "images/charleft.png";
  ctx.drawImage(img, char.posX - 90, char.posY - 80, 150, 150);
}

function charHealth() {
  ctx.beginPath();
  ctx.rect(char.posX - 40, char.posY - 50, charHp * 5, 5);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
  ctx.font = "10px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(charName, char.posX - 40, char.posY - 58);
  if (charHp == 0) {
    alert("You suck at this game. Try Again!")
    document.location.reload();
  }
}

function bossHealth() {
  ctx.beginPath();
  ctx.rect(40, 60, bossHp / 3, 30);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
  ctx.font = "40px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Wall of Flesh", 40, 60);
  if (bossHp <= 1000) {
    bossBulletSpray();
  }
  if (bossHp == 0) {
    alert("Congratulations! You beat a stationary boss! What do you want from me, a cookie?");
    document.location.reload();
  }
}

function drawBoss() {
  var img = new Image();
  img.src = "images/boss.png";
  ctx.drawImage(img, 1030, 0, 320, 720);
}

function playerMovement() {
  if (rightPressed && upPressed && char.posX < 750 && char.posY > 0) {
    drawCharRight();
    char.posX += 2;
    char.posY -= 2;
  } else if (leftPressed && upPressed && char.posX > 0 && char.posY > 0) {
    drawCharLeft();
    char.posX -= 2;
    char.posY -= 2;
  } else if (rightPressed && downPressed && char.posX < 750 && char.posY < canvas.height) {
    drawCharRight();
    char.posX += 2;
    char.posY += 2;
  } else if (leftPressed && downPressed && char.posY < canvas.height && char.posX > 0) {
    drawCharLeft();
    char.posX -= 2;
    char.posY += 2;
  } else if (rightPressed && char.posX < 750) {
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
  var img = new Image();
  img.src = "images/gun.png";
  ctx.drawImage(img, char.posX - 14, char.posY - 10, 35, 40);
}


// newly spawned objects start at X=1280
var spawnLineX = 1280;
// spawn a new object every 500ms
var spawnRate = 500;
// set how fast the objects will fall
var spawnRateOfDescent = 2.5;
// when was the last object spawned
var lastSpawn = -1;
// this array holds all spawned object
var objects = [];
// save the starting time (used to calc elapsed time)
var startTime = Date.now();

function spawnObject() {
  // create the new object
  var object = {
    x: spawnLineX,
    y: Math.random() * (canvas.width - 30) + 15,
  }
  objects.push(object);
}

function bossBulletSpray() {
  // get the elapsed time
  var time = Date.now();
  // see if its time to spawn a new object
  if (time > (lastSpawn + spawnRate)) {
    lastSpawn = time;
    spawnObject();
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
    var img = new Image();
    img.src = "images/bulletspray.png";
    ctx.drawImage(img, object.x, object.y,);

    if (object.x > char.posX-30 && object.x < char.posX + 10 && object.y > char.posY - 60 && object.y < char.posY + 20) {
      charHp-=1;
      console.log(charHp);
    }
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
  playerMovement();
  charHealth();
  bossHealth();
  drawGun();
  shootBullet();
  drawBoss();
  animID = requestAnimationFrame(playGame);
}

playGame();
