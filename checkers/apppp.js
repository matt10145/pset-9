///// CONSTANTS /////

///// APP STATE (VARIABLES) /////
let turn;
let board;
let win;
let whiteScore;
let blackScore;
let pieceSelected;
let possibleMoves;

///// CACHED ELEMENT REFERENCES  /////
const squares = Array.from(document.querySelectorAll("#board div"));
const turnUpdate = document.getElementById("turnUpdate");
const playingBoard = document.getElementById("board");

///// EVENT LISTENERS /////
window.onload = function() {
    init();
}
document.getElementById("reset-button").onclick = init;
selectOrTurn();

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
    pieceSelected = false;

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

    turnUpdate.textContent = win === "tie" ? "TIE GAME" : win ? `${win} WINS!` : `TURN: ${turn}`;
}

/**
 * Function bridging the logic between selecting amd moving pieces with selectPiece() and takeTurn().
 */
function selectOrTurn() {
    if (pieceSelected) {
        document.getElementById("board").removeEventListener("click", selectPiece);
        document.getElementById("board").addEventListener("click", takeTurn);
    } else {
        document.getElementById("board").removeEventListener("click", takeTurn);
        document.getElementById("board").addEventListener("click", selectPiece);

    }
}

function selectPiece(e) {
    if (!win) {
        let selectedPiece;
        selectedPiece = squares.findIndex(function(square){
            return square === e.target;
        });
        if (board[selectedPiece] === turn.charAt(0)){
            pieceSelected = true;
        }
        moves = getValidMoves(selectedPiece, turn.charAt(0));
        selectOrTurn();
    }
}

function takeTurn(e) {
    let index = squares.findIndex(function(square) {
        return square === e.target;
    });
    (turn === "BLACK")? checkValidMoveB(index) : checkValidMoveW(index);

    if (board[index] === "" && index !== selectedPiece &&
    squares[index].classList.contains("available-move")) {
        (turn === "BLACK") ? board[index] = "B": board[index] = "W";
        if (squares[selectedPiece].classList.contains('king')) {
            squares[index].classList.add('king');
            squares[selectedPiece].classList.remove('king');
        }
        board[selectedPiece] = "";
        squares[selectedPiece].classList.toggle('selected-piece');
        turn = turn === "BLACK" ? "WHITE" : "BLACK";
        win = getWinner();
        pieceSelected = false;
        render();
    } else if (index === selectedPiece) {
        squares[selectedPiece].classList.toggle('selected-piece');
        pieceSelected = false;
        render();
    } else if (board[index] === "" && index !== selectedPiece &&
            squares[index].classList.contains("available-jump")) { 
        if (squares[selectedPiece].classList.contains('king')) {
            squares[index].classList.add('king');
            squares[selectedPiece].classList.remove('king');
        }

        (turn === "BLACK")? board[index] = "B": board[index] = "W";
        board[selectedPiece] = "";
        squares[selectedPiece].classList.toggle('selected-piece');
        turn = turn === "BLACK" ? "WHITE" : "BLACK";

        if (squares[index].classList.contains("remove-9")){
            board[selectedPiece - 9] = "";
        } else if (squares[index].classList.contains("remove+9")) {
            board[selectedPiece + 9] = "";
        } else if (squares[index].classList.contains("remove-7")) {
            board[selectedPiece - 7] = "";
        } else if (squares[index].classList.contains("remove+7")) {
            board[selectedPiece + 7] = "";
        }
        win = getWinner();
        pieceSelected = false;
        render();
    }
    selectOrTurn();
}

/**
 * Return valid moves. 
 * @param index index of the clicked piece
 * @param color color determining which side is being checked
 */
function getValidMoves(index, color) {
    possibleMoves = [];
    possibleMoves.push(index);

    if (color === "B") {
        if (board[index - 9] == "") {
            possibleMoves.push(9);
        } 
        if (board[index - 7] == "") {
            possibleMoves.push(7);
        } 
        if (board[index - 18] == "" && board[index - 9] == "W") {
            possibleMoves.push(18);

        }
    } 
    if (color === "W") {
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
