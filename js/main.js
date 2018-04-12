var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var flag = false;

var lastPoint = {"x":undefined,"y":undefined};

canvas.onmousedown = function(e){
 var x = e.clientX;
 var y = e.clientY;
 lastPoint['x'] = x;
 lastPoint['y'] = y;
 flag = true;
 drawCircle(x,y,2);
}

canvas.onmousemove = function(e){
  if(flag){
    var x = e.clientX;
    var y = e.clientY;
    var currentPoint = {"x":x,"y":y};
    drawCircle(x,y,2);
    //画线
    drawLine(lastPoint,currentPoint);
    lastPoint = currentPoint;
  }
}

canvas.onmouseup = function(){
  flag = false;
}

//画线
function drawLine(last,current){
  ctx.beginPath();
  ctx.strokeStyle = '#666';
  ctx.lineWidth = 2;
  ctx.moveTo(last.x,last.y);
  ctx.lineTo(current.x,current.y);
  ctx.stroke();
  ctx.closePath();
  lastPoint = current;
}

//画圆
function drawCircle(x,y,r){
  ctx.beginPath();
  ctx.arc(x,y,r,0,Math.PI*2);
  ctx.fill();
}
