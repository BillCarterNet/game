// Imports
import { levels } from './levels.js';
import { gameState } from './gameState.js';
import { gameConfig } from './gameConfig.js';

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

        color: 0xAA6600,
        envMap: cubemap,
    
    })

};

function determineTileOffsets(sectionX, sectionZ) {

/*

    Level is a collection of grids
    A Grid is a 5 x 5 square of Tiles
    A tile is one of 3 types


X ->
Z        -2  -1   0   1   2
|       +---+---+---+---+---+
v     2 |   |   |   |   |   |
        +---+---+---+---+---+
      1 |   |   |   |   |   |
        +---+---+---+---+---+
      0 |   |   |   |   |   |
        +---+---+---+---+---+
     -1 |   |   |   |   |   |
        +---+---+---+---+---+
     -2 |   |   |   |   |   |
        +---+---+---+---+---+

*/

    return {

        xOffset: sectionX * gameConfig.tile.width,
        zOffset: sectionZ * gameConfig.tile.length,
    
    };

}

function createGridObjectArray(i, reflectionMaterial) {

    let gridArray = [];

    // loop through grid rows
    for(let row = -2; row <= 2 ; row++) {
        // loop through line
        for(let char = -2 ; char <= 2 ; char++) {
            let tileType = levels.getSection(i)[row+2].charAt(char+2);
            let height = 0;
            switch(tileType) {
                case 'N':
                    height = gameConfig.tile.height.normal;
                    break;
                case 'H':
                    height = 0;
                    break;
                case 'B':
                    height = gameConfig.tile.height.block;
                    break;
            }
            let tileGeometry = new THREE.BoxGeometry(gameConfig.tile.width, height, gameConfig.tile.length);
            let tile = {};
            if (tileType != 'H') {
                tile = new THREE.Mesh(tileGeometry, reflectionMaterial);
                tile.position.x = determineTileOffsets(char, row).xOffset;
                tile.position.y = 0.5 * height;
                tile.position.z = determineTileOffsets(char, row).zOffset - (5 * i * gameConfig.tile.length);
                tile.type = tileType;
                gridArray.push(tile);
            }

        }
    }

    return gridArray;

}

let reflectionMaterial = {};

let levelArray = {};

// Publics
var ground = {

    createLevel: function() {
        reflectionMaterial = getReflectionMaterial(
            getCubemap(
                getUrlsFromLevel(
                    gameState.level
                )
            )
        );
        levelArray = createGridObjectArray(0, reflectionMaterial).concat(
            createGridObjectArray(1, reflectionMaterial),
            createGridObjectArray(2, reflectionMaterial),
            createGridObjectArray(3, reflectionMaterial),
        );
    },

    addLevelToScene: function(scene) {

        for (let i = 0 ; i < levelArray.length ; i++) {
            scene.add(levelArray[i]);

        }       

    },

    removeLevelFromScene: function(scene) {

        for (let i = 0 ; i < levelArray.length ; i++) {
            scene.remove(levelArray[i]);
        }

    },

    processLevel: function() {

        for (let i = 0 ; i < levelArray.length ; i++) {
            levelArray[i].position.z += gameConfig.gameSpeed * gameState.getGameTimeDelta() * 0.001;
        }

    },

    getNoOfTilesByType: function(type) {

        let count = 0;
        for (let i = 0 ; i < levelArray.length ; i++) {
            if (levelArray[i].type == type) {
                count++;
            }
        }
        return count;

    },

    getNoOfTiles: function() {

        return levelArray.length;

    }

};

export {ground};
