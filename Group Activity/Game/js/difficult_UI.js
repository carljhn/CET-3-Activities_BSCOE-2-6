export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 40;
        this.fontFamily = "Bangers";
    }

    draw(context){
        context.save();
        // shadow for the text
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = "white";
        context.shadowBlur = 0;

        // font
        context.font = this.fontSize + "px " + this.fontFamily;
        context.textAlign = "left";
        context.fillStyle = this.game.fontColor;

        // display score
        context.fillText("Score: " + this.game.score, 20, 50)

        // display game time
        context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
        context.fillText("Time: " + (this.game.time * 0.001).toFixed(1), 20, 90);
        
        // display game over message
        if (this.game.gameOver) {
            context.textAlign = "center";
            context.font = this.fontSize * 2 + "px " + this.fontFamily;
            if (this.game.score >= 80){
                context.fillText("Congratulations!", this.game.width * 0.5, this.game.height * 0.5);
                context.font = this.fontSize * 1 + "px " + this.fontFamily;
                context.fillText("You have collected " + this.game.score + " coins", this.game.width * 0.5, this.game.height * 0.5 + 40);
            }
            else {
                context.fillText("Awww, snap! Try Again", this.game.width * 0.5, this.game.height * 0.5);
                context.font = this.fontSize * 1 + "px " + this.fontFamily;
                context.fillText("You only got " + this.game.score + " coins", this.game.width * 0.5, this.game.height * 0.5 + 40);
            }
        }
        context.restore();
    }
}
