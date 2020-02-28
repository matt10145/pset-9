///// CONSTANTS /////

///// APP STATE (VARIABLES) /////
let turn;
let board;
let win;
let whiteScore;
let blackScore;

///// CACHED ELEMENT REFERENCES  /////
const squares = Array.from(document.querySelectorAll("#board div"));
const turnUpdate = document.getElementById("turnUpdate");

///// EVENT LISTENERS /////
window.onload = function() {
    init();

}
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;

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
    win = null;
    whiteScore = 0;
    blackScore = 0;

    render();
}

function render() {
    board.forEach(function(piece, index) {
        if (piece === "W") createPiece(index, "white");
        if (piece === "B") createPiece(index, "black");
    });
    turnUpdate.textContent = `TURN: ${turn}`;
}

/**
 * The actual function that runs on a checker piece click. Dynamically add event listeners
 * to the AVAILABLE spots for moving. Once a second part is clicked,
 */
function takeTurn(e) {
    let target = e.target;
    let id = target.parentElement.id;

    // block turns by checking background color style of the piece
    //

    // take turns by getting id of parent element, which I have, and then
    // check the array index (id - 1) whether its empty or has a piece.
    // // if there is a piece, check for valid moves in the array itself
    // re render at the end by updating the clicked index and using removePiece

}

/**
 * Check whether there are valid moves available (tentative: and highlights them).
 */
function isValidMoves() {


}

/**
 * Checks whether, after one move, the same piece can move again.
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

/**
 * Removes pieces from the checkerboard (referenced in takeTurn).
 * @param index the id of the piece to be removed
 */
function removePiece(index) {
    let element = document.getElementById(String(index));
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }


    // this should work....just need to make sure it doesn't remove the entire board??
}

/**
 * Gets and displays the winner of the game by checking if one side has zero pieces left.
 */
function getWinner() {
    let winner = null;


}
