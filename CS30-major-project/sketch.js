let playerSprite;
const PLAYER_SPEED = 5;
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  playerSprite = new Sprite(200, 200, 30, 30);
  playerSprite.color = color(255, 0, 0);
  playerSprite.rotationLock = false;
  playerSprite.vel.x = 0;
  playerSprite.vel.y = 0;
}

function draw() {
  background(220);
  
  
  // movement
	if (kb.pressing("right")) {
    playerSprite.vel.x = PLAYER_SPEED;
	playerSprite.vel.y = 0;
  } 
	if (kb.pressing("left")) {
    playerSprite.vel.x = -PLAYER_SPEED;
	playerSprite.vel.y = 0;
  } 
	if (kb.pressing("up")) {
    playerSprite.vel.y = -PLAYER_SPEED;
  } 
	if (kb.pressing("down")) {
    playerSprite.vel.y = PLAYER_SPEED;
  } 
	if (!kb.pressing("right")&&!kb.pressing("left")&&!kb.pressing("up")&&!kb.pressing("down")) {
	playerSprite.vel.x = 0;
	playerSprite.vel.y = 0;
  }
  if (kb.pressing("right")&&kb.pressing("left")) {
	playerSprite.vel.x = 0;
  }
  if (kb.pressing("up")&&kb.pressing("down")) {
	playerSprite.vel.y = 0;
  }
  
  	if (kb.presses("space")) {

	}
  
}