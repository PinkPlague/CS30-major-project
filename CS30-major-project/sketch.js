

let katamari, arcanoid;

let playerSprite, squares, circles;
const PLAYER_SPEED = 5;
let playerVars;
let lastDash;
let lastHit;
let state = "startup"
let playerLoadedBool = false;
let levelLoadedBool = false;

let levelStartTimer;


function preload() {
  katamari = loadSound('assets/songfiles/femtanyl_-_KATAMARI.mp3')
  arcanoid = loadSound('assets/songfiles/Cyclone_-_Arcanoid.mp3')
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  playerVars = {
    lives: 5,
    speed: PLAYER_SPEED,
    hit: false,
    hitCooldown: 200,
    invincible: false,
    iFrameTimer: 0,
    isDashing: false,
    dashTimer: 0,
    dashCooldown: 300,
    dashMultplier: 3.5,
    width: 30,
    height: 30,
    stretchedMax: 34,
    stretchedMin: 26,
    nonStretched: 30,
    colour: color(0, 254, 255),
  };

  

  obsticals();
}

function draw() {

  rectMode(CENTER);

  if (state === "startup") {
    startupMenu();
  }
  else if (state === "mainMenu") {
    mainMenu();
  }
  else if (state === "levelLoaded -1") {
    background(30, 5, 20);
    playerLoad();
    movement();
    border();
    loadLevel(-1);
    hit();
  }
  

  
  
}

function mousePressed() {
  if (state === "startup") {
    state = "mainMenu"
  }
  if (state === "mainMenu") {
    if (mouseX >= width/2-100&& mouseX <= width/2+100&& mouseY >= height/3*2-25&& mouseY <= height/3*2+25) {
      state = "levelLoaded -1"
    }
  }
} 

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function movement() {
  // movement
	if (kb.pressing("right")) {
  playerSprite.vel.x = playerVars.speed;
	playerSprite.vel.y = 0;
  playerSprite.height = playerVars.stretchedMin;
  playerSprite.bearing = 90;
  } 
	if (kb.pressing("left")) {
  playerSprite.vel.x = -playerVars.speed;
	playerSprite.vel.y = 0;
  playerSprite.height = playerVars.stretchedMin;
  playerSprite.bearing = 270;
  }
	if (kb.pressing("up")) {
  playerSprite.vel.y = -playerVars.speed;
  playerSprite.width = playerVars.stretchedMin;
  playerSprite.bearing = 0;
  } 
	if (kb.pressing("down")) {
  playerSprite.vel.y = playerVars.speed;
  playerSprite.width = playerVars.stretchedMin;
  playerSprite.bearing = 180;
  } 
	if (!kb.pressing("right")&&!kb.pressing("left")&&!kb.pressing("down")&&!kb.pressing("up")) {
	playerSprite.vel.x = 0;
	playerSprite.vel.y = 0;

  playerSprite.height = playerVars.nonStretched;
  playerSprite.width = playerVars.nonStretched;
  }
  if (kb.pressing("right")&&kb.pressing("left")&&kb.pressing("down")&&kb.pressing("up")) {
  playerSprite.vel.x = 0;
  playerSprite.vel.y = 0;
  }
  if (kb.pressing("right")&&kb.pressing("left")) {
	playerSprite.vel.x = 0;
  }
  if (kb.pressing("up")&&kb.pressing("down")) {
	playerSprite.vel.y = 0;
  }

  //DASH
  if (kb.presses("space")) {
  if (!playerVars.isDashing) {
  lastDash = millis();
  playerVars.speed *= playerVars.dashMultplier;
  playerVars.invincible = true;
  playerVars.isDashing = true;
  }
	}
  if (millis() > lastDash + playerVars.dashCooldown) {
  playerVars.speed = PLAYER_SPEED;
  playerVars.invincible = false;
  playerVars.isDashing = false;
  } 
}

function border() {
  if (playerSprite.x < 15) {
    playerSprite.x = 15;
    }
    
    if (playerSprite.x > width-15) {
    playerSprite.x = width-15;
    }
    
    if (playerSprite.y < 15){
    playerSprite.y = 15;
    }
  
    if (playerSprite.y > height-15){
    playerSprite.y = height-15;
    }
}

function reset() {
  squares.removeAll();
  circles.removeAll();
  // playerSprite.removeAll();
}
function startupMenu() {
  background(30, 5, 20);
  textSize(50);
  fill(255, 0, 67)
  text("Click To Load Main Menu", width/2-300, height/2);
}
function mainMenu() {
  background(30, 5, 20);
  fill(83, 4, 28)
  stroke(255, 0, 85)
  strokeWeight(10)
  rect(width/2,height/3*2, 200, 50, 50)

}
function playerLoad() {
  if (!playerLoadedBool) {
    noStroke();
    //create sprite
    playerSprite = new Sprite(width/2, height/2, 30, 30);
    playerSprite.color = playerVars.colour;
    playerSprite.rotationLock = true;
    playerSprite.vel.x = 0;
    playerSprite.vel.y = 0;
    playerSprite.layer = 2;

    playerLoadedBool = true;
  }
}
function obsticals() {
  noStroke();
  // create obsticles group
  //squares
  squares = new Group();
  squares.colour = color(252, 31, 109);
  squares.collider = "n";
  squares.friction = 0;
  squares.layer = 1;
  //circles
  circles = new Group();
  circles.colour = color(252, 31, 109);
  circles.collider = "n";
  circles.friction = 0;
  circles.layer = 1;
}
function loadLevel(levelId) {
  if (!levelLoadedBool) {
    background(30, 5, 20);
    if (levelId === -1) {
      level_test();
    }
    if (levelId === 1) {
      level_Katamari();
    }

    levelLoadedBool = true;
  }
}

function level_test() {
  strokeWeight(0);
  noStroke();
  obsticals();
  levelStartTimer = millis();

  new squares.Sprite(400, 400, 50, 50)
}

function level_Katamari() {
  levelStartTimer = millis();

}

function hit() {
  if (!playerVars.invincible&&(playerSprite.overlaps(squares)||playerSprite.overlaps(circles))) {
    playerVars.lives--;
    knockback();
  }
}

function knockback() {
  if (!playerVars.hit) {
    lastHit = millis();
    playerVars.speed *= -3;
    playerVars.hit = true;
    }
    if (millis() > lastHit + playerVars.hitCooldown) {
    playerVars.speed = PLAYER_SPEED;
    playerVars.hit = false;
    } 
}