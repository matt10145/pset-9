///// CONSTANTS /////

///// APP STATE (VARIABLES) /////
const turn;

///// CACHED ELEMENT REFERENCES  /////
const board = Array.from(document.querySelectorAll("#board div"));
const turnUpdate = document.getElementById("turnUpdate");

///// EVENT LISTENERS /////
window.onload = function() {
    init();
}

function setEventListeners() {


}

///// FUNCTIONS  /////
function init() {
    turn = "black";
}

function render() {

    turnUpdate.textContent = turn;
}
