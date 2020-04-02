import { htmlSetup } from './htmlSetup.js';
import { ground } from './ground.js';
import { gameCamera } from './gameCamera.js';
import { gameState } from './gameState.js';

let hud = {
    
    write: function() {

        htmlSetup.writeHudValue('playerLevel', gameState.level);

    },
}

export {hud};