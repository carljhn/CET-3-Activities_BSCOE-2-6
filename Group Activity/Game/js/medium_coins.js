class Coin {
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

export class Token extends Coin {
    constructor(game){
        super();
        this.game = game;
        this.width = 70;
        this.height = 43;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() + 5; // change this to modify the speed of the coins
        this.speedY = 0;
        this.maxFrame = 11;
        this.image = document.getElementById("coin");
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }

    update(deltaTime){
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}

