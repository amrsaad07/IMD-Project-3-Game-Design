

//VARIABLES

var canvas;
var ctx;
var player_img;
var player_x = 0;
var player_y = 0;
var player_width = 50;
var player_height = 50;
var apple_img;
var apple_x = 0;
var apple_y = 100;
var player_speed_x =20;
var apple_speed_x = 20;
var apple_speed_y = 20;
var dead = false;
var squareWidth = 50;
var squareHeight = 40;
var score = 0;
var gameInterval = null;

var grow_amount= 10;
var max_hero_size= 150;
function Init()
{

	canvas = document.getElementById("myCanvas"); //Get Canvas from HTML
	ctx = canvas.getContext("2d"); // Get Draiwng context

	player_img = new Image();
	player_img.src = "Images/pixel_character.svg";

	apple_img = new Image();
	apple_img.src = "Images/Apple Treat.png";
}



//listening for keyboard input
window.addEventListener('keydown', KeyDown);

//////////
//Min loop
//////////
function MainLoop()
{
	Update(); //update game values
	Draw(); // rendering everything
}
function Update()
{

// ------------ PLAYER MOVEMENT ------------ \\

  if (player_x > 450){
    player_speed_x *= -1;
	}
	if (player_x < 5){
    player_speed_x *= -1;
	}

	// ------------ APPLE MOVEMENT ------------ \\

	apple_x +=apple_speed_x;

	if (apple_x > 550){
		apple_speed_x *= -1;
	}
	if (apple_x < 5){
		apple_speed_x *= -1;
	}

    //apple_y+=apple_speed_y

	if (apple_y > 550){
      apple_speed_y *= -1;
    }
    if (apple_y < 5){
      apple_speed_y *= -1;
    }

// ------------ BORDER COLLISION ------------ \\

	if (player_x < 0){
		player_x = 0;
	}

	if (player_x + player_width > canvas.width){
		player_x = canvas.width - player_width;
	}

	if (player_y < 0){
		player_y = 0;
	}

	if (player_y + player_height > canvas.height){
		player_y = canvas.height - player_height;
	}

	// ------------ COLISSION PLAYER VS APPLE ------------ \\

	//Calculating distance between player and apple
	var dx = player_x - apple_x;
	var dy = player_y - apple_y;
	var distance = Math.sqrt(dx*dx + dy*dy);
	if (distance < 20){
		respawnApple();
	}
}

function respawnApple(){
	apple_x=0;

	apple_y = Math.random() * (canvas.height - 50);

	apple_speed_x = 20;

	dead = false;

	score ++;
	document.getElementById("score").textContent = score;;
player_width += grow_amount;
player_height += grow_amount;

}

function Draw()
{
  //CLEARING REPEATING FRAMES
  
  ctx.clearRect(0,0,canvas.width,canvas.height);

	//CANVAS SQUARES LOOP

  ctx.beginPath();
  for (let y = 0; y + squareHeight <= canvas.height;y+= squareHeight){
    for (let x =0; x + squareWidth <= canvas.width; x+= squareWidth){
        ctx.rect(x,y,squareWidth,squareHeight);
    }
}

	//DRAW EVERTYING

	ctx.stroke();

	ctx.drawImage(player_img,player_x-3,player_y-3,player_width,player_height);

	
		ctx.drawImage(apple_img,apple_x,apple_y,50,50);

  
}

function StartGame(){
	if (gameInterval == null){
		gameInterval = setInterval(MainLoop,100);
	}
}

function RestartGame (){
	player_x = 0;
	player_y = 0;

	apple_x = 0;
	apple_y = 0;

	score = 0;
	document.getElementById("score").textContent = score;
	
	dead = false;

	player_width=50;
	player_height=50;
}
function EndGame(){
	clearInterval(gameInterval);
	gameInterval = null;
	alert("Game Over. Thanks for playing!")
}



//////////
//Events
//////////
function KeyDown()
{

  event.preventDefault();

	if(event.key == "ArrowRight")
	{
		player_x+=20;
	}
	if(event.key == "ArrowLeft")
	{
		player_x -= 20;
	}
		if(event.key == "ArrowDown")
	{
		player_y += 20;
	}
		if(event.key == "ArrowUp")
	{
		player_y -= 20;
	}
}





