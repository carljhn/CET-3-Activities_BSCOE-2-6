// import js files
import { Player } from "./playerEasy.js";
import { InputHandler } from "./input.js";
import { Background } from "./easy_background.js";
import { Token } from "./coins.js";
import { UI } from "./easy_UI.js";

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    // Game Class
    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 50;
            this.speed = 0;
            this.maxSpeed = 3;
            // this.music = new Audio();
            // this.music.src = "audio/BACKGROUND MUSIC 1.mp3"
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.coin = [];
            this.collision = [];
            this.floatingScore = [];
            this.coinTimer = 0;
            this.coinInterval = 400;
            this.debug = false;
            this.time = 0;
            this.maxTime = 100000;
            this.gameOver = false;
            this.score = 0;
            this.fontColor = "black";
        }
        // update method for game class
        update(deltaTime) {
            // this.music.play();
            this.time += deltaTime;
            if (this.time > this.maxTime) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            // handle coins
            if (this.coinTimer > this.coinInterval){
                this.addCoin();
                this.coinTimer = 0;
            } else {
                this.coinTimer += deltaTime;
            }
            this.coin.forEach(coins => {
                coins.update(deltaTime);
                if (coins.markedForDeletion) this.coin.splice(this.coin.indexOf(coins), 1);
            })

            // handle floating score 
            this.floatingScore.forEach(scores => {
                scores.update();
            })

            // handle collision sprites
            this.collision.forEach((collisions, index) => {
                collisions.update(deltaTime);
                if (collisions.markedForDeletion) this.collision.splice(index, 1);
            });
            this.floatingScore = this.floatingScore.filter(scores => !scores.markedForDeletion)
        }
        // draw method for game class
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.coin.forEach(coins => {
                coins.draw(context);
            });
            this.collision.forEach(collisions => {
                collisions.draw(context);
            })
            this.floatingScore.forEach(scores => {
                scores.draw(context);
            })
            this.UI.draw(context);
        }

        addCoin(){
            this.coin.push(new Token(this));
            console.log(this.coin);
        }
    }
    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;
    var bgmVol = document.getElementById("bgm");
    bgmVol.volume = 0.1;

    // animation loop
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
});