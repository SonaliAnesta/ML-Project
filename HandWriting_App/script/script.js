var canvas;
var ctx;
var mouseX;
var mouseY;
var mouseDown = 0;
var touchX, touchY;
function drawCircle(ctx, x, y, size) {
    r = 0;
    g = 0;
    b = 0;
    a = 255; //opaque
    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a / 255 + ")";
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}
function clearCanvas(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
//get mouse position
function getMousePosition(moves) {
    if (!moves) var moves = event;

    if (moves.offsetX) {
        mouseX = moves.offsetX;
        mouseY = moves.offsetY;
    } else if (moves.layerX) {
        mouseX = moves.layerX;
        mouseY = moves.layerY;
    }
}
// //draw and prevent default scrolling with touch
function canvase_touchMove(moves) {
    getTouchPosition(moves);

    drawCircle(ctx, touchX, touchY, 10);

    //prevent scrolling
    event.preventDefault();
}

function getTouchPosition(moves) {
    if (!moves) var moves = event;

    if (moves.touches) {
        if (moves.touches.length == 1) {
            //one finger
            var touch = moves.touches[0]; //get info for finger
            touchX = touch.pageX - touch.target.offsetLeft;
            touchY = touch.pageY - touch.target.offsetTop;
        }
    }
}

function canvase_mouseDown() {
    mouseDown = 1;
    drawCircle(ctx, mouseX, mouseY, 4);
}
function canvase_mouseUp() {
    mouseDown = 0;
}
function canvase_mouseMove(moves) {
    getMousePosition(moves);
    if (mouseDown == 1) {
        drawCircle(ctx, mouseX, mouseY, 10);
    }
}

function backspace(){
    let input = document.getElementById('textinput');
    let str = input.value;
    if(str)
        input.value=str.substr(0, str.length - 1);
}

function init() {
    canvas = document.getElementById("canvas");

    if (canvas.getContext) ctx = canvas.getContext("2d");

    //check for ctx first
    if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        canvas.addEventListener("mousedown", canvase_mouseDown, false);
        canvas.addEventListener("mousemove", canvase_mouseMove, false);
        window.addEventListener("mouseup", canvase_mouseUp, false);
        // canvas.addEventListener('touchstart', canvase_touchStart,    false);
        canvas.addEventListener("touchmove", canvase_touchMove, false);
    }
}
