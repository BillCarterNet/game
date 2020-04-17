let date = new Date();

let gameState = {

    preGame: false,
    gameRunning: false,
    levelComplete: false,
    gameOver: false,
    debug: false,
    objectFocus: false,
    level: 1,
    score: 0,
    frame: 0,
    gameBoot: 0, // time in ms
    gameTime: 0, // time in ms
    gameTimeLastFrame: 0, // time in ms
    //gameTimeDelta: this.gameTime - this.gameTimeLastFrame,

    setGameBoot: function() {
        this.gameBoot = date.getTime();
    },

    setGameTime: function() {
        let newDate = new Date();
        this.gameTime = newDate.getTime();
    },

    init: function() {
        this.score = 0;
        this.level = 1;
    },

    getGameTimeDelta: function() {
        return this.gameTime - this.gameTimeLastFrame;
    },

};

export{gameState};
