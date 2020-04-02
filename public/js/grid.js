var grid = {

  count: 9,

  set: [],

  setGeometry: function (x,y,z,x2,y2,z2) {
      var geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3( x, y, z) );
      geometry.vertices.push(new THREE.Vector3( x2, y2, z2) );
      return geometry;
  },

  setMaterial: function (colour) {
      return new THREE.LineBasicMaterial( colour );
  },

  setCount: function(count) {
      this.count = count;
  },

  fillSet: function() {
      // At z=0
      for (var i = 0 ; i < this.count ; i++) {
          var geometry = this.setGeometry(-12 + 3 * i,1,0,-12 + 3 * i,10,0);
          var material = this.setMaterial({ color: 0xffff00 });
          var line = new THREE.Line( geometry, material );
          this.set.push(line);
      }
      var geometry = this.setGeometry(-12,1,0,12,1,0);
      var material = this.setMaterial({ color: 0xffff00 });
      var line = new THREE.Line( geometry, material );
      this.set.push(line);
      var geometry = this.setGeometry(-12,10,0,12,10,0);
      var material = this.setMaterial({ color: 0xffff00 });
      var line = new THREE.Line( geometry, material );
      this.set.push(line);
      // At z=10
      for (var i = 0 ; i < this.count ; i++) {
          var geometry = this.setGeometry(-12 + 3 * i,1,10,-12 + 3 * i,10,10);
          var material = this.setMaterial({ color: 0x00ff00 });
          var line = new THREE.Line( geometry, material );
          this.set.push(line);
      }
      var geometry = this.setGeometry(-12,1,10,12,1,10);
      var material = this.setMaterial({ color: 0x00ff00 });
      var line = new THREE.Line( geometry, material );
      this.set.push(line);
      var geometry = this.setGeometry(-12,10,10,12,10,10);
      var material = this.setMaterial({ color: 0x00ff00 });
      var line = new THREE.Line( geometry, material );
      this.set.push(line);
      // At z=20
      for (var i = 0 ; i < this.count ; i++) {
          var geometry = this.setGeometry(-12 + 3 * i,1,20,-12 + 3 * i,10,20);
          var material = this.setMaterial({ color: 0x00ffff });
          var line = new THREE.Line( geometry, material );
          this.set.push(line);
      }
      var geometry = this.setGeometry(-12,1,20,12,1,20);
      var material = this.setMaterial({ color: 0x00ffff });
      var line = new THREE.Line( geometry, material );
      this.set.push(line);
      var geometry = this.setGeometry(-12,10,20,12,10,20);
      var material = this.setMaterial({ color: 0x00ffff });
      var line = new THREE.Line( geometry, material );
      this.set.push(line);
      // Lines on the floor
      for (var i = 0 ; i < 29 ; i++) {
          var geometry = this.setGeometry(-12,1,0 + i,12,1,0+i);
          var material = this.setMaterial({ color: 0xffffff });
          var line = new THREE.Line( geometry, material );
          this.set.push(line);
      }
  },

  addToScene: function(scene) {
      for (var i = 0 ; i < this.set.length ; i++) {
          scene.add(this.set[i]);
      }
  }
};

export {grid};
