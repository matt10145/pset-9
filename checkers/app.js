///// CONSTANTS /////

///// APP STATE (VARIABLES) /////
let turn;
let board;
let win;

///// CACHED ELEMENT REFERENCES  /////
const squares = Array.from(document.querySelectorAll("#board div"));
const turnUpdate = document.getElementById("turnUpdate");

///// EVENT LISTENERS /////
window.onload = function() {
    init();

}
document.getElementById("#board").onclick = takeTurn;


///// FUNCTIONS  /////
function init() {
    board = ["", "W", "", "W", "", "W", "", "W",
            "W", "", "W", "", "W", "", "W", "",
            "", "W", "", "W", "", "W", "", "W",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "B", "", "B", "", "B", "", "B", "",
            "", "B", "", "B", "", "B", "", "B",
            "B", "", "B", "", "B", "", "B", "",];
    turn = "BLACK";

    render();
}

function render() {
    board.forEach(function(mark, index) {
        if (mark === "W") createPiece(index, "white");
        if (mark === "B") createPiece(index, "black");
    });
    turnUpdate.textContent = `TURN: ${turn}`;
}

/**
 * The actual function that runs on a checker piece click. Dynamically add event listeners
 * to the AVAILABLE spots for moving. Once a second part is clicked,
 */
function takeTurn(e) {
    let target = e.target;
    let id = target.id;


}

/**
 * Check whether there are valid moves available (tentative: and highlights them).
 */
function isValidMoves() {


}

/**
 * Checks whether, after one move, the same player can move again.
 */
function canMoveAgain() {

}

/**
 * Creates and appends the checker pieces.
 * @param index the spot on the board that should be added
 * @param color the color of the piece
 */
function createPiece(index, color) {
    div = document.createElement("div");
    outer = document.getElementById(squares[index].id);
    div.style.height = "50px";
    div.style.width = "50px";
    div.style.borderRadius = "50%";
    div.style.backgroundColor = color;
    outer.append(div);
}
