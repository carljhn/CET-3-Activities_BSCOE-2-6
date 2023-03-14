class Enemy3 {
    constructor(){
        this.frameX = 0; 
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }

    update(deltaTime){
        // movement of the coin
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        }
        else {
            this.frameTimer += deltaTime;
        }

        // check if coins are off screen
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }

    draw(context){
        if (this.game.debug) 
        context.strokeRect(
            this.x, 
            this.y, 
            this.width,
            this.height
        );
        context.drawImage(
            this.image,
            this.frameX * this.width,
            0,
            this.width, 
            this.height, 
            this.x,
            this.y, 
            this.width, 
            this.height
        )
    }
}

export class FlyingEnemy extends Enemy3 {
    constructor(game){
        super();
        this.game = game;
        this.sound = new Audio();
        this.sound.src = "audio/bird-sfx.mp3";
        this.sound.play();
        this.sound.volume = 0.2;
        this.width = 100;
        this.height = 75;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.1;
        this.speedX = Math.random() + 5; // change this to modify the speed of the coins
        this.speedY = 0;
        this.maxFrame = 3;
        this.image = document.getElementById("enemy");
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }

    update(deltaTime){
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}

export class Cars extends Enemy3 {
    constructor(game){
        super();
        this.game = game;
        this.sound = new Audio();
        this.sound.src = "audio/car-sound.mp3"
        this.sound.play();
        this.sound.volume = 0.1;
        this.width = 214;
        this.height = 113;
        this.x = this.game.width;
        this.y = this.game.height - this.height;
        this.image = document.getElementById("car");
        this.speedX = 5;
        this.speedY = 0;
        this.maxFrame = 6;
    }
}

export class RedCars extends Enemy3 {
    constructor(game){
        super();
        this.game = game;
        this.sound = new Audio();
        this.sound.src = "audio/car-sound.mp3"
        this.sound.play();
        this.sound.volume = 0.1;
        this.width = 200;
        this.height = 60;
        this.x = this.game.width;
        this.y = this.game.height - this.height;
        this.image = document.getElementById("cars");
        this.speedX = 5;
        this.speedY = 0;
        this.maxFrame = 5;
    }
}

// export class Hydrant extends Enemy3 {
//     constructor(game){
//         super();
//         this.game = game;
//         this.width = 73;
//         this.height = 162;
//         this.x = this.game.width;
//         this.y = this.game.height - this.height - this.game.groundMargin;
//         this.image = document.getElementById("hydrant");
//         this.speedX = 0;
//         this.speedY = 0;
//         this.maxFrame = 1;
//     }
// }