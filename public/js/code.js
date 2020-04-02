////////////////////
// Main Execution //
////////////////////

import { htmlSetup } from './htmlSetup.js';
import { cssSetup } from './cssSetup.js';
import { keyPresses } from './keyPresses.js';
import { gameConfig } from './gameConfig.js';
import { skybox } from './skybox.js';
import { ground } from './ground.js';
import { gameState } from './gameState.js';
import { debug } from './debug.js';
import { gameCamera } from './gameCamera.js';
import { hud } from './hud.js';

// Set up page
htmlSetup.addHtml();
cssSetup.addCss();
keyPresses.process();
gameState.preGame = true;

// SET UP SCENE AND RENDERER

let scene = new THREE.Scene();

// Renderer
let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(gameConfig.window.width, gameConfig.window.height);

// Attach renderer to page
document.getElementById('gameArea').appendChild(renderer.domElement);

// Add game objects to scene
skybox.addToScene(scene);
ground.addToScene(scene);
gameState.setGameBoot();

let render = function () {

    requestAnimationFrame(render);  
    gameCamera.render(renderer, scene);

    debug.write();
    hud.write();

    gameState.frame++;
    gameState.gameTimeLastFrame = gameState.gameTime;
    gameState.setGameTime();

    if (gameState.objectFocus) {
        gameCamera.setLookAtVector(ground.getPosVector());
    }

    if (gameState.preGame) {

        document.getElementById('messageArea').hidden = false;
        htmlSetup.populatePlayerArea('preGame');

    } else {

        document.getElementById('messageArea').hidden = true;

    }

    if (gameState.gameRunning) {
        ground.process();
    }

    if (gameState.levelComplete) {

        ground.removeFromScene(scene);
        skybox.removeFromScene(scene);
        gameState.level++;
        gameState.levelComplete = false;
        ground.setLevelTextures();
        ground.addToScene(scene);
        skybox.setTexturesForLevel();
        skybox.addToScene(scene);

    }

    if (gameState.gameOver) {

        document.getElementById('messageArea').hidden = false;
        htmlSetup.populatePlayerArea('gameOver');
        
    } 

};

render();

