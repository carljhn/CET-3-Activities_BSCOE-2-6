const canvas = document.getElementById("parallaxHome");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Background {
    constructor(gamewidth, gameHeight){
        this.gameWidth = gamewidth;
        this.gameheight = gameHeight;
        this.image = document.getElementById("home");
        this.x = 0;
        this.y = 0;
        this.width = 1296;
        this.height = 600;
        this.speed = 5;
    }

    draw(context){
        context.drawImage(
            this.image, 
            this.x,
            this.y,
            this.width,
            this.height,
        )
        context.drawImage(
            this.image, 
            this.x + this.width,
            this.y,
            this.width,
            this.height,
        )
    }

    update(){
        this.x -= this.speed;
        if (this.x < 0 - this.width) this.x = 0;
    }
}

const background = new Background(canvas.width, canvas.height);
var sound = document.getElementById("bgm");
sound.volume = 0.3;

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    background.update();
    requestAnimationFrame(animate);
}
animate();

// const canvas = document.getElementById("homeCanvas");
// const ctx = canvas.getContext("2d");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// // measure movement 
// const buttonElements = document.querySelectorAll(".button");
// let buttonMeasurements = [];
// function measureButtons(){
//     buttonMeasurements = [];
//     buttonElements.forEach(button => {
//         buttonMeasurements.push(button.getBoundingClientRect());
//     })
// }

// measureButtons();
// console.log(buttonMeasurements)

// // particles for the buttons
// let particlesArray = [];
// class Particle {
//     constructor(x, y, size){
//         this.x = x,
//         this.y = y, 
//         this.size = size;
//         this.weight = Math.random() * 1.5 + 1.5;
//         this.direction = Math.random() * 2;
//     }

//     update(){
//         this.y -= this.weight;
//         this.x += this.direction;
//         if (this.size >= 0.3) this.size -= 0.2;
//     }

//     draw(){
//         ctx.beginPath();
//         ctx.arc(
//             this.x,
//             this.y,
//             this.size, 
//             0,
//             Math.PI * 2,
//         )
//         ctx.fillStyle = "blue";
//         ctx.fill();
//     }
// }

// let activeButton = -1;
// buttonElements.forEach(button => button.addEventListener("mouseenter", function(){
//     activeButton = button.dataset.number;
// }));

// buttonElements.forEach(button => button.addEventListener("mouseleave", function(){
//     activeButton = -1;
// }));

// function handleParticles(){
//     for (let i = 0; i < particlesArray.length; i++){
//         particlesArray[i].update();
//         particlesArray[i].draw();
//         if (particlesArray[i].size <= 1){
//             particlesArray.splice(i, 1);
//             i--;
//         }
//     }
// }

// function createParticle(){
//     if (activeButton > -1){
//         let size = Math.random() * 40 + 10;
//         let x = Math.random() * (buttonMeasurements[activeButton].width - size * 2) + buttonMeasurements[activeButton].x + size;
//         let y = buttonMeasurements[activeButton].y + 40;
//         particlesArray.push(new Particle(x, y, size));
//     }
// }
// function animate(){
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     createParticle();
//     handleParticles();
//     requestAnimationFrame(animate);
// }
// animate();

// window.addEventListener("resize", function(){
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     measureButtons();
// })