// Hungry Hero - Cool Game Project 
// Amr & Muhannad, 2025


// SETUP

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// just in case something goes wrong with the HTML
if (!canvas || !ctx) {
  console.error("Canvas or context not found. Check the canvas id in HTML.");
}

// The Hungary (hero)
const hero = {
  x: 100,
  y: 100,
  baseWidth: 50,
  baseHeight: 50,
  scale: 1,
  speed: 3,
  vx: 0,
  vy: 0
};

// treat settings 
const TREAT_WIDTH = 40;
const TREAT_HEIGHT = 40;

const treat = {
  x: 300,
  y: 300
};

// score
let score = 0;

// grid setup
const GRID_WIDTH = 60;
const GRID_HEIGHT = 50;

// images
const heroImg = new Image();
heroImg.src = "Images/pixel_character.svg";

const treatImg = new Image();
treatImg.src = "Images/Apple Treat.png"; 

// sound effects
const eatSound = new Audio("SFX/eat.mp3"); 

let lastTime = 0;


// INPUT ARROW KEYS


window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowRight":
      hero.vx = hero.speed;
      hero.vy = 0;
      break;
    case "ArrowLeft":
      hero.vx = -hero.speed;
      hero.vy = 0;
      break;
    case "ArrowUp":
      hero.vy = -hero.speed;
      hero.vx = 0;
      break;
    case "ArrowDown":
      hero.vy = hero.speed;
      hero.vx = 0;
      break;
    default:
      break;
  }
});


// GAME START


function startGame() {
  console.log("Hungry Hero starting...");

  score = 0;
  hero.x = 100;
  hero.y = 100;
  hero.scale = 1;

  spawnTreat();
  window.requestAnimationFrame(gameLoop);
}


// GAME LOOP


function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  update(deltaTime);
  draw();

  window.requestAnimationFrame(gameLoop);
}


// UPDATE LOGIC


function update(deltaTime) {
  // movement
  hero.x += hero.vx;
  hero.y += hero.vy;

  keepHeroInsideCanvas();

  // check if hero touches the treat
  if (checkCollisionWithTreat()) {
    handleTreatEaten();
  }
}

function keepHeroInsideCanvas() {
  const heroWidth = hero.baseWidth * hero.scale;
  const heroHeight = hero.baseHeight * hero.scale;

  if (hero.x < 0) hero.x = 0;
  if (hero.y < 0) hero.y = 0;

  if (hero.x + heroWidth > canvas.width) {
    hero.x = canvas.width - heroWidth;
  }

  if (hero.y + heroHeight > canvas.height) {
    hero.y = canvas.height - heroHeight;
  }
}

function checkCollisionWithTreat() {
  const heroWidth = hero.baseWidth * hero.scale;
  const heroHeight = hero.baseHeight * hero.scale;

  const treatX = treat.x;
  const treatY = treat.y;
  const treatWidth = TREAT_WIDTH;
  const treatHeight = TREAT_HEIGHT;

  // simple box collision (AABB)
  return (
    hero.x < treatX + treatWidth &&
    hero.x + heroWidth > treatX &&
    hero.y < treatY + treatHeight &&
    hero.y + heroHeight > treatY
  );
}

function handleTreatEaten() {
  console.log("Snack collected!");

  // grow the hero a bit
  hero.scale += 0.1;

  // increase score
  score += 1;

  // play sound (if browsers allow it)
  try {
    eatSound.currentTime = 0;
    eatSound.play();
  } catch (err) {
    console.warn("Eat sound could not play:", err);
  }

  // respawn treat somewhere else
  spawnTreat();
}

function spawnTreat() {
  // keep treat fully inside canvas
  treat.x = Math.random() * (canvas.width - TREAT_WIDTH);
  treat.y = Math.random() * (canvas.height - TREAT_HEIGHT);
}


// DRAW FUNCTIONS


function drawGrid() {
  ctx.beginPath();

  // basic grid background
  for (let y = 0; y + GRID_HEIGHT <= canvas.height; y += GRID_HEIGHT) {
    for (let x = 0; x + GRID_WIDTH <= canvas.width; x += GRID_WIDTH) {
      ctx.rect(x, y, GRID_WIDTH, GRID_HEIGHT);
    }
  }

  ctx.strokeStyle = "black";
  ctx.stroke();
}

function drawHero() {
  const heroWidth = hero.baseWidth * hero.scale;
  const heroHeight = hero.baseHeight * hero.scale;

  if (heroImg.complete && heroImg.naturalWidth > 0) {
    ctx.drawImage(heroImg, hero.x, hero.y, heroWidth, heroHeight);
  } else {
    // fallback if image didn't load yet
    ctx.fillStyle = "yellow";
    ctx.fillRect(hero.x, hero.y, heroWidth, heroHeight);
  }
}

function drawTreat() {
  const w = TREAT_WIDTH;
  const h = TREAT_HEIGHT;

  if (treatImg.complete && treatImg.naturalWidth > 0) {
    ctx.drawImage(treatImg, treat.x, treat.y, w, h);
  } else {
    // simple red square while image loads
    ctx.fillStyle = "red";
    ctx.fillRect(treat.x, treat.y, w, h);
  }
}

function drawScore() {
  ctx.font = "24px 'Chewy', cursive";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 10, 30);

  // small outline so text is readable over the background
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.strokeText("Score: " + score, 10, 30);
}

function draw() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // order: grid , treat , hero , score
  drawGrid();
  drawTreat();
  drawHero();
  drawScore();
}
