// Imports
import { levels } from './levels.js';
import { gameState } from './gameState.js';
import { gameConfig } from './gameConfig.js';
import { ground } from './ground.js';

// Privates
function getUrlsFromLevel(level) { return [

    `../images/environment_map/${levels.eMapNameForLevel(level)}_ft.${levels.eMapFormatForLevel(level)}`,
    `../images/environment_map/${levels.eMapNameForLevel(level)}_bk.${levels.eMapFormatForLevel(level)}`,
    `../images/environment_map/${levels.eMapNameForLevel(level)}_up.${levels.eMapFormatForLevel(level)}`,
    `../images/environment_map/${levels.eMapNameForLevel(level)}_dn.${levels.eMapFormatForLevel(level)}`,
    `../images/environment_map/${levels.eMapNameForLevel(level)}_rt.${levels.eMapFormatForLevel(level)}`,
    `../images/environment_map/${levels.eMapNameForLevel(level)}_lf.${levels.eMapFormatForLevel(level)}`,

]};

function getCubemap(urls) {

    let cubemap = THREE.ImageUtils.loadTextureCube(urls);
    cubemap.format = THREE.RGBFormat;
    return cubemap;

};

function getReflectionMaterial(cubemap) {

    return new THREE.MeshBasicMaterial({

        color: 0x00AAEE,
        envMap: cubemap,
    
    })

};

let playerObject = {};
let reflectionMaterial = {};
// Half player height plus the height of a tile
let groundY = 0.5 * gameConfig.player.height + gameConfig.tile.height.normal;

var player = {

    createPlayer: function() {
        let geometry = new THREE.BoxGeometry(
            gameConfig.player.width,
            gameConfig.player.height,
            gameConfig.player.length
        );
        reflectionMaterial = getReflectionMaterial(
            getCubemap(
                getUrlsFromLevel(
                    gameState.level
                )
            )
        );
        playerObject = new THREE.Mesh(geometry, reflectionMaterial);
        playerObject.health = gameConfig.player.initialHealth;
        playerObject.thrust = gameConfig.player.initialThrust;
        playerObject.position.y = groundY;
        playerObject.position.z = 8;
        playerObject.velocity = new THREE.Vector3();
        playerObject.velocity.x = 0;
        playerObject.velocity.y = 0;
        playerObject.velocity.z = 0;
    },

    setPosition: function (x, y, z) {
        playerObject.position.x = x;
        playerObject.position.y = y;
        playerObject.position.z = z;
    },

    /*

    Co-ordinate system:

        +Y
         ^              
         |
         |
         |
         +------> +X
        /
       /
      /
     V
    +Z
    
    Player position

       0       3
        +-------+        Player X, Y, Z is centre of the geometry
       /|      /|        
    1 / |   2 / |        Player Width is distance between point 0 and point 3
     +-------+  |        Player Height is distance between point 4 and point 0
     |  | 4  |  | 7      Player Depth is distance between point 5 and point 4
     |  +----|--+
     | /     | /         Points 1,2,5,6 are IN FRONT OF Points 0,3,4,7
     |/      |/          Something with a higher Z is therefore infront of something with a lower Z
     +-------+
    5       6
    
    */

    processPlayer: function () {
        // Set the sides of the car
        // Note the back (lowest Z) of the car travels forward (negatively into z)
        playerObject.back = playerObject.position.z - gameConfig.player.length * 0.5;
        playerObject.front = playerObject.position.z + gameConfig.player.length * 0.5;
        playerObject.left = playerObject.position.x - gameConfig.player.width * 0.5;
        playerObject.right = playerObject.position.x + gameConfig.player.width * 0.5;
        playerObject.top = playerObject.position.y + gameConfig.player.height * 0.5;
        playerObject.bottom = playerObject.position.y - gameConfig.player.height * 0.5;

        // Process Movement

        // Process Velocity - Input (handled in keyPresses.js)

        // Process Velocity - Thrust (y)
        if (playerObject.thrust <= 100) {
            this.decreaseThrust(-gameConfig.thrustRegen);
        }
        // Process Velocity - Gravity (y)
        

        // Process Velocity - Friction (x and z)

        // Process Movement - Based on velocity
        playerObject.position.x += playerObject.velocity.x * gameState.getGameTimeDelta() * 0.001; 
        playerObject.position.y += playerObject.velocity.y * gameState.getGameTimeDelta() * 0.001; 
        playerObject.position.z += playerObject.velocity.z * gameState.getGameTimeDelta() * 0.001; 

        // Process collision
 
        // Is the player now above the ground?
        if (playerObject.position.y > groundY) {
            playerObject.velocity.y -= gameConfig.gravityAcc;
            // Is there any ground beneath the player?
        }
        // If player is on ground zero y velocity
        if (playerObject.position.y <= groundY) {
            // zero any vertical velocity
            playerObject.velocity.y = 0;

        }
        // Is the player now below the ground?
        if (playerObject.position.y < groundY) {
            playerObject.position.y = groundY;
        }

    },

    addToScene: function (scene) {

        scene.add(playerObject);

    },

    getHealth: function () {

        return playerObject.health;

    },

    setHealth: function (health) {

        playerObject.health = health;

    },

    decreaseHealth: function (decrement) {

        playerObject.health -= decrement;

    },

    getThrust: function () {

        return playerObject.thrust;

    },

    decreaseThrust: function (decrement) {

        playerObject.thrust -= decrement;

    },

    getPosVector: function() {

        return new THREE.Vector3(

            playerObject.position.x,
            playerObject.position.y,
            playerObject.position.z,

        );

    },

    getVelVector: function() {

        return new THREE.Vector3(

            playerObject.velocity.x,
            playerObject.velocity.y,
            playerObject.velocity.z,

        );

    },

    setVelY: function(vel) {

        playerObject.velocity.y = vel;

    },

    isOnGround: function () {

        if (playerObject.position.y == groundY) {
            return true;
        } else {
            return false;
        }

    }

};

export {player};
