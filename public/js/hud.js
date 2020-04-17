import { htmlSetup } from './htmlSetup.js';
import { cssSetup } from './cssSetup.js';
import { player } from './player.js';
import { ground } from './ground.js';
import { gameCamera } from './gameCamera.js';
import { gameState } from './gameState.js';

let hud = {
    
    write: function() {

        htmlSetup.writeHudValue('playerLevel', gameState.level);
        cssSetup.displayHealth(player.getHealth());
        cssSetup.displayThrust(player.getThrust());
        
    },
}

export {hud};