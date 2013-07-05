(function() {
  var surround = document.getElementById("datSurround"),
      canvas = document.getElementById("datCanvas"),
      ctx = canvas.getContext("2d");

  var sg = new SuperGif({gif: document.getElementsByTagName("img")[0]});
  canvas.style.webkitTransform = "translate3d(0,0,0)";

  sg.load(function() {
    sg.pause();
    console.log("loaded");
    var frames = sg.frames,
      sgCanvas = sg.get_canvas();

    var width = sgCanvas.width,
      height = sgCanvas.height,
      fullWidth = frames.length * width;

    surround.style.width = width;
    surround.style.height = height;

    canvas.width = fullWidth;
    canvas.height = height;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, fullWidth, height);

    for (var i = 0, l = frames.length; i < l; i++) {
      ctx.putImageData(frames[i].data, width * i, 0);
    }

    var currentFrame = 0;
    var nextFrame = function() {
      currentFrame = (currentFrame + 1) % frames.length;
      canvas.style.webkitTransform = "translate3d(" + currentFrame * -width + "px,0,0)";
      requestAnimationFrame(nextFrame);
    };
    nextFrame();

    window.frames = frames;
    sgCanvas.remove();



    var camera, scene, renderer;
    var geometry, material;
    var textures;

    init();
    animate();

    function init() {
        camera = new THREE.PerspectiveCamera( 75, width / height, 1, 10000 );
        camera.position.z = 200;

        window.camera = camera;

        scene = new THREE.Scene();

        geometry = new THREE.CubeGeometry( width, height, 0 );

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
        renderer.setSize( width, height );

        document.body.appendChild( renderer.domElement );

    }

    function animate() {
      // note: three.js includes requestAnimationFrame shim
      requestAnimationFrame( animate );

      material.map = textures[currentFrame];

      renderer.render( scene, camera );
    }
  });

  window.datCanvas = canvas;
  window.datCtx = ctx;
  window.sg = sg;

})();
