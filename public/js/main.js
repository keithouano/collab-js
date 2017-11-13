
var width = window.innerWidth;
var height = window.innerHeight - 25;

var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height
});
var layer = new Konva.Layer();
stage.add(layer);

var canvas = document.createElement('canvas');
canvas.width = stage.width() / 1.25;
canvas.height = stage.height() / 1.25;

var image = new Konva.Image({
    image: canvas,
    x : stage.width() / 8,
    y : stage.height() / 8,
    stroke: getRandomColor(), //'green',
    blur: 2
});

var mode = 'brush'

layer.add(image);

stage.draw();
var paths = {};
var userPenColor = getRandomColor();

stage.on('contentMousedown.proto', function() {
  lastPointerPosition = stage.getPointerPosition();
  var data = {
    color: getRandomColor(),
    point: lastPointerPosition,
    mode: mode
  };
  startPath(data, sessionId);
  emit('startPath', data, sessionId);
});

// and core function - drawing
stage.on('contentMousemove.proto', function() {
  continuePath(null, sessionId, function(lastPointerPosition){
    emit('continuePath', lastPointerPosition, sessionId)
  })
});

stage.on('contentMouseup.proto', function() {
  endPath(null, sessionId, function(lastPointerPosition){
      emit("endPath", lastPointerPosition, sessionId);
  })
});

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function startPath( data, _sessionId ) {
  
  if(!paths[_sessionId]) {
    var context = canvas.getContext('2d');
        context.strokeStyle = data.color;
        context.lineJoin = "round";
        context.lineWidth = 5;
    paths[_sessionId] = {
      context : context,
      isPaint : true,
      lastPointerPosition: data.point,
      mode : data.mode
    }
  }
}

function continuePath(point, _sessionId, callback){
  if (!paths[_sessionId]) return;
  if (!paths[_sessionId].isPaint) return;

  var path = paths[_sessionId];
  var mode = path.mode;
  var context = path.context;
  var lastPointerPosition = path.lastPointerPosition;
  
  var pos = stage.getPointerPosition() || point;

  if (mode === 'brush') {
    context.globalCompositeOperation = 'source-over';
  }
  if (mode === 'eraser') {
    context.globalCompositeOperation = 'destination-out';
  }
  context.beginPath();
  var localPos = {
    x: lastPointerPosition.x - image.x(),
    y: lastPointerPosition.y - image.y()
  };
  context.moveTo(localPos.x, localPos.y);
  localPos = {
    x: pos.x - image.x(),
    y: pos.y - image.y()
  };
  context.lineTo(localPos.x, localPos.y);
  context.closePath();
  context.stroke();
  layer.draw();
  path.lastPointerPosition = pos;
  if(callback)
    callback(lastPointerPosition)
}

function endPath(point, _sessionId, callback) {
  var path = paths[_sessionId];
    path.isPaint = false;
  if(callback)
    callback(path.lastPointerPosition)
  delete paths[_sessionId];
}

var select = document.getElementById('tool');
select.addEventListener('change', function() {
  mode = select.value;
});