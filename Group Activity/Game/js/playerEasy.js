import {Running, Standing, Jumping, Falling} from "./playerState.js";
import { CollisionAnimation } from "./collisionAnimation.js";
import { FloatingScore } from "./floatingScore.js";

export class Player {
    constructor(game){
        this.game = game;
        this.width = 90;
        this.height = 139;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame;
        this.fps = 15;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.states = [new Standing(this), new Running(this), new Jumping(this), new Falling(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    }

    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        // vertical movement
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        
        // horizontal movement
        this.x += this.speed;
        if (input.includes("ArrowRight")) this.speed = this.maxSpeed;
        else if (input.includes("ArrowLeft")) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        // sprite animation
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;    
        }
        else this.frameTimer += deltaTime; 
    }

    draw(context){
        if (this.game.debug) 
        context.strokeRect(
            this.x,
            this.y,
            this.width,
            this.height
        )
        context.drawImage(
            this.image,
            this.frameX * this.width,
            this.frameY * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }

    onGround(){
        return this.y >= this.game.height - this.height;
    }

    setState(state, speed) {
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }

    checkCollision(){
        // collision with coins (score will be added by 1 points)
        this.game.coin.forEach(coins => {
            if (
                coins.x < this.x + this.width &&
                coins.x + coins.width > this.x &&
                coins.y < this.y + this.height &&
                coins.y + coins.height > this.y
            ){
                coins.markedForDeletion = true;
                this.game.collision.push(new CollisionAnimation(
                    this.game, 
                    coins.x + coins.width * 0.5, 
                    coins.y + coins.height * 0.5));
                this.game.score++;
                this.game.floatingScore.push(new FloatingScore("+1", coins.x, coins.y, 175, 50));
            }
            else {

            }
        });
        
        // handle flying enemies
        // this.game.flying.forEach(flyings => {
        //     if (
        //         flyings.x < this.x + this.width &&
        //         flyings.x + flyings.width > this.x &&
        //         flyings.y < this.y + this.height &&
        //         flyings.y + flyings.height > this.y
        //     ){
        //         flyings.markedForDeletion = true;
        //         this.game.collision.push(new CollisionAnimation(
        //             this.game, 
        //             flyings.x + flyings.width * 0.5, 
        //             flyings.y + flyings.height * 0.5));
        //         this.game.score--;
        //     }
        //     else {

        //     }
        // });

        // collision with cars (score will be deducted by 3 points)
        // this.game.car.forEach(cars => {
        //     if (
        //         cars.x < this.x + this.width &&
        //         cars.x + cars.width > this.x &&
        //         cars.y < this.y + this.height &&
        //         cars.y + cars.height > this.y
        //     ){
        //         cars.markedForDeletion = true;
        //         this.game.collision.push(new CollisionAnimation(
        //             this.game, 
        //             cars.x + cars.width * 0.5, 
        //             cars.y + cars.height * 0.5));
        //         this.game.score -= 3;
        //     }
        //     else {

        //     }
        // });

        // collision with hydrants (score will be deducted by 3 points)
        // this.game.hydrant.forEach(hydrants => {
        //     if (
        //         hydrants.x < this.x + this.width &&
        //         hydrants.x + hydrants.width > this.x &&
        //         hydrants.y < this.y + this.height &&
        //         hydrants.y + hydrants.height > this.y
        //     ){
        //         hydrants.markedForDeletion = true;
        //         this.game.collision.push(new CollisionAnimation(
        //             this.game, 
        //             hydrants.x + hydrants.width * 0.5, 
        //             hydrants.y + hydrants.height * 0.5));
        //         this.game.score -= 1;
        //     }
        //     else {

        //     }
        // });
    }
}