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

/**
 * Function that runs on startup.
 */
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

/**
 * Takes care of game appearance after each turn based on the board array.
 */
function render() {
    board.forEach(function(piece, index) {
        if (piece === "W") createPiece(index, "white");
        if (piece === "B") createPiece(index, "black");
    });
    turnUpdate.textContent = `TURN: ${turn}`;
}

/**
 * The actual function that runs on a checker piece click. 
 */
function takeTurn(e) {
    let target = e.target;
    let id = target.parentElement.id - 1;

    if (turn === "Black") {
        if (board[id] === "B") {
            if (areValidMoves(id, "black") !== []) {
                moves = areValidMoves(id, "black");


                for (var i = 0; i <= moves.length; i++) {
                    moveTo = moves[i];
                    if (clicked.parentElement.id == moveTo) {

                    }
                }
            } 
        }
    }

    // bruh literally just add another eventlistener to the whole board, use findindex to get
    // the second clicked, and then match it up with the areValidMoves. If no matches, then 
    // do nothing ? well actually use logic and check is areValidMoves is empty
    // if it isn't then check
    // if there are no matches, then... yeah do nothing


    // block turns by checking background color style of the piece
    //

    // take turns by getting id of parent element, which I have, and then
    // check the array index (id - 1) whether its empty or has a piece.
    // // if there is a piece, check for valid moves in the array itself
    // re render at the end by updating the clicked index and using removePiece
}

/**
 * 
 * @param index the starting point
 * @param moveTo where the piece should be moved to
 */
function move(index, moveTo) {

}

/**
 * Return valid moves. 
 * @param index index of the clicked piece
 * @param color color determining which side is being checked
 */
function areValidMoves(index, color) {
    let possibleMoves = [];
    index -= 1;

    if (color === "black") {
        if (board[index - 9] == "") {
            possibleMoves.push(9);
        }
        if (board[index - 7] == "") {
            possibleMoves.push(7);
        } 
    } 
    if (color === "white") {
        if (board[index + 9] == "") {
            possibleMoves.push(9);
        } else if (board[index + 9] == "B" && board[index + 18] == "") {
            possibleMoves.push(18);
        }
        if (board[index + 7] == "") {
            possibleMoves.push(7);
        } 
    }

    return possibleMoves;   
}

/**
 * Checks whether, after one move, the same piece can move again.
 */
function canMoveAgain(index) {
    let movePossible;





    return movePossible;
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
}

/**
 * Uses the present number of pieces to check if the game has been won or tied.
 */
function getWinner() {
    let amounts = [0, 0]; // first index black, second white
    let winner = "";
    let turns = 0;

    board.forEach((piece) => {
        if (piece === "B") {
            amounts[0] += 1;
        }
        if (piece === "W") {
            amounts[1] += 1;
        }
    });

    (amounts[0] === 0) ? winner = "White" : winner = "";
    (amounts[1] === 0) ? winner = "Black" : winner = "";
    (amounts[0] === 1 && amounts[1] === 1) ? turns++ : turns;
    (turns >= 20)? winner = "Tie" : winner = ""; // stalemate safety

    return winner;
}
