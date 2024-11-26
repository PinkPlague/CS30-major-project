


let playerSprite, squares, circles;
const PLAYER_SPEED = 5;
let playerVars;
let lastDash;
let state = "startup"
let playerLoaded = false;


function setup() {
  createCanvas(windowWidth, windowHeight);

  playerVars = {
    lives: 5,
    speed: PLAYER_SPEED,
    hit: false,
    invincible: false,
    iFrameTimer: 0,
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
}

function draw() {
  if (state === "startup") {
    startupMenu();
  }
  else if (state === "mainMenu") {
    mainMenu();
  }
  else if (state === "levelLoaded"&&playerLoaded===false) {
    levelLoad();
    playerLoaded=true;
  }
  // background(0);

  // movement();
  // border();
  
}

function mousePressed() {
  if (state === "startup") {
    state = "mainMenu"
  }
  if (state === "mainMenu") {
    if (mouseX >= width/2-100&& mouseX <= width/2+100&& mouseY >= height/2&& mouseY <= height/2+50) {
      state = "levelLoaded"
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
  } 
	if (kb.pressing("left")) {
  playerSprite.vel.x = -playerVars.speed;
	playerSprite.vel.y = 0;
  playerSprite.height = playerVars.stretchedMin;
  } 
	if (kb.pressing("up")) {
  playerSprite.vel.y = -playerVars.speed;
  playerSprite.width = playerVars.stretchedMin;
  } 
	if (kb.pressing("down")) {
  playerSprite.vel.y = playerVars.speed;
  playerSprite.width = playerVars.stretchedMin;
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
  lastDash = millis();
  playerVars.speed *= playerVars.dashMultplier;
  playerVars.invincible = true;
	}
  if (millis() > lastDash + playerVars.dashCooldown) {
    playerVars.speed = PLAYER_SPEED;
    playerVars.invincible = false;
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
  rect(width/2-100,height/2, 200, 50, 50)

}
function levelLoad(levelId) {
  background(30, 5, 20);

  playerSprite = new Sprite(width/2, height/2, 30, 30);
  playerSprite.color = playerVars.colour;
  playerSprite.rotationLock = false;
  playerSprite.vel.x = 0;
  playerSprite.vel.y = 0;
  
  // create obsticles group
  //squares
  squares = new Group();
  squares.colour = color(252, 31, 109)
  //circles
  circles = new Group();
  circles.colour = color(252, 31, 109)

  //overlaps
  playerSprite.overlaps(squares, )
  playerSprite.overlaps(circles, )
}