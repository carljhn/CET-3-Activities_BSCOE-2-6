const state = {
    STANDING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
}

class State {
    constructor(state) {
        this.state = state;
    }
}

// standing state
export class Standing extends State {
    constructor(player) {
        super("STANDING");
        this.player = player;
    }

    enter() {
        this.player.frameX = 0;
        this.player.maxFrame = 2;
        this.player.frameY = 2;
    }

    handleInput(input) {
        if (
            input.includes("ArrowLeft") ||
            input.includes("ArrowRight")) {
                this.player.setState(state.RUNNING, 1);
            }
    }
}

// running state
export class Running extends State {
    constructor(player) {
        super("RUNNING");
        this.player = player;
    }

    enter() {
        this.player.frameX = 0;
        this.player.maxFrame = 5;
        this.player.frameY = 0;
    }

    handleInput(input) {
        if (input.includes("ArrowDown")) {
            this.player.setState(state.STANDING, 0);
        }
        else if (input.includes("ArrowUp")) {
            this.player.setState(state.JUMPING, 1)
        }
    }
}

// jumping state
export class Jumping extends State {
    constructor(player) {
        super("JUMPING");
        this.player = player;
    }

    enter() {
        if (this.player.onGround()) this.player.vy -= 27;
        this.player.frameX = 0;
        this.player.maxFrame = 2;
        this.player.frameY = 1;
    }

    handleInput(input) {
        if (this.player.vy > this.player.weight) {
                this.player.setState(state.FALLING, 1);
            }
    }
}

// falling state
export class Falling extends State {
    constructor(player) {
        super("FALLING");
        this.player = player;
    }

    enter() {
        this.player.frameX = 0;
        this.player.maxFrame = 4;
        this.player.frameY = 0;
    }

    handleInput(input) {
        if (this.player.vy > this.player.weight) {
                this.player.setState(state.RUNNING, 1);
            }
    }
}