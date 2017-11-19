
// Disabled Socket.io catcher
if(!sessionId) { 
  var sessionId = 'TEMP';
}
if(!emit) { 
  function emit(){
    console.log('emitting!!', arguments[0]);
  }
}
if(!mode) {
  var mode = 'brush'
}

var padding = 2;
var width = window.innerWidth;
var height = window.innerHeight - 25;

console.log('width', width, 'height', height)

if(width > 768) {
  width -= 70;
}

var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height
});

var layer = new Konva.Layer();

stage.add(layer); // TODO: support multi layer..

var canvas = document.createElement('canvas');
    canvas.width = width-padding;
    canvas.height = height-padding;

var image = new Konva.Image({
    image: canvas,
    x : padding,
    y : padding,
    stroke: getRandomColor(), //'green',
    blur: 2
});

layer.add(image);

stage.draw();
var paths = {};
var userPenColor = getRandomColor();
var isWritting = false;

stage.on('contentMousedown.proto', function() {

  lastPointerPosition = stage.getPointerPosition();

  if(mode == 'brush'|| mode == 'eraser'){
    var data = {
      color: getRandomColor(),
      point: lastPointerPosition,
      mode: mode,
      lineWidth: strokeSize
    };
    startPath(data, sessionId);
    emit('startPath', data, sessionId);
  }

  if(mode == 'text'){
    var textPosition = lastPointerPosition;
    doTextNode(textPosition);
  }

});

// and core function - drawing
stage.on('contentMousemove.proto', function() {
  continuePath(null, sessionId, function(lastPointerPosition){
    emit('continuePath', lastPointerPosition, sessionId)
  })
});

stage.on('contentMouseup.proto', function() {

  if(mode == 'brush'|| mode == 'eraser'){
    endPath(null, sessionId, function(lastPointerPosition){
        emit("endPath", lastPointerPosition, sessionId);
    })
  }
});

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return strokeColor;//color;
}

function startPath( data, _sessionId ) {
  
  if(!paths[_sessionId]) {
    var context = canvas.getContext('2d');
        context.strokeStyle = data.color;
        context.lineJoin = "round";
        context.lineWidth = data.lineWidth;
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
  
  var pos = stage.getPointerPosition();

  if (!!point) pos = point;

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

/**
 * Enable Text
 * 
 */
function randomPos(min, max){
  return Math.floor((Math.random() * max) + min);
}
function newText(text, _fontSize, areaPosition) {
  var pos = {
    x: randomPos(10, 150),
    y: randomPos(10, 150)
  };
  if(areaPosition){
    pos = areaPosition;
  }

  // console.log('.....text node pos', pos, areaPosition);
  var textNode = new Konva.Text({
    text: text,
    x: pos.x,
    y: pos.y,
    fontSize: _fontSize,
  });
  layer.add(textNode);
  layer.draw();
  // console.log('abs pos', textNode.getAbsolutePosition())

}

// do Text Node ::: add /edit
function doTextNode(_textPosition, textNode){

  var textNodeData = {
    text : '',
    width: 100,
    pos: _textPosition
  };
  
  if (textNode) {
    textNodeData = {
      text : textNode.text(),
      width: textNode.width(),
      pos: textNode.getAbsolutePosition()
    }
  }

  var stageBox = stage.getContainer().getBoundingClientRect();

  var areaPosition = {
      x: textNodeData.pos.x + stageBox.left,
      y: textNodeData.pos.y + stageBox.top
  };

  // console.log('textarea new pos', areaPosition);
  console.log('isWritting ??', isWritting);

  if(isWritting) {
    var _textarea = document.getElementById("DivTextNode" + sessionId);
    if(!!_textarea) {
      _textarea.blur();
    }
    isWritting = false;
    return;
  }

  isWritting = true;

  // create textarea and style it
  var textarea = document.createElement('textarea');
      textarea.setAttribute("id", "DivTextNode" + sessionId);
  document.body.appendChild(textarea);

  textarea.value = textNodeData.text;
  textarea.style.position = 'absolute';
  textarea.style.top = areaPosition.y + 'px';
  textarea.style.left = areaPosition.x + 'px';
  textarea.style.width = textNodeData.width;
  textarea.style.fontSize = fontSize + 'px';

  textarea.focus();
  textarea.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
      writeText(textarea, textNode, areaPosition);
    }
  });
  textarea.addEventListener('blur', function (e) {
      document.body.removeChild(textarea);
      isWritting = false; 
  });

  function writeText(textarea, textNode, _pos){
    if(textarea.value !== ''){
      if(textNode){
        textNode.text(textarea.value);
      } else {
        newText(textarea.value, fontSize, _pos);
      }
      layer.draw();
      emit("writeTextNode", {
        text        : textarea.value, 
        fontSize    : fontSize, 
        areaPosition: _pos
      }, sessionId);
    }
    try {
      document.body.removeChild(textarea);
    } catch (error) {
      
    }
    isWritting = false; 
  }
}

function writeTextNode(data, sessionId){
  newText(data.text, data.fontSize, data.areaPosition)
}