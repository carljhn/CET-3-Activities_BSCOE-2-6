// import js files
import { Player } from "./playerMedium.js";
import { InputHandler } from "./input.js";
import { Background } from "./medium_background.js";
import { Token } from "./medium_coins.js";
import { Bonus, Hydrant } from "./obstacleMedium.js";
import { UI } from "./medium_UI.js"

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
            this.bonus = [];
            this.hydrant = [];
            this.collision = [];
            this.floatingScore = [];
            this.coinTimer = 0;
            this.bonusTimer = 0;
            this.hydrantTimer = 0;
            this.coinInterval = 450;
            this.bonusInterval = 10000;
            this.hydrantInterval = 400;
            this.debug = false;
            this.time = 0;
            this.maxTime = 70000;
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

            // handle bonus
            if (this.bonusTimer > this.bonusInterval){
                this.addBonus();
                this.bonusTimer = 0;
            } else {
                this.bonusTimer += deltaTime;
            }
            this.bonus.forEach(bonuses => {
                bonuses.update(deltaTime);
                if (bonuses.markedForDeletion) this.bonus.splice(this.bonus.indexOf(bonuses), 1);
            })

            // handle hydrants
            if (this.hydrantTimer > this.hydrantInterval){
                this.addHydrant();
                this.hydrantTimer = 0;
            } else {
                this.hydrantTimer += deltaTime;
            }
            this.hydrant.forEach(hydrants => {
                hydrants.update(deltaTime);
                if (hydrants.markedForDeletion) this.hydrant.splice(this.hydrant.indexOf(hydrants), 1);
            })

            // handle collision sprites
            this.collision.forEach((collisions, index) => {
                collisions.update(deltaTime);
                if (collisions.markedForDeletion) this.collision.splice(index, 1);
            });
            this.floatingScore = this.floatingScore.filter(scores => !scores.markedForDeletion);
        }
        // draw method for game class
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.coin.forEach(coins => {
                coins.draw(context);
            });
            this.bonus.forEach(bonuses => {
                bonuses.draw(context);
            });
            this.hydrant.forEach(hydrants => {
                hydrants.draw(context);
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
        }

        addBonus(){
            this.bonus.push(new Bonus(this));
        }

        addHydrant(){
            if (this.speed > 0 && Math.random() < 0.1) this.hydrant.push(new Hydrant(this));
        }

    }
    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;
    var bgmVol = document.getElementById("bgm");
    bgmVol.volume = 0.2;

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