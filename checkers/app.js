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

    console.log(squares);
    render();
}

function render() {
    for (let i = 0; i <= 64; i++) {
        let color = squares[i].style.backgroundColor;
        console.log(color);
        if (i >= 0 && i < 24 && color === "black") {

        } 

    turnUpdate.textContent = `TURN: ${turn}`;
    }
}



