///// CONSTANTS /////
const PI = Math.PI;
const BALL_RADIUS = 10;
const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 70;
const PADDLE_DIST_FROM_EDGE = 60;
const BRICK_ROWS = 4;
const BRICK_COLUMNS = 6;
const BRICK_WIDTH = 75;
const BRICK_HEIGHT = 15;
const BRICK_PADDING = 10;
const BRICK_OFFSET_TOP = 30;
const BRICK_OFFSET_LEFT = 30;
// const SPEED_MULTIPLIER = 3.14;

///// APP STATE (VARIABLES) /////
let ballX;
let ballY;
let paddleX;
let dx;
let dy;
let bricks = [];
let interval;
let score;
let wins = 0;
let losses = 0;
let initX = [-1.5, -1, -0.5, 0.5, 1, 1.5];

///// CACHED ELEMENT REFERENCES /////
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreUpdate = document.getElementById("scorekeeper");

///// EVENTS & LISTENERS /////
window.onload = function() {
    init();

    canvas.addEventListener('mousemove', updateMouse);
};

document.getElementById("reset-button").onclick = init;
interval = setInterval(render, 10);


///// FUNCTIONS /////

/**
 * Function that runs on page startup to assign variable values and to render the canvas.
 */
function init() {
    ballX = canvas.width / 2;
    ballY = canvas.height - 20;
    paddleX = (canvas.width - PADDLE_WIDTH) / 2;
    dx = initX[Math.floor(Math.random(0, 1) * initX.length)];
    dy = -3;
    score = 0;

    for (var c = 0; c < BRICK_COLUMNS; c++) {
        bricks[c] = [];
        for (var r = 0; r < BRICK_ROWS; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1};
        }
    }

    render();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    collisionDetection();
    drawBricks();

    scoreUpdate.textContent = `WINS: ${wins} | LOSSES: ${losses}`;

    if (ballX + dx > canvas.width - BALL_RADIUS || ballX + dx < BALL_RADIUS) {
        dx = -dx;
    }
    if (ballY + dy < BALL_RADIUS) {
        dy = -dy;
    } else if (ballY + dy > canvas.height - BALL_RADIUS) {
        if (ballX > paddleX && ballX < paddleX + PADDLE_WIDTH) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            losses++;
            init();
        }
    }
    // if (ballY == 540 && (ballX > paddleX - 35) || ballX < paddleX + 35) {
    //     var intersection = ballX;
    //     dy = (ballY/intersection) * SPEED_MULTIPLIER;
    // } else {

    // }

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
    for(var c = 0; c < BRICK_COLUMNS; c++) {
        for(var r = 0; r < BRICK_ROWS; r++) {
            if (bricks[c][r].status == 1) {
                var BRICK_X = (c * (BRICK_WIDTH + BRICK_PADDING)) + BRICK_OFFSET_LEFT;
                var BRICK_Y = (r * (BRICK_HEIGHT + BRICK_PADDING)) + BRICK_OFFSET_TOP;
                bricks[c][r].x = BRICK_X;
                bricks[c][r].y = BRICK_Y;
                ctx.beginPath();
                ctx.rect(BRICK_X, BRICK_Y, BRICK_WIDTH, BRICK_HEIGHT);
                ctx.fillStyle = "#ffffff";
                ctx.fill();
                ctx.closePath();
            }
        }
    }}

function collisionDetection() {
    for (var c = 0; c < BRICK_COLUMNS; c++) {
        for (var r = 0; r < BRICK_ROWS; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (ballX > b.x && ballX < b.x + BRICK_WIDTH && ballY > b.y && ballY < b.y + BRICK_HEIGHT) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == BRICK_ROWS * BRICK_COLUMNS) {
                        alert("YOU WIN!");
                        wins++;
                        init();                        
                    }
                }
            }
        }
    }
}

function updateMouse(e) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
  
    mouseX = e.clientX - rect.left - root.scrollLeft;
    mouseY = e.clientY - rect.top - root.scrollTop;
  
    paddleX = mouseX - PADDLE_WIDTH / 2;
}