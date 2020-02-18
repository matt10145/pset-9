///// CONSTANTS /////

///// APP STATE (VARIABLES) /////
let turn;
let board;

///// CACHED ELEMENT REFERENCES  /////
const squares = Array.from(document.querySelectorAll("#board div"));
const turnUpdate = document.getElementById("turnUpdate");

///// EVENT LISTENERS /////
window.onload = function() {
    init();
}

function setEventListeners() {


}

///// FUNCTIONS  /////
function init() {
    board = ["", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",];
    turn = "BLACK";

    render();
}

function render() {
    for (let i = 0; i <= 64; i++) {



    }
    turnUpdate.textContent = `TURN: ${turn}`;
}
