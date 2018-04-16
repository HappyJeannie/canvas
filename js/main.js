var drawing = false;      //true为鼠标按下，false为鼠标抬起，按下的话可执行绘图/擦除功能
var eraserAbled = false;  //true为橡皮擦功能开启，false为橡皮擦功能关闭
//阻止系统默认事件，调试手机遇到屏幕滑动的问题
// document.body.addEventListener('ontouchstart' , function(e){
//   e.preventDefault();
// })

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var lastPoint = {"x":undefined,"y":undefined};

setCanvasHeight(canvas);
//画图事件
listenMouseEvent(canvas);
//监听画笔、橡皮擦、清画布、保存到本地事件
listenOperations(canvas,ctx);
//选择画笔颜色
chooseColor();

//画线
function drawLine(last,current){
  ctx.beginPath();
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
  if('ontouchstart' in document){
    canvas.ontouchstart = function(e){
      drawing = true;
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;
      lastPoint = {'x':x,'y':y};
    }
    
    canvas.ontouchmove = function(e){
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;
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
    
    canvas.ontouchend = function(){
      drawing = false;
    }
  }else{
    console.log('onmousedown')
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
}

//监听视口大小改变
window.onresize = function(){
  setCanvasHeight(canvas);
}
//监听画笔、橡皮擦、清画布、保存到本地事件
function listenOperations(canvas,ctx){
  //监听橡皮擦按钮是否点击
  eraser.onclick = function(){
    eraserAbled = true;
    this.classList = 'icon active';
    brush.classList = 'icon';
  }
  brush.onclick = function(){
    eraserAbled = false;
    this.classList = 'icon active';
    eraser.classList = 'icon';
  }
  //清除画板
  clean.onclick = function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  //保存图片
  download.onclick = function(){
    // var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
    // window.location.href=image; // it will save locally 
    var url = canvas.toDataURL('image/png');
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'canvas';
    a.click();
  }
}
//选择画笔颜色
function chooseColor(){
  red.onclick = function(){
    colors(this,'red');
  }
  yellow.onclick = function(){
    colors(this,'yellow');
  }
  blue.onclick = function(){
    colors(this,'blue');
  }
  thin.onclick = function(){
    widths(this,'2');
  }
  thick.onclick = function(){
    widths(this,'6');
  }
}
//重置颜色选中状态
function resetColorStatus(){
  var target = document.getElementsByClassName('color')[0].children;
  for(var i = 0; i<target.length;i++){
    target[i].className = '';
  }
}
//重置线宽选中状态
function resetWidth(){
  var target = document.getElementsByClassName('line')[0].children;
  for(var i = 0; i<target.length;i++){
    target[i].className = '';
  }
}
//设定颜色
function setColor(color){
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
}
//设定线宽
function setWidth(width){
  ctx.lineWidth = width;
}
//封装选择颜色方法
function colors(obj,color){
  if(obj.className.length != 0){
    setColor('black');
    resetColorStatus();
  }else{
    resetColorStatus();
    setColor(color);
    obj.className = 'active';
  }
}
//封装线宽选择方法
function widths(obj,width){
  if(obj.className.length != 0){
    setWidth(1);
    resetWidth();
  }else{
    resetWidth();
    setWidth(width);
    obj.className = 'active';
  }
}