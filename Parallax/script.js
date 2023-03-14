const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 10;

// Background Layers
const backgroundLayer1 = new Image();
backgroundLayer1.src = "image/layer1.png"; // blue sky
const backgroundLayer2 = new Image();
backgroundLayer2.src = "image/layer2.png"; // road
const backgroundLayer3 = new Image();
backgroundLayer3.src = "image/layer3.png"; // houses in front
const backgroundLayer4 = new Image();
backgroundLayer4.src = "image/layer4.png"; // mountain and trees
const backgroundLayer5 = new Image();
backgroundLayer5.src = "image/layer5.png"; // clouds 100% opacity
const backgroundLayer6 = new Image();
backgroundLayer6.src = "image/layer6.png"; // sun and airplane

window.addEventListener('load', function(){
    const slider = document.getElementById("slider");
    slider.value = gameSpeed;
    const show_game_speed = document.getElementById("show_game_speed");
    show_game_speed.innerHTML = gameSpeed;
    slider.addEventListener("change", function(e){
        gameSpeed = e.target.value;
        show_game_speed.innerHTML = e.target.value;
    });

    class Layer {
        constructor(image, speedModifier) {
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 720;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }

        update() {
            this.speed = gameSpeed * this.speedModifier;
            if (this.x <= -this.width){
                this.x = 0;
            }
            this.x = this.x - this.speed;
        }

        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    }

    const layer1 = new Layer(backgroundLayer1, 1.4);
    const layer2 = new Layer(backgroundLayer2, 1.2);
    const layer3 = new Layer(backgroundLayer3, 0.8);
    const layer4 = new Layer(backgroundLayer4, 0.4);
    const layer5 = new Layer(backgroundLayer5, 0.2);
    const layer6 = new Layer(backgroundLayer6, 0.6);

    const gameObjects = [layer1, layer6, layer5, layer4, layer3, layer2];

    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        gameObjects.forEach(object => {
            object.update();
            object.draw();
        });
        requestAnimationFrame(animate);
    };
    animate();
});