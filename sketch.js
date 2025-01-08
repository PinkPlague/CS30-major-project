let katamari, arcanoid;

let playerSprite, squares, circles, textBoxes, dorito;
const PLAYER_SPEED = 5;
let playerVars, obsticalVars, doritoVars;
let lastDash;
let lastHit;
let state = "startup"
let playerLoadedBool = false;
let levelLoadedBool = false;
let levelStartTimer;



function preload() {
  katamari = loadSound('assets/songfiles/femtanyl_-_KATAMARI.mp3');
  arcanoid = loadSound('assets/songfiles/Cyclone_-_Arcanoid.mp3');
  funFunFunDayo = loadSound('assets/songfiles/Fun_Fun_Fun_dayo_-_Lucky_Star.mp3');
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  playerVars = {
    lives: 5,
    speed: PLAYER_SPEED,
    hit: false,
    hitCooldown: 100,
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

  obsticalVars = {
    defaultColour: color(252, 31, 109),
    spawnColour: color(255, 255, 255),
  };

  doritoVars = {
    size: 30,
    colour: color(255,255,255),
  }

  sillyPrint(cat1);
  sillyPrint(cat2);
  sillyPrint(cat3);
  sillyPrint(cat4);
  sillyPrint(cat5);
  sillyPrint(cat6);
  sillyPrint(sashley);

  // obstacles();
  // doritoObj();
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
    spawnObsticalColourChange();
  }

  else if (state === "levelLoaded 1") {
    background(30, 5, 20);
    playerLoad();
    movement();
    border();
    loadLevel(1);
    hit();
    spawnObsticalColourChange();
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
	if (kb.pressing("right")&&!playerVars.hit) {
  playerSprite.vel.x = playerVars.speed;
	playerSprite.vel.y = 0;
  playerSprite.height = playerVars.stretchedMin;
  playerSprite.bearing = 'right';
  } 
	if (kb.pressing("left")&&!playerVars.hit) {
  playerSprite.vel.x = -playerVars.speed;
	playerSprite.vel.y = 0;
  playerSprite.height = playerVars.stretchedMin;
  playerSprite.bearing = 'left';
  }
	if (kb.pressing("up")&&!playerVars.hit) {
  playerSprite.vel.y = -playerVars.speed;
  playerSprite.width = playerVars.stretchedMin;
  playerSprite.bearing = 'up';
  } 
	if (kb.pressing("down")&&!playerVars.hit) {
  playerSprite.vel.y = playerVars.speed;
  playerSprite.width = playerVars.stretchedMin;
  playerSprite.bearing = 'down';
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
  playerSprite.remove();
  clear();
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
    playerSprite.overlaps(allSprites)

    playerLoadedBool = true;
  }
}
function obstacles() {
  noStroke();
  // create obsticles group
  //squares
  squares = new Group();
  squares.colour = obsticalVars.spawnColour;
  squares.collider = "n";
  squares.friction = 0;
  squares.layer = 1;
  //circles
  circles = new Group();
  circles.colour = obsticalVars.spawnColour;
  circles.collider = "n";
  circles.friction = 0;
  circles.layer = 1;
}

function doritoObj() {
  dorito = new Group();
  dorito.colour = doritoVars.colour;
  dorito.friction = 0;
  dorito.layer = 1;



  // triangle(doritoVars.side1[0], doritoVars.side1[1], doritoVars.side2[0], doritoVars.side2[1], doritoVars.side3[0], doritoVars.side3[1])

}

function textBoxesFunc() {
  textBoxes = new Group();
  textBoxes.colour = color(252, 31, 109);
  textBoxes.layer = 1;
  textBoxes.textSize = 40;
  textBoxes.collider = 'none';
}

async function spawnObsticalColourChange() {
  await sleep(100);
  squares.colour = lerpColor(squares.colour, obsticalVars.defaultColour, 0.21)
  circles.colour = lerpColor(circles.colour, obsticalVars.defaultColour, 0.21)
}

function loadLevel(levelId) {
  // if (levelId === 0) {
  //   mainMenu();
  // }

  // else 
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

async function level_test() {
  strokeWeight(0);
  noStroke();
  obstacles();
  textBoxesFunc();
  doritoObj();

  

  levelStartTimer = millis();
  funFunFunDayo.play();
  // funFunFunDayo.stop();

  await sleep(490);
  new textBoxes.Sprite(width/2, height/4, 800, 70);
  textBoxes.text = 'Welcome to Just Circles and Squares!';

  await sleep(3000);
  textBoxes.w = 1000;
  textBoxes.text = 'This game is all about dodging these red obstacles!';

  await sleep(175);
  new squares.Sprite(width/4, 400, 100, 100);
  new circles.Sprite(width - width/4, 400, 100);

  await sleep(3000);
  textBoxes.w = 1100;
  textBoxes.text = "Upon touching these obstacles you'll be launched away."

  await sleep(2000);
  textBoxes.w = 300;
  textBoxes.text = "Give it a try!"

  await sleep(1500);

  textBoxes.w = 600;
  textBoxes.text = "Move with (W, A, S, D)."

  await sleep(7000); 
  
  circles.removeAll();
  squares.removeAll();

  await sleep(200);
  
  textBoxes.w = 700
  textBoxes.text = 'Press space to perform a dash!'

  await sleep(2000); 

  textBoxes.w = 300
  textBoxes.text = 'Neat right?'

  await sleep(3000);

  textBoxes.w = 950
  textBoxes.text = 'Now try jumping back and forth over this obstacle.'

  await sleep(250);


  playerSprite.x = width/4
  playerSprite.y = height/2
  new squares.Sprite(width/2, height/2+120, 25, 600);

  await sleep(5000);

  squares.removeAll();

  textBoxes.w = 1010
  textBoxes.text = 'Now that you know the basics, try playing a short level!'

  await sleep(200);

  new dorito.Sprite(width/2, height/2, doritoVars.size, 'triangle');

  // await sleep(1100);
  // new squares.Sprite(400, 400, 50, 50);
  
  await sleep(2500);

  funFunFunDayo.stop();
}

function level_Katamari() {
  obstacles();
  levelStartTimer = millis(); 
  katamari.play();

}

function hit() {
  if (!playerVars.invincible&&(playerSprite.overlaps(squares)||playerSprite.overlaps(circles))) {
    playerVars.lives--;
    if (!playerVars.hit) {
      lastHit = millis();
      playerVars.hit = true;
      
      if (playerSprite.bearing === 'up') {
        playerSprite.vel.y += 30;
      }
      if (playerSprite.bearing === 'down') {
        playerSprite.vel.y -= 30;
      }
      if (playerSprite.bearing === 'right') {
        playerSprite.vel.x -= 30;
      }
      if (playerSprite.bearing === 'left') {
        playerSprite.vel.x += 30;
      }
    }
  }

  //knockback
  if (millis() > lastHit + playerVars.hitCooldown) {
    playerVars.hit = false;
  } 

  doritoCollide();
}

function doritoCollide() {
  if (playerSprite.overlaps(dorito)) {

    sleep(1000);

    levelId = 0;
    levelLoadedBool = false;
    reset();
    state = "mainMenu";
  }
}

function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}

function sillyPrint(sillyArray) {
  for (let line of sillyArray) {
    console.log(line);
  }
}


























let cat1 = ['  ╱|-、   ',
            ' (˚ˎ。7   ',
            ' |、˜〵   ',     
            ' じしˍ,)ノ'];

let cat2 = ['/ᐠ - ˕-マ｡˚ᶻ 𝗓 '];

let cat3 = ['/ᐠ˵- ⩊ -˵マ'];

let cat4 = ['ᨐᵉᵒʷ'];

let cat5 = ['𝑴𝒆𝒐𝒘. (•- •マ'];

let sashley = [ '⡇                                       ⣀⡀                                  ',
                '⡇                                      ⢰⢿⣷⡀                                ',
                '⡇             ⢰⣶⣤⣤⣤⣤⣤⣶⣶⣶⣶⣶⠶⠶⣶⣦⣤⣀⢠⡟ ⢿⣷⡀                              ',
                '⡇              ⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿    ⠈⠙⠛⠁ ⠈⢻⣿⣄                             ',
                '⡇                ⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏            ⠻⣿⣧⡀                           ',
                '⡇                ⢈⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿              ⠙⣿⣷⡀                         ',
                '⡇             ⣠⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏               ⠘⣿⣷⣤⣀                      ',
                '⡇          ⣀⣴⣿⠟⣱⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁              ⠸⣿⡏⠛⢿⣦⣄                    ',
                '⡇       ⣠⣾⣿⣏⠁⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟                 ⣿⡇   ⠈⠻⢷⣦⡀                ',
                '⡇      ⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃   ⣀⡄           ⢸⡏       ⠙⢿⣦⣀              ',
                '⡇     ⢻⣿⠿⣿⣿⢏⣿⢿⣿⣿⣿⣿⡿⣿⣿⣟⢿⡏   ⠚⠉    ⠘⢧⡀      ⣸⡇         ⠙⢿⣷⣄            ',
                '⡇      ⠻⣷⠻⢿⣬⣩ ⠉⠉⠉⠿⠙⣷⣶⣶⣶⣶⣤⡀                  ⡟          ⡜⠁⠈⠻⣷⣆          ',
                '⡇        ⠹⣷⣄⠈⠙⠷⡖⠤   ⣿⣿⣿⣿⡿⣿⣿⡆        ⢀⣀⣀⣀ ⢠⠞          ⢈    ⢀⣼⡿          ',
                '⡇          ⠈⠻⣦⣀ ⣧   ⣠⣿⣿⡿⣵⠃ ⢻⡷      ⢀⣴⣿⣿⣿⣿⣿⣿⣿⣶⣤⡀     ⠈⢄⢀⣤⡾⠋           ',
                '⡇            ⠈⠻⢷⣾⣤⣶⣾⠿⣿⣿⡇⣿⡀ ⢨⣧    ⣀⣾⡿⠋⠉⠉⠙⢻⣿⣿⣿⣿⣿⠃    ⢀⣴⡿⠋             ',
                '⡇                ⠈⢉⣿⢿⡜⡔⢍⠃⠘⣷⣤⡾⠋⠶⠋⠣⢴⠻⣯     ⣸⣻⣿⣿⣿⠁ ⣀⣠⣴⠾⠛⠁               ',
                '⡇                  ⢀⣾⠇⠈⡿⢸⢘⠒⠢⡤⠋       ⠻⣦⣀⣀⣀⣼⡿⣿⣿⣿⣿⣿⣟⡛⢻⠏                 ',
                '⡇                 ⣠⣿⠋ ⢸⠇⡇  ⡖⢤⡄ ⢰⣀⣀⡀ ⣀ ⠈⠻⡟⠛⠉ ⡬⠟⣫⣽⣼⡿⠃⣿                  ',
                '⡇             ⢀⣤⣾⠟⠁  ⠘⠶⢾⣷⣦⣜⣚⠁  ⠉⣯⠙⠋⠻⣇ ⣶⣽⣯⢿⡽⠇⡼⣿⠟⠉  ⣿⡀                 ',
                '⡇           ⣠⣾⠿⣋⡁⣠⠖⠲⡄     ⠈⠙⣿⢶⣶⣤⣼⣧⣤⣄⣹⣀⣈⣿⣥⣶⣖⣒⣃⣿    ⠸⣧⡀                ',
                '⡇        ⢀⣾⠟⢡⠞⣱⣳⠃  ⠷⠤⣄      ⣹⣄⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⠋⠉⠙⠛⠛⢋⣠⣤⣀⣀⡴⠺⢿⣦⣄            ',
                '⡇      ⢀⣾⠃ ⢠⠃⢠⢧⡇     ⣼⣠⣶⡿⠟⢛⡿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿     ⠸⡄   ⠈⠉  ⢸⠏⣙⣿⣦⡀         ',
                '⡇      ⢸⡏  ⢸ ⣼⢸  ⢀⣠⣴⣿⡿⠟⢁⣠⠔⠋   ⣀⣉⣙⣏⣹⣿⣟⢹⣿  ⢀⣠⠴⢲⡹⣄      ⡾⢸⠁⢳⠹⣷⡀        ',
                '⡇      ⢸⡇  ⠸⡄⠹⣜⣛⡭⠵⢺⣿⡁  ⠈⠳⣄⡀  ⢸⡟⠉⡽⣿⠻⣤⢹⣿⣿⣠⠔⠉ ⢸⢀⠱⣌⠣⣄  ⣼⢡⠏⢸⡄⢿⡇        ',
                '⡇      ⠘⣧   ⠙⢦⣀    ⣀⣻⣷     ⡇  ⣸⣧ ⣷⠟⢷⣼⣼⡇⢿⣇     ⠈⢇⠂ ⠈⠳⢌⡛⢃⠎  ⢸ ⣾⡇        ',
                '⡇       ⠹⣧    ⠈⠉⠉⠉⠁⢀⣿⡇    ⠳⠖⠉⣿⠛⢷⣛⢷⡟⣱⡟⢿⡘⣿⡄    ⠈⠳⣄   ⠉⠉ ⢀⣠⠃⢰⣿⠁        ',
                '⡇        ⠈⠷⣤⣀     ⢀⣾⣿⠃       ⢻⣆ ⠙⠿⡿⠏  ⢸⡇⠘⢿⣦⡀     ⠈⠙⠒⠒⠒⠒⠚⠉⣰⣿⠃          ',
                '⡇           ⠈⠙⠛⠷⠶⠶⣿⡏⣿⡀        ⠙⠛⠂    ⢀⣿⠁ ⠈⠻⣿⣦⣀         ⢀⣠⣾⠟⠁            ',
                '⡇                 ⢀⣿⡇⠈⠻⣦⣄⣀            ⣠⡾⠃ ⣀⣤⣾⡿⠛⠛⢿⣷⣶⣶⣾⣿⠟⠋⠁               ',
                '⡇                ⢀⣿⣿⣤⡀ ⠉⠛⠿⢶⣦⣤⣤⣀⣀⣠⣤⣾⣿⣷⣾⣿⣿⣏⠁    ⠈⠛⠿⠿⠿⠿⢿⣿⣿⣶⣦⣤⣀         ',
                '⡇                ⢸⣿⠘⢷⡝⠦⣀    ⠉⠉⠉⠉⣽⣿⠿⠛⠋⠉⢻⡟⠿⣿⣶⣄              ⠉⠙⠛⢿⣷⣦⡀      ',
                '⡇                ⠈⣿ ⣠⡿⢶⣤⣍⣓⠒⠦⠤⡀ ⣾⡟⢿⣦   ⢸⣿ ⠈⠻⣿⣧             ⢰⡆ ⢀⡈⠛⢿⣷⡀    ',
                '⡇                ⢀⣿⣾⠟⠁ ⠈⠉⠛⠛⠛⠳⡆⢸⣿⠁ ⣿⡇  ⠘⠃  ⢀⡞⣿⣧                ⠘⠁  ⠹⣿⣦   ',
                '⡇                ⠈⢻⡟⠛⠷⣦ ⢀⣀⣤⣀⣠⣧⢸⣿⢦⣀⠈     ⢀⡤⠞⠁⠸⣿⡆         ⠘⠟  ⠸⠇    ⠈⣿⣧  ',
                '⡇                 ⢸⣷  ⢹⡶⠟⢻⣍⠉⠿⠟⠘⣿⡄⠈⠉⠒⠒⠒⠒⠉⠁    ⣿⣧     ⣀⣠⠤⠤⠤⠤⠤⣄⡀     ⠘⣿  ']

let cat6 = [' _,,/| ',
            " \\o o' ",
            ' =_~_= ',
            ' /   \\ (\\ ',
            '(////_)// ',
            ' ~~~ ']

