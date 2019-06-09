var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var startGame = false;
var gamePaused = false;

var charName = prompt("Please enter your name. Have your fingers ready on WASD and your mouse.");
var bossHp = 2000;
var charHp = 5;

// event variables
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var escPressed = false;

var char = {
  posX: (canvas.width / 2),
  posY: (canvas.height / 2)
};


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
canvas.addEventListener("click", drawBullet);

function Bullet(m, speed) {
  this.posX = char.posX;
  this.posY = char.posY;
  this.width = 10;
  this.height = 10;
  this.speed = speed;
  this.slope = m;
}

var bullets = [];

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
        bossHp -= 10;
        bullets.splice(i, 1);
      }
    }
    if (bullet.posX > 1280) {
      bullets.splice(i,1);
    }
  }
}

// Checking which keys are not being pressed
function keyUpHandler(event) {
  if (event.key === "d" || event.key === "D") {
    rightPressed = false;
  } else if (event.key === "a" || event.key === "A") {
    leftPressed = false;
  } else if (event.key === "w" || event.key === "W") {
    upPressed = false;
  } else if (event.key === "s" || event.key === "S") {
    downPressed = false;
  } else if (event.key === "Escape") {
    escPressed = false;
  }
}

// Checking which keys are being pressed
function keyDownHandler(event) {
  if (event.key === "d" || event.key === "D") {
    rightPressed = true;
  } else if (event.key === "a" || event.key === "A") {
    leftPressed = true;
  } else if (event.key === "w" || event.key === "W") {
    upPressed = true;
  } else if (event.key === "s" || event.key === "S") {
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
  ctx.rect(char.posX - 40, char.posY - 50, charHp * 10, 5);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
  ctx.font = "9px 'Press Start 2P'";
  ctx.fillStyle = "white";
  ctx.fillText(charName, char.posX - 40, char.posY - 55);
  if (charHp <= 0) {
    alert("You suck at this game. Try Again!")
    document.location.reload();
    cancelAnimationFrame();
  }
}

function bossHealth() {
  ctx.beginPath();
  // ctx.rect(270, 660, 680, 40);
  ctx.rect(270, 60, 680, 40);
  ctx.fillStyle = "#540551";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  // ctx.rect(276, 665, bossHp / 3, 30);
  ctx.rect(276, 65, bossHp / 3, 30);
  ctx.fillStyle = "#ba1b3b";
  ctx.fill();
  ctx.closePath();
  ctx.font = "30px 'Press Start 2P'";
  ctx.fillStyle = "white";
  // ctx.fillText("Wall of Flesh", 440, 655);
  ctx.fillText("Wall of Flesh", 440, 55);
  if (bossHp > 1000) {
    bossShooting();
  } else if (bossHp <= 1000) {
    bossBulletSpray();
  }
  if (bossHp == 0) {
    alert("Congratulations! You beat a stationary boss! What do you want from me, a cookie? Play again and beat it faster this time.");
    document.location.reload();
    cancelAnimationFrame();

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

var spawnLineX = 1180;
var spawnRate = 300;
var spawnRateOfDescent = 2.5;
var lastSpawn = -1;
var object1s = [];
var startTime = Date.now();

function spawnObject1() {
  // create the new object
  var object1 = {
    x: 1115,
    y: 325,
  }
  object1s.push(object1);
}

function bossShooting() {
  // get the elapsed time
  var time = Date.now();
  // see if its time to spawn a new object
  if (time > (lastSpawn + 1000)) {
    lastSpawn = time;
    spawnObject1();
  }
  // draw the line where new objects are spawned
  // move each object down the canvas
  for (var i = 0; i < object1s.length; i++) {
    var slope = (325 - char.posY) / (1115 - char.posX);
    var object1 = object1s[i];
    object1.y -= slope * spawnRateOfDescent;
    object1.x -= spawnRateOfDescent;
    var img = new Image();
    img.src = "images/bulletnormal.png";
    ctx.drawImage(img, object1.x, object1.y, 60, 40);

    if (object1.x > char.posX - 30 && object1.x < char.posX + 10 && object1.y > char.posY - 60 && object1.y < char.posY + 20) {
      charHp -= 1;
      object1s.splice(i, 1);
    }
    if (object1.x < 0) {
      object1s.splice(i, 1);
    }
  }
}

var object2s = [];

function spawnObject2() {
  // create the new object
  var object2 = {
    x: spawnLineX,
    y: Math.random() * (canvas.width - 30) + 15,
  }
  object2s.push(object2);
}

function bossBulletSpray() {
  // get the elapsed time
  var time = Date.now();
  // see if its time to spawn a new object
  if (time > (lastSpawn + spawnRate)) {
    lastSpawn = time;
    spawnObject2();
  }
  // draw the line where new objects are spawned
  // move each object down the canvas
  for (var i = 0; i < object2s.length; i++) {
    var object2 = object2s[i];
    object2.x -= spawnRateOfDescent;
    var img = new Image();
    img.src = "images/bulletspray.png";
    ctx.drawImage(img, object2.x, object2.y);

    if (object2.x > char.posX - 30 && object2.x < char.posX + 10 && object2.y > char.posY - 60 && object2.y < char.posY + 20) {
      charHp -= 1;
      object2s.splice(i, 1);
    }
    if (object2.x < 0) {
      object2s.splice(i, 1);
    }
  }

}

var animID;

function pauseGame() {
  if (!gamePaused) {
    canvas.removeEventListener("click", drawBullet); //Prevent spam clicking bullets while paused
    gamePaused = true;
    cancelAnimationFrame(animID);
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0.75)";
    ctx.fill();
    ctx.closePath();
    ctx.font = "40px 'Press Start 2P'";
    ctx.fillStyle = "white";
    ctx.fillText("GAME PAUSED", canvas.width / 3, canvas.height / 2);
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
  drawGun();
  shootBullet();
  drawBoss();
  bossHealth();
  animID = requestAnimationFrame(playGame);
}

playGame();
