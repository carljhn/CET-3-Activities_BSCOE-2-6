// canvas 1
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// collision canvas
const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCanvasCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

ctx.font = '50px Impact'
let score = 0;
let gameOver = false;
let piranhaInterval = 500;
let lastTime = 0;
gameSpeed = 8;
timeToNextPiranha = 0;
let audio = new Audio('bgm.mp3');


//Parallax Background
const Layer1 = new Image();
Layer1.src = "bg/bg1.png"; // sea water w/ whale
const Layer2 = new Image();
Layer2.src = "bg/trench1.png"; // first layer of trench
const Layer3 = new Image();
Layer3.src = "bg/trench2.png"; // second layer of trench
const Layer4 = new Image();
Layer4.src = "bg/sand.png"; // sea floor
const Layer5 = new Image();
Layer5.src = "bg/corals.png"; // corals
const Layer6 = new Image();
Layer6.src = "bg/fish.png"; // fish

class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    };

    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width){
            this.x = 0;
        }
        this.x = this.x - this.speed;
    };

    draw() {
        ctx.drawImage(
            this.image,
            this.x,
            this.y, 
            this.width, 
            this.height);
        ctx.drawImage(
            this.image, 
            this.x + this.width, 
            this.y, 
            this.width, 
            this.height);
    };
};

//Array that holds the objects for piranhas
let piranha = [];
class Piranha {
    constructor() {
        this.spriteWidth = 131;
        this.spriteHeight = 132;
        this.sizeModifier = Math.random() * 0.6 + 0.4;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;  
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = 'image/fish.png';
        this.frame = 0;
        this.maxFrame = 4;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 40 + 40;
        this.randomColors = [
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
        ];
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
    }

    update(deltaTime) {
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY = this.directionY * -1;
        }
        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.x < 0 - this.width) this.markedForDeletion = true;
        this.timeSinceFlap += deltaTime;
        if (this.timeSinceFlap > this.flapInterval) {
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;
            this.timeSinceFlap = 0;
        } 
        
        if (this.x < 0 - this.width) gameOver = true;
    }

    draw() {
        collisionCanvasCtx.fillStyle = this.color;
        collisionCanvasCtx.fillRect(
            this.x, 
            this.y, 
            this.width,
            this.height
        );

        ctx.drawImage(
            this.image,
            this.frame * this.spriteWidth, 
            0, 
            this.spriteWidth,
            this.spriteHeight,
            this.x, 
            this.y,
            this.width,
            this.height
        );
    }
};

// Array that holds the objects for explosion
let explosion = [];
class Explosion{
    constructor(x, y, size) {
        this.image = new Image();
        this.image.src = 'image/blood.png';
        this.spriteWidth = 512;
        this.spriteHeight = 512;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = 'blood-splatter-sfx.mp3';
        this.timeSinceLastFrame = 0;
        this.frameInterval = 200;
        this.markedForDeletion = false;
    };

    update(deltaTime) {
        if (this.frame === 0) this.sound.play();
        this.timeSinceLastFrame += deltaTime;
        if (this.timeSinceLastFrame > this.frameInterval){
            this.frame++;
            this.timeSinceLastFrame = 0;
            if (this.frame > 6) this.markedForDeletion = true;
        }
    };

    draw() {
        ctx.drawImage(
            this.image,
            this.frame * this.spriteWidth,
            0, 
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y - this.size / 4, 
            this.size,
            this.size);
    }
};

// Assigns the speed of each assets in the background
const layer1 = new Layer(Layer1, 0.2);
const layer2 = new Layer(Layer2, 0.3);
const layer3 = new Layer(Layer3, 0.4);
const layer4 = new Layer(Layer4, 0.7);
const layer5 = new Layer(Layer5, 0.3);
const layer6 = new Layer(Layer6, 1.0);

const gameObjects = [layer1, layer2, layer3, layer4, layer6, layer5];

// Displays "Game Over" when the piranha reaches the left side of the canvas
function sayGameOver() {
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText("THE PIRANHAS GOT YOU! you slayed " + score + ' piranhas', canvas.width/2, canvas.height/2);
    ctx.fillStyle = 'white';
    ctx.fillText("THE PIRANHAS GOT YOU! you slayed " + score + ' piranhas', canvas.width/2 + 5, canvas.height/2 + 5);
};

// Reveals the score
function revealScore() {
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 50, 75);
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 53, 78);
};

// This will be executed when there is a collision
window.addEventListener('click', function(e) {
    const detectPixelColor = collisionCanvasCtx.getImageData(e.x, e.y, 1, 1);
    const pc = detectPixelColor.data;
    piranha.forEach(objects => {
        if (objects.randomColors[0] === pc[0] &&
            objects.randomColors[1] === pc[1] &&
            objects.randomColors[2] === pc[2]) {
                //when collision is detected
                objects.markedForDeletion = true;
                score++;
                explosion.push(new Explosion(objects.x, objects.y, objects.width));
            }
    })
});

//animates the whole program
function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameObjects.forEach(objects => {
        objects.update();
        objects.draw();
        audio.play();
    });
    collisionCanvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    timeToNextPiranha += deltaTime;
    if (timeToNextPiranha > piranhaInterval) {
        piranha.push(new Piranha());
        timeToNextPiranha = 0;
        piranha.sort(function(a, b) {
            return a.width - b.width;
        });
    };
    revealScore();
    [...piranha, ...explosion].forEach(objects => objects.update(deltaTime));
    [...piranha, ...explosion].forEach(objects => objects.draw());
    piranha = piranha.filter(objects => !objects.markedForDeletion);
    explosion = explosion.filter(objects => !objects.markedForDeletion);
    if (!gameOver) requestAnimationFrame(animate);
    else sayGameOver();
};

animate(0);