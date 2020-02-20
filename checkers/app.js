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
    for(i = 0; i < 25; i++) {
        if (Math.floor(i/8) % 2 == 0 && i < 24) {
            if (i % 2 != 0) {
                
            }
        }
        else if (Math.floor(i/8) % 2 != 0 && i < 24) {
            if (i % 2 == 0) {

            }
        }
    }
    for(i = 62; i > 39; i--) {
        if (Math.floor(i/8) % 2 == 0 && i > 37) {
            if (i % 2 != 0) {

            }
        }
        else if (Math.floor(i/8) % 2 != 0 && i > 37) {
            if (i % 2 == 0) {

            }
        }
    }

    render();
}

function render() {
    for ()


    turnUpdate.textContent = `TURN: ${turn}`;
}
