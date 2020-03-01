///// CONSTANTS /////
const PI = Math.PI;
const BALL_RADIUS = 15;
const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 30;

///// APP STATE (VARIABLES) /////
let ballX;
let ballY;


///// CACHED ELEMENT REFERENCES /////
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

///// EVENTS & LISTENERS /////
window.onload = function() {
    init();

    setInterval(updateAll, 10);
};




///// FUNCTIONS /////

/**
 * Function that runs on page startup to assign variable values and to render the canvas.
 */
function init() {
    ballX = canvas.width / 2;
    ballY = canvas.height - 20;


}

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(ballX, ballY, BALL_RADIUS, 0, PI);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();

}

function drawBricks() {

}

function updateAll() {

}