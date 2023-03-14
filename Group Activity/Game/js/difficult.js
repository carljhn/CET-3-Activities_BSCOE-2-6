// import js files
import { Player } from "./playerHard.js";
import { InputHandler } from "./input.js";
import { Background } from "./difficult_background.js";
import { Token } from "./hardCoins.js";
import { FlyingEnemy, Cars, RedCars } from "./obstacleHard.js";
import { Bonus } from "./obstacleMedium.js";
import { UI } from "./difficult_UI.js";

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
            // this.music.src = "audio/BACKGROUND MUSIC 1.mp3";
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.coin = [];
            this.flying = []
            this.car = [];
            this.redcar = [];
            this.bonus = [];
            this.collision = [];
            this.floatingScore = [];
            this.coinTimer = 0;
            this.flyingTimer = 0;
            this.carTimer = 0;
            this.redcarTimer = 0;
            this.bonusTimer = 0;
            this.coinInterval = 500;
            this.flyingInterval = 10000;
            this.carInterval = 700;
            this.redcarInterval = 700;
            this.bonusInterval = 10000;
            this.debug = false;
            this.time = 50;
            this.maxTime = 50000;
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

            // handle flying enemies
            if (this.flyingTimer > this.flyingInterval){
                this.addFlyingEnemy();
                this.flyingTimer = 0;
            } else {
                this.flyingTimer += deltaTime;
            }
            this.flying.forEach(flyings => {
                flyings.update(deltaTime);
                if (flyings.markedForDeletion) this.flying.splice(this.flying.indexOf(flyings), 1);
            })

            // handle cars
            if (this.carTimer > this.carInterval){
                this.addCar();
                this.carTimer = 0;
            } else {
                this.carTimer += deltaTime;
            }
            this.car.forEach(cars => {
                cars.update(deltaTime);
                if (cars.markedForDeletion) this.car.splice(this.car.indexOf(cars), 1);
            })
            
            // handle red cars
            if (this.redcarTimer > this.redcarInterval){
                this.addRedCar();
                this.redcarTimer = 0;
            } else {
                this.redcarTimer += deltaTime;
            }
            this.redcar.forEach(redcars => {
                redcars.update(deltaTime);
                if (redcars.markedForDeletion) this.redcar.splice(this.redcar.indexOf(redcars), 1);
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
            this.flying.forEach(flyings => {
                flyings.draw(context);
            });
            this.car.forEach(cars => {
                cars.draw(context);
            });
            this.redcar.forEach(redcars => {
                redcars.draw(context);
            });
            this.bonus.forEach(bonuses => {
                bonuses.draw(context);
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

        addFlyingEnemy(){
            this.flying.push(new FlyingEnemy(this));
        }

        addCar(){
            if (this.speed > 0 && Math.random() < 0.1) this.car.push(new Cars(this));
        }

        addRedCar(){
            // this.car.push(new Cars(this));
            if (this.speed > 0 && Math.random() < 0.1) this.redcar.push(new RedCars(this));
        }

        addBonus(){
            this.bonus.push(new Bonus(this));
        }
    }
    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;
    var bgmVol = document.getElementById("bgm");
    bgmVol.volume = 0.3;

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