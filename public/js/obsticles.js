var obsticles = {

    width: 3,
    height: 6,
    depth: 3,

    set: [],

    count: 45,

    setGeometry: function (x, y, z) {
        return new THREE.BoxGeometry(x, y, z);
    },

    setMaterial: function () {
        return new THREE.MeshLambertMaterial({color: 0xffffff});
    },

    setOtherMaterial: function (material) {
        this.material = material;
    },

    getZ: function (i) {
        return this.set[i].position.z;
    },

    fillSet: function() {
        for (var i = 0 ; i < this.count ; i++) {
            var geometry = this.setGeometry(this.width, this.height, this.depth);
            var obsticle = new THREE.Mesh(geometry, this.material);
            obsticle.position.x = -12 + 3 * (Math.floor(Math.random() * 8)) + this.width * 0.5;
            obsticle.position.y = 1;
            obsticle.position.z -= i * this.depth;
            obsticle.height = this.height;
            obsticle.width = this.width;
            obsticle.depth = this.depth;
            this.set.push(obsticle);
        }
    },

    processSet: function (gameSpeed, player, camera) {
        for (var i = 0 ; i < this.set.length ; i++) {
            // Move obsticle
            this.set[i].position.z += gameSpeed;
            // Set the sides of the obsticle
            this.set[i].front = this.set[i].position.z + this.set[i].depth * 0.5;
            this.set[i].back = this.set[i].position.z - this.set[i].depth * 0.5;
            this.set[i].right = this.set[i].position.x + this.set[i].width * 0.5;
            this.set[i].left = this.set[i].position.x - this.set[i].width * 0.5;
            this.set[i].top = this.set[i].position.y + this.set[i].height * 0.5; 
            this.set[i].bottom = this.set[i].position.y - this.set[i].height * 0.5;
            // Make sure the obsticle is completely above ground
            if (this.set[i].bottom < 1) {
                this.set[i].position.y = 0.5 + this.set[i].height * 0.5;
            }
            // Wireframe the obsticle if its behind the player
            // if (this.set[i].front > player.car.back) {
            //     var geometry = this.setGeometry(this.width, this.height, this.depth);
            //     geometry.wireframe = true;
            //     this.set[i] = new THREE.Mesh(geometry, this.material);
            // }
            // Reset obsticle if off screen
            if (this.set[i].front > camera.position.z) {
                // Set it back in the distance
                this.set[i].position.z = (-i * 20) - 100;
                // Give it a random lane
                this.set[i].position.x = -12 + 3 * (Math.floor(Math.random() * 8)) + this.width * 0.5;
            }
            document.getElementById("debug1").innerHTML = "NO COLLISION";
            // Is obsticle in same lane as player
            if (player.car.position.x == this.set[i].position.x)
            {
                if ((player.car.back <= this.set[i].front) && (player.car.front >= this.set[i].front)) {
                     document.getElementById("debug1").innerHTML = "ACTIVE FRONT COLLISION";
                     player.car.position.z = this.set[i].front + player.depth * 0.5;
                     player.decreaseHealth(1);
                }
            }
        }
    },

    addToScene: function(scene) {
        for (var i = 0 ; i < this.set.length ; i++) {
            scene.add(this.set[i]);
        }
    }

};

export {obsticles};
