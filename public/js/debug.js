import { htmlSetup } from './htmlSetup.js';
import { ground } from './ground.js';
import { gameCamera } from './gameCamera.js';
import { gameState } from './gameState.js';
import { gameConfig } from './gameConfig.js';
import { player } from './player.js';

let debug = {
    
    write: function() {

        htmlSetup.writeDebugValue('level_row_0_col_0', gameState.level);
        htmlSetup.writeDebugValue('level_row_0_col_1', ground.getNoOfTiles());
        htmlSetup.writeDebugValue('level_row_0_col_2', ground.getNoOfTilesByType('B'));
        htmlSetup.writeDebugValue('level_row_0_col_3', ground.getNoOfTiles() - ground.getNoOfTilesByType('B') - ground.getNoOfTilesByType('N'));
        htmlSetup.writeDebugValue('level_row_0_col_4', ground.getNoOfTilesByType('N'));

        htmlSetup.writeDebugValue('player_row_0_col_0', 'Position');
        htmlSetup.writeDebugValue('player_row_0_col_1', player.getPosVector().x.toFixed(1).toString());
        htmlSetup.writeDebugValue('player_row_0_col_2', player.getPosVector().y.toFixed(1).toString());
        htmlSetup.writeDebugValue('player_row_0_col_3', player.getPosVector().z.toFixed(1).toString());

        htmlSetup.writeDebugValue('player_row_1_col_0', 'Velcocity (units/s)');
        htmlSetup.writeDebugValue('player_row_1_col_1', player.getVelVector().x.toFixed(1).toString());
        htmlSetup.writeDebugValue('player_row_1_col_2', player.getVelVector().y.toFixed(1).toString());
        htmlSetup.writeDebugValue('player_row_1_col_3', player.getVelVector().z.toFixed(1).toString());

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
        htmlSetup.writeDebugValue('gameState_row_3_col_0', 'gameTimeDelta (ms)');
        htmlSetup.writeDebugValue('gameState_row_3_col_1', gameState.getGameTimeDelta().toString());
        // htmlSetup.writeDebugValue('gameState_row_5_col_0', 'gameTimeLastFrame');
        // htmlSetup.writeDebugValue('gameState_row_5_col_1', gameState.gameTimeLastFrame.toFixed(3).toString());

        htmlSetup.writeDebugValue('frame_row_0_col_0', gameState.frame);
        htmlSetup.writeDebugValue('frame_row_0_col_1', gameState.gameTime - gameState.gameBoot);
        htmlSetup.writeDebugValue('frame_row_0_col_2', (gameState.frame / (gameState.gameTime - gameState.gameBoot) * 1000).toFixed(1).toString());
        htmlSetup.writeDebugValue('frame_row_0_col_3', (1000/(gameState.gameTime - gameState.gameTimeLastFrame)).toFixed(1).toString());

        htmlSetup.writeDebugValue('config_row_0_col_0', 'gameSpeed');
        htmlSetup.writeDebugValue('config_row_0_col_1', gameConfig.gameSpeed.toFixed(1).toString());
        htmlSetup.writeDebugValue('config_row_1_col_0', 'gravityAcc');
        htmlSetup.writeDebugValue('config_row_1_col_1', gameConfig.gravityAcc.toFixed(1).toString());
        htmlSetup.writeDebugValue('config_row_2_col_0', 'thrustAcc');
        htmlSetup.writeDebugValue('config_row_2_col_1', gameConfig.thrustAcc.toFixed(1).toString());
        htmlSetup.writeDebugValue('config_row_3_col_0', 'thrustRegen');
        htmlSetup.writeDebugValue('config_row_3_col_1', gameConfig.thrustRegen.toFixed(1).toString());
        htmlSetup.writeDebugValue('config_row_4_col_0', 'initialThrustImpulse');
        htmlSetup.writeDebugValue('config_row_4_col_1', gameConfig.initialThrustImpulse.toFixed(1).toString());
        htmlSetup.writeDebugValue('config_row_5_col_0', 'thrustUsageRate');
        htmlSetup.writeDebugValue('config_row_5_col_1', gameConfig.thrustUsageRate.toFixed(1).toString());

    },
}

export {debug};