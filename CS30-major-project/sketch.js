


let playerSprite, squares, circles;
const PLAYER_SPEED = 5;
let playerVars;
let lastDash;
let state = "startup"



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

function draw() {
  if (state === "startup") {
    startupMenu();
  }


  // background(0);

  // movement();
  // border();
  
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

function startupMenu() {
  background(30, 5, 20);
}