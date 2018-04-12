var drawing = false;      //true为鼠标按下，false为鼠标抬起，按下的话可执行绘图/擦除功能
var eraserAbled = false;  //true为橡皮擦功能开启，false为橡皮擦功能关闭

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var btnE = document.getElementById('eraser');
var btnB = document.getElementById('brush');
var lastPoint = {"x":undefined,"y":undefined};

setCanvasHeight(canvas);
listenMouseEvent(canvas);

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

//重置画板大小
function setCanvasHeight(target){
  var oHeight = document.documentElement.clientHeight;
  var oWidth = document.documentElement.clientWidth;
  target.width = oWidth;
  target.height = oHeight;
}
//画图删除
function clearCanvas(x,y){
 ctx.clearRect(x-10,y-10,20,20);
}

//事件监听
//监听鼠标事件
function listenMouseEvent(canvas){
  canvas.onmousedown = function(e){
    drawing = true;
    var x = e.clientX;
    var y = e.clientY;
    lastPoint = {'x':x,'y':y};
  }
  
  canvas.onmousemove = function(e){
    var x = e.clientX;
    var y = e.clientY;
    var currentPoint = {"x":x,"y":y};
    if(eraserAbled){
      if(drawing){
        clearCanvas(x,y);
      }
    }else{
      if(drawing){
        //画线
        drawLine(lastPoint,currentPoint);
      }
    }
    lastPoint = currentPoint;
  }
  
  canvas.onmouseup = function(){
    drawing = false;
  }
}

//监听视口大小改变
window.onresize = function(){
  setCanvasHeight(canvas);
}

//监听橡皮擦按钮是否点击
btnE.onclick = function(){
  eraserAbled = !eraserAbled;
  setBtnStat();
}
btnB.onclick = function(){
  eraserAbled = !eraserAbled;
  setBtnStat();
}
function setBtnStat(){
  if(eraserAbled){
    btnB.style.display = 'block';
    btnE.style.display = 'none';
  }else{
    btnB.style.display = 'none';
    btnE.style.display = 'block';
  }
}