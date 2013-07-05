(function() {
  var sg = new SuperGif({gif: document.getElementsByTagName("img")[0]});

  sg.load(function() {
    sg.pause();
    console.log("loaded");
    var frames = sg.frames,
      sgCanvas = sg.get_canvas();

    var width = sgCanvas.width,
      height = sgCanvas.height,
      fullWidth = frames.length * width;

    var currentFrame = 0;

    window.frames = frames;
    sgCanvas.remove();

    var camera, scene, renderer;
    var geometry, material;
    var textures;

    function init() {
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 600;

        window.camera = camera;

        scene = new THREE.Scene();

        geometry = new THREE.CubeGeometry( width, height, width );

      textures = [];
      for (var i = 0, l = frames.length; i < l; i++) {
        var texture = new THREE.Texture(frames[i].data);
        texture.needsUpdate = true;
        textures.push(texture);
      }

        material = new THREE.MeshBasicMaterial( { map: textures[0]} );
        window.material = material;

        window.mesh = new THREE.Mesh( geometry, material );
        scene.add( window.mesh );

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( renderer.domElement );

    }

    function animate() {
      currentFrame = (currentFrame + 1) % frames.length;
      // note: three.js includes requestAnimationFrame shim
      requestAnimationFrame( animate );

      material.map = textures[currentFrame];

      mesh.rotation.x += 0.001;
      mesh.rotation.y += 0.02;

      renderer.render( scene, camera );
    }

    init();
    animate();
  });
})();
