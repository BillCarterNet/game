import { htmlSetup } from './htmlSetup.js';
import { ground } from './ground.js';
import { gameCamera } from './gameCamera.js';
import { gameState } from './gameState.js';

let debug = {
    
    write: function() {

        htmlSetup.writeDebugValue('player_row_0_col_0', ground.getPosVector().x.toFixed(1).toString());
        htmlSetup.writeDebugValue('player_row_0_col_1', ground.getPosVector().y.toFixed(1).toString());
        htmlSetup.writeDebugValue('player_row_0_col_2', ground.getPosVector().z.toFixed(1).toString());

        htmlSetup.writeDebugValue('camera_row_0_col_0', 'Position');
        htmlSetup.writeDebugValue('camera_row_0_col_1', gameCamera.getPosVector().x.toFixed(1).toString());
        htmlSetup.writeDebugValue('camera_row_0_col_2', gameCamera.getPosVector().y.toFixed(1).toString());
        htmlSetup.writeDebugValue('camera_row_0_col_3', gameCamera.getPosVector().z.toFixed(1).toString());

        htmlSetup.writeDebugValue('camera_row_1_col_0', 'Look At');
        htmlSetup.writeDebugValue('camera_row_1_col_1', gameCamera.getLookAtVector().x.toFixed(1).toString());
        htmlSetup.writeDebugValue('camera_row_1_col_2', gameCamera.getLookAtVector().y.toFixed(1).toString());
        htmlSetup.writeDebugValue('camera_row_1_col_3', gameCamera.getLookAtVector().z.toFixed(1).toString());

        htmlSetup.writeDebugValue('gameState_row_0_col_0', 'preGame');
        htmlSetup.writeDebugValue('gameState_row_0_col_1', gameState.preGame);
        htmlSetup.writeDebugValue('gameState_row_1_col_0', 'gameRunning');
        htmlSetup.writeDebugValue('gameState_row_1_col_1', gameState.gameRunning);
        htmlSetup.writeDebugValue('gameState_row_2_col_0', 'levelComplete');
        htmlSetup.writeDebugValue('gameState_row_2_col_1', gameState.levelComplete);
        htmlSetup.writeDebugValue('gameState_row_3_col_0', 'gameOver');
        htmlSetup.writeDebugValue('gameState_row_3_col_1', gameState.gameOver);

        htmlSetup.writeDebugValue('frame_row_0_col_0', gameState.frame);
        htmlSetup.writeDebugValue('frame_row_0_col_1', gameState.gameTime - gameState.gameBoot);
        htmlSetup.writeDebugValue('frame_row_0_col_2', (gameState.frame / (gameState.gameTime - gameState.gameBoot) * 1000).toFixed(1).toString());
        htmlSetup.writeDebugValue('frame_row_0_col_3', (1000/(gameState.gameTime - gameState.gameTimeLastFrame)).toFixed(1).toString());
    },
}

export {debug};