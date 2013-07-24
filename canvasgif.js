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

    var camera, controls, scene, renderer;

    function init() {
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 600;

        controls = new THREE.TrackballControls( camera );

        scene = new THREE.Scene();

      for (var i = 0, l = frames.length; i < l; i++) {
        var geometry = new THREE.CubeGeometry( width, height, 0 );

        var texture = new THREE.Texture(frames[i].data);
        texture.needsUpdate = true;

        var material = new THREE.MeshBasicMaterial( { map: texture} );

        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(0, 0, -50 * i);

        scene.add( mesh );
      }

      renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );

      document.body.appendChild( renderer.domElement );

    }

    function animate() {
      // note: three.js includes requestAnimationFrame shim
      requestAnimationFrame( animate );

      controls.update();

      renderer.render( scene, camera );
    }

    init();
    animate();
  });
})();
