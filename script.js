

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
var score_num;

//CANVAS SQUARES LOOP

function Init()
{
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	player_img = new Image();
	player_img.src = "Images/pixel_character.svg";
	apple_img = new Image();
	apple_img.src = "Images/Apple Treat.png";
}


//set main loop and frame rate
setInterval(MainLoop, 100);
window.addEventListener('keydown', KeyDown);

//////////
//Min loop
//////////
function MainLoop()
{
	Update();
	Draw();
}
function Update()
{
  
  if (player_x > 450){
    player_speed_x *= -1;
	}
	if (player_x < 5){
    player_speed_x *= -1;
	}

	apple_x +=apple_speed_x;

	if (apple_x > 550){
		apple_speed_x *= -1;
	}
	if (apple_x < 5){
		apple_speed_x *= -1;
	}

    apple_y+=apple_speed_y
  if (apple_y > 550){
      apple_speed_y *= -1;
    }
    if (apple_y < 5){
      apple_speed_y *= -1;
    }

//collison
	var distance2 = (player_x+apple_x)*(player_x-apple_x) + (player_y+apple_y)*(player_y-apple_y);
	var distance = Math.sqrt(distance2)
	if (distance < 20){
		dead = true;
	}
}

function Draw()
{
  
	ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.beginPath();
  for (let y = 0; y + squareHeight <= canvas.height;y+= squareHeight){
    for (let x =0; x + squareWidth <= canvas.width; x+= squareWidth){
        ctx.rect(x,y,squareWidth,squareHeight);
    }
}

ctx.stroke();

	ctx.drawImage(player_img,player_x,player_y,player_width,player_height);

	if (dead == false){
		ctx.drawImage(apple_img,apple_x,apple_y
    ,50,50);
	}

  
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



//CHARACTER


