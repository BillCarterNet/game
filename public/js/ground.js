import { levels } from './levels.js';
import { gameState } from './gameState.js';

function getUrlsFromLevel(level) { return [

    `../images/environment_map/${levels.eMapNameForLevel(level)}_ft.${levels.eMapFormatForLevel(level)}`,
    `../images/environment_map/${levels.eMapNameForLevel(level)}_bk.${levels.eMapFormatForLevel(level)}`,
    `../images/environment_map/${levels.eMapNameForLevel(level)}_up.${levels.eMapFormatForLevel(level)}`,
    `../images/environment_map/${levels.eMapNameForLevel(level)}_dn.${levels.eMapFormatForLevel(level)}`,
    `../images/environment_map/${levels.eMapNameForLevel(level)}_rt.${levels.eMapFormatForLevel(level)}`,
    `../images/environment_map/${levels.eMapNameForLevel(level)}_lf.${levels.eMapFormatForLevel(level)}`,

]};

let urls = getUrlsFromLevel(gameState.level);

// wrap it up into the object that we need
let cubemap = THREE.ImageUtils.loadTextureCube(urls);

// set the format, likely RGB
// unless you've gone crazy
cubemap.format = THREE.RGBFormat;

// Set up the material
let reflectionMaterialGround = new THREE.MeshBasicMaterial({

    color: 0x9999FF,
    envMap: cubemap,

});

const tileWidth = 5;
const titleHeight = 1;
const tileLength = 5;

// Set up the geometry
let geometry = new THREE.BoxGeometry(tileWidth, titleHeight, tileLength);

// Set up the object
let object = new THREE.Mesh(geometry, reflectionMaterialGround);

object.position.x = 0;
object.position.y = 0;
object.position.z = -10;

function determineTileOffsets (sectionX, sectionZ) {

/*

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

        xOffset: sectionX * tileWidth,
        zOffset: sectionZ * tileLength,
    
    }
}

function buildNormalTile (sectionX, sectionY) {

    return {
        x: 0,
        y: 0,
        z: 0,
        width: 10,
        height: 5,
        lenght: 10,
    }

}; // normal tile
const barrierBlock = 0; // taller
const holeBlock = 0; // empty

var ground = {

    addToScene: function(scene) {

        scene.add(object);

    },

    removeFromScene: function(scene) {

        scene.remove(object);

    },
    
    move:function(x, y, z) {

        object.position.x += x;
        object.position.y += y;
        object.position.z += z;

    },

    rotate: function(x, y, z) {

        object.rotateX(x);
        object.rotateY(y);
        object.rotateZ(z);

    },

    getPosVector: function() {

        return new THREE.Vector3(
            object.position.x,
            object.position.y,
            object.position.z,
        );

    },

    getPosX: function() {

        return object.position.x;

    },

    setLevelTextures: function() {

        urls = getUrlsFromLevel(gameState.level);
        cubemap = THREE.ImageUtils.loadTextureCube(urls);
        reflectionMaterialGround = new THREE.MeshBasicMaterial({

            color: 0x9999FF,
            envMap: cubemap,
        
        });
        object = new THREE.Mesh(geometry, reflectionMaterialGround);

    },

    process: function() {

        this.move(0, 0, 0);

    },

};

export {ground};
