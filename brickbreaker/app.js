///// CONSTANTS /////
const PI = Math.PI;
const BALL_RADIUS = 10;
const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 50;

///// APP STATE (VARIABLES) /////
let ballX;
let ballY;
let paddleX;
let dx;
let dy;

///// CACHED ELEMENT REFERENCES /////
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

///// EVENTS & LISTENERS /////
window.onload = function() {
    init();

    setInterval(render, 10);
    canvas.addEventListener('mousemove', updateMouse);
};

///// FUNCTIONS /////

/**
 * Function that runs on page startup to assign variable values and to render the canvas.
 */
function init() {
    ballX = canvas.width / 2;
    ballY = canvas.height - 20;
    paddleX = (canvas.width - PADDLE_WIDTH) / 2;
    dx = 1;
    dy = -2;

    render();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (ballX + dx > canvas.width - BALL_RADIUS || ballX + dx < BALL_RADIUS) {
        dx = -dx;
    }
    if (ballY + dy < BALL_RADIUS) {
        dy = -dy;
    } else if(ballY + dy > canvas.height - BALL_RADIUS) {
        if(ballX > paddleX && ballX < paddleX + PADDLE_WIDTH) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); 
        }
    }


    ballX += dx;
    ballY += dy;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, BALL_RADIUS, 0, PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, (canvas.height - PADDLE_HEIGHT), PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillStyle = "#b0b0b0";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {

}

function updateMouse(e) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
  
    mouseX = e.clientX - rect.left - root.scrollLeft;
    mouseY = e.clientY - rect.top - root.scrollTop;
  
    paddleX = mouseX - PADDLE_WIDTH / 2;
}