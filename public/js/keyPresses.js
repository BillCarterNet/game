import { cssSetup } from './cssSetup.js';
import { ground } from './ground.js';
import { gameCamera } from './gameCamera.js';
import { gameState } from './gameState.js';
import { gameConfig } from './gameConfig.js';
import { player } from './player.js';

let keyPresses = {
    process: () => {
        document.onkeypress = function (e) {
            e = e || window.event;
            console.log('e.which = '+ e.which);
        
            if (e.which) {
                gameState.preGame = false;
                gameState.gameRunning = true;
            }

            // camera

            // is it 'i'
            if (e.which === 105) {
                gameCamera.movePosVector(0, 0.1, 0);
            }
        
            // is it 'k'
            if (e.which === 107) {
                gameCamera.movePosVector(0, -0.1, 0);
            }

            // is it 'u'
            if (e.which === 117) {
                gameCamera.movePosVector(0, 0, 0.1);
            }
        
            // is it 'j'
            if (e.which === 106) {
                gameCamera.movePosVector(0, 0, -0.1);
            }


            // is it 'p'
            if (e.which === 112) {
                gameCamera.movePosVector(0.1, 0, 0);
            }

            // is it 'o'
            if (e.which === 111) {
                gameCamera.movePosVector(-0.1, 0, 0);
            }

            // is it 't'
            if (e.which === 116) {
                if (gameState.objectFocus) {
                    gameState.objectFocus = false;
                } else {
                    gameState.objectFocus = true;
                }

            }

            // Misc

            // is it 'd'
            if (e.which === 100) {
                let debug = document.getElementById('debugHud').hidden;
                console.log(debug);
                if (debug) {
                    document.getElementById('debugHud').hidden = false;
                } else {
                    document.getElementById('debugHud').hidden = true;
                }
            }

            // is it 'g'
            if (e.which === 103) {
                if (gameState.gameOver) {
                    gameState.gameOver = false;
                } else {
                    gameState.gameOver = true;
                }
                //console.log(gameState.level);
            }

            // is it 'h'
            if (e.which === 104) {
                if (gameState.levelComplete) {
                    gameState.levelComplete = false;
                } else {
                    gameState.levelComplete = true;
                }
                //console.log(gameState.levelComplete);
            }

            // is it 'r'
            if (e.which === 114) {
                gameConfig.gameSpeed += 0.1;
            }

            // is it 'f'
            if (e.which === 102) {
                gameConfig.gameSpeed -= 0.1;
            }

            // // Translation

            // // is it 'p'
            // if (e.which === 112) {
            //     ground.move(0.5, 0, 0);
            // }

            // // is it 'o'
            // if (e.which === 111) {
            //     ground.move(-0.5, 0, 0);
            // }

            // is it 'q'
            if (e.which === 113) {
                player.decreaseHealth(-1);
            }

            // is it 'a'
            if (e.which === 97) {
                player.decreaseHealth(1);
            }

            // is it 'v'
            if (e.which === 118) {
                gameConfig.gameSpeed = 0.0;
            }

            // // is it 'w'
            // if (e.which === 119) {
            //     ground.move(0, 0, -0.5);
            // }

            // // is it 's'
            // if (e.which === 115) {
            //     ground.move(0, 0, 0.5);
            // }

            // // Rotation

            // // is it 'z'
            // if (e.which === 122) {
            //     ground.rotate(0.1, 0, 0);
            // }

            // // is it 'x'
            // if (e.which === 120) {
            //     ground.rotate(-0.1, 0, 0);
            // }

            // // is it 'c'
            // if (e.which === 99) {
            //     ground.rotate(0, 0.1, 0);
            // }

            // // is it 'v'
            // if (e.which === 118) {
            //     ground.rotate(0, -0.1, 0);
            // }

            // // is it 'b'
            // if (e.which === 98) {
            //     ground.rotate(0, 0, 0.1);
            // }

            // // is it 'n'
            // if (e.which === 110) {
            //     ground.rotate(0, 0, -0.1);
            // }

            // is it 'm'
            if (e.which === 109) {
                if (player.getThrust() > 0) {
                    if (player.isOnGround()) {
                        // set velocity based on thrust
                        player.setVelY(gameConfig.initialThrustImpulse + gameConfig.thrustAcc);
                    } else {
                        player.setVelY(gameConfig.thrustAcc);
                    }
                    // decrease thrust player
                    player.decreaseThrust(gameConfig.thrustUsageRate);
                }
            }

        };
    }
};

export {keyPresses};
