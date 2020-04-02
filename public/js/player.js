var player = {

    width: 3,
    height: 0.5,
    depth: 3,

    car: null,

    health: 100,

    setGeometry: function (x, y, z) {
        return new THREE.BoxGeometry(x, y, z);
    },

    setMaterial: function () {
        return new THREE.MeshLambertMaterial({color: 0xffffff});
    },

    setOtherMaterial: function (material) {
        this.material = material;
    },

    getColor: function () {
        console.log('Getting colour :' + this.material.color.getHexString());
    }, 

    setCar: function () {
        this.car = new THREE.Mesh(
            this.setGeometry(
                this.width, 
                this.height, 
                this.depth
            ), 
            this.material
        );
    },

    setPosition: function (x, y, z) {
        this.car.position.x = x;
        this.car.position.y = y;
        this.car.position.z = z;
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

    processPlayer: function (gameSpeed) {
        // Set the sides of the car
        // Note the back of the car travels forward
        this.car.back = this.car.position.z - this.depth * 0.5;
        this.car.front = this.car.position.z + this.depth * 0.5;
        this.car.left = this.car.position.x - this.width * 0.5;
        this.car.right = this.car.position.x + this.width * 0.5;
        this.car.top = this.car.position.y + this.width * 0.5;
        this.car.bottom = this.car.position.y - this.width * 0.5;
        // Move player back forward if player has been moved back

        // Restrict player on right
        if (this.car.right > 12) {
            player.car.position.x = 12 - this.width * 0.5;
        }
        // Restrict player on left
        if (this.car.left < -12) {
            player.car.position.x = -12 + this.width * 0.5;
        }
        // Restrict player above ground (ground is at y=1)
        if (this.car.bottom < 1) {
            player.car.position.y = 0.5 + this.height * 0.5;
        }
        
    },

    addToScene: function (scene) {
        scene.add(this.car);
    },

    getHealth: function () {
        return this.health;
    },

    setHealth: function (health) {
        this.health = health;
    },

    decreaseHealth: function (decrement) {
        this.health -= decrement;
    },

};

export {player};
