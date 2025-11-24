

//VARIABLES

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

let currentX = 20;
let currentY = 40;
const squareWidth = 60;
const squareHeight = 50;

var x = 0;
var y = 0;

//CANVAS SQUARES LOOP

for (let y = 0; y + squareHeight <= canvas.height;y+= squareHeight){
    for (let x =0; x + squareWidth <= canvas.width; x+= squareWidth){
        ctx.rect(x,y,squareWidth,squareHeight);
    }
}

//CHARACTER

var img = new Image()

img.src = "Images/pixel_character.svg";

window.addEventListener('keydown', KeyDown);


function Draw()
{
	ctx.drawImage(img,x,y);
}

function KeyDown()
{
	if(event.key == "ArrowRight")
	{
		x++;
	}
}


ctx.stroke();


