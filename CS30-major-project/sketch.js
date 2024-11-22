


let playerSprite;
const PLAYER_SPEED = 5;
let playerVars;
let lastDash;


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
    width: 30,
    height: 30,
    stretchedMax: 34,
    stretchedMin: 28,
    nonStretched: 30,
    colour: color(0, 254, 255),
  };

  playerSprite = new Sprite(200, 200, 30, 30);
  playerSprite.color = playerVars.colour;
  playerSprite.rotationLock = false;
  playerSprite.vel.x = 0;
  playerSprite.vel.y = 0;
  
}

function draw() {
  background(220);

  movement();
  border();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function movement() {
  // movement
	if (kb.pressing("right")) {
  playerSprite.vel.x = playerVars.speed;
	playerSprite.vel.y = 0;
  } 
	if (kb.pressing("left")) {
  playerSprite.vel.x = -playerVars.speed;
	playerSprite.vel.y = 0;
  } 
	if (kb.pressing("up")) {
  playerSprite.vel.y = -playerVars.speed;
  } 
	if (kb.pressing("down")) {
  playerSprite.vel.y = playerVars.speed;
  } 
	if (!kb.pressing("right")&&!kb.pressing("left")&&!kb.pressing("down")&&!kb.pressing("up")) {
	playerSprite.vel.x = 0;
	playerSprite.vel.y = 0;
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
  playerVars.speed *= 2;
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