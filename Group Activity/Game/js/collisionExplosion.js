export class CollisionExplosion {
    constructor(game, x, y){
        this.game = game;
        this.image = document.getElementById("hydrant-explosion");
        this.spriteWidth = 186;
        this.spriteHeight = 180;
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.frameX = 0;
        this.sound = new Audio();
        this.sound.src = "audio/obstacle-explosion.mp3"
        this.sound.volume = 0.5;
        this.maxFrame = 6;
        this.markedForDeletion = false;
        this.fps = Math.random() * 10 + 5;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
    }

    draw(context){
        context.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y, 
            this.width,
            this.height
        )
    }

    update(deltaTime){
        this.x -= this.game.speed;
        if (this.frameTimer > this.frameInterval){
            this.frameX++;
            this.frameTimer = 0;
            this.sound.play();
            this.sound.volume = 0.5;
        }
        else {
            this.frameTimer += deltaTime;
        }
        if (this.frameX > this.maxFrame) this.markedForDeletion = true;
    }
}