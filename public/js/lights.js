var lights = {

  count: 1,

  set: [],

  setUpLights: function() {
    // Player
    var light = new THREE.PointLight(0x444444);
    light.position.set(0,0,0);
    this.set.push(light);
    // Left Back
    // var light = new THREE.PointLight(0xFF0000);
    // light.position.set(-12,12,0);
    // this.set.push(light);
    // // Right Back
    // var light = new THREE.PointLight(0xFF0000);
    // light.position.set(12,12,0);
    // this.set.push(light);
    // // Left Front
    // var light = new THREE.PointLight(0x00FF00);
    // light.position.set(-12,12,24);
    // this.set.push(light);
    // // Right Front
    // var light = new THREE.PointLight(0x00FF00);
    // light.position.set(12,12,24);
    // this.set.push(light);
  },

  process: function(x, y, z) {
    this.set[0].position.set(x,y,z);
  },

  addToScene: function(scene) {
    for (var i = 0 ; i < this.set.length ; i++) {
        scene.add(this.set[i]);
    }
  }
};

export {lights};
