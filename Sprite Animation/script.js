const canvas = document.getElementById("Canvas1");
const ctx = canvas.getContext("2d");

// Canvas Dimension
const CANVAS_WIDTH = canvas.width = 300;
const CANVAS_HEIGHT = canvas.height = 300;

// Get Image
const playerImage = new Image();
playerImage.src = "sporty_boy.jpg"; //width = 1024, height = 896

// Image values
const spriteWidth = 171;
const spriteHeight = 319;
let frameX = 0;
let frameY = 1;
let gameFrame = 0;
const staggerFrame = 8;

// Animation 
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 50, 0, spriteWidth, spriteHeight);
    if(gameFrame % staggerFrame == 0){
        if(frameX < 4) {
            frameX++;
        }
        else {
            frameX = 0;
        }
    }
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();