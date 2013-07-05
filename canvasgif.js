(function() {
  var surround = document.getElementById("datSurround"),
      canvas = document.getElementById("datCanvas"),
      ctx = canvas.getContext("2d");

  var sg = new SuperGif({gif: document.getElementsByTagName("img")[0]});
  canvas.style.webkitTransform = "translate3d(0,0,0)";

  sg.load(function() {
    sg.pause();
    console.log("loaded");
    var frames = sg.frames.slice(0, 50),
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
  });

  window.datCanvas = canvas;
  window.datCtx = ctx;
  window.sg = sg;

})();
