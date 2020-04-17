let gameConfig = {

    window: {
        height: 720,
        width: 1280,
    },

    camera: {
        fov: 90,
        nearClip: 0.1,
        farClip: 10001,
    },

    gameSpeed: 1.0, // applied as level movement change per second
    
    gravityAcc: 1.0, // applied as player velocity change per second
    thrustAcc: 4.0, // applied as player velocity change per second
    thrustRegen: 0.5,
    initialThrustImpulse: 2,
    thrustUsageRate: 5,

    tile: {
        width: 5,
        height: {
            normal: 1,
            block: 10,
        },
        length: 5,
    },

    player: {
        initialHealth: 100,
        initialThrust: 80,
        width: 4,
        height: 0.5,
        length: 4,
    },

};

export {gameConfig};
