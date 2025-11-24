var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

 //rectangle


 ctx.stroke();

let currentX = 20;
let currentY = 40;
const squareWidth = 60;
const squareHeight = 50;

var x = 0;
var y = 0;

for (let y = 0; y + squareHeight <= canvas.height;y+= squareHeight){
    for (let x =0; x + squareWidth <= canvas.width; x+= squareWidth){
        ctx.rect(x,y,squareWidth,squareHeight);
    }
}

var img = new Image()

img.src = "Images/pixel_character.svg";

img.addEventListener("load",(e) => {
    ctx.drawImage (img, 0, 0, 50, 50)
})


ctx.stroke();


