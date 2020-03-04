///// CONSTANTS /////

///// APP STATE (VARIABLES) /////
let turn;
let board;
let win;
let whiteScore = 0;
let blackScore = 0;
let pieceSelected = false;
let possibleMoves;
let selectedPiece;

///// CACHED ELEMENT REFERENCES  /////
const squares = Array.from(document.querySelectorAll("#board div"));
const turnUpdate = document.getElementById("turnUpdate");
const playingBoard = document.getElementById("board");
const wScore = document.getElementById("whiteScore");
const bScore = document.getElementById("blackScore");

///// EVENT LISTENERS /////
window.onload = init;
document.getElementById("reset").onclick = init;
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

    render();
}

/**
 * Takes care of game appearance after each turn based on the board array.
 */
function render() {
    board.forEach(function(piece, index) {
        squares[index].textContent = piece;
        squares[index].classList.remove('remove-9', 'remove-7', 'remove+9',
        'remove+7', 'can-move', 'can-jump');
        (!squares[index].classList.contains('king') && piece == "B" && index > 55)?
        squares[index].classList.add('king') : index;
        (!squares[index].classList.contains('king') && piece == "W" && index < 8)?
        squares[index].classList.add('king') : index;
    });

    bScore.textContent = blackScore;
    wScore.textContent = whiteScore;
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

/**
 * Function that toggles piece selection, and redirects the flow to selectOrTurn(). 
 */
function selectPiece(e) {
    if (!win) {
        selectedPiece = "";
        selectedPiece = squares.findIndex(function(square){
          return square === e.target;
        });
        if (board[selectedPiece] === turn.charAt(0)){
          pieceSelected = true;
          squares[selectedPiece].classList.toggle('selected-piece');
        }
        selectOrTurn();
    }  
}

/**
 * The bulk of this game program. Edits the board array and renders the board accordingly.
 */
function takeTurn(e) {
    let index = squares.findIndex(function(square) {
        return square === e.target;
    });
    (turn === "BLACK") ? getValidMoves(index, "B") : getValidMoves(index, "W");

    if (board[index] === "" && index !== selectedPiece && squares[index].classList.contains("can-move")) {
        (turn === "BLACK") ? board[index] = "B" : board[index] = "W";
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
    } else if (board[index] === "" && index !== selectedPiece && squares[index].classList.contains("can-jump")) { 
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
    if (color === "B") {
        if (selectedPiece !== "" && board[index] == "") {
            (selectedPiece % 8 !==0 && board[selectedPiece + 7] ==="") ?
            squares[selectedPiece + 7].classList.add('can-move') : selectedPiece;
            (selectedPiece % 8 !== 7 && board[selectedPiece + 9] ==="") ?
            squares[selectedPiece + 9].classList.add('can-move') : selectedPiece;
            (selectedPiece % 8 !== 0 && selectedPiece % 8 !== 1 && board[selectedPiece + 14] === "" && board[selectedPiece+7] === "W")?
            squares[selectedPiece + 14].classList.add('can-jump', 'remove+7') : selectedPiece;
            (selectedPiece % 8 !== 7 && selectedPiece % 8 !== 6 && board[selectedPiece + 18] === "" && board[selectedPiece+9] === "W")?
            squares[selectedPiece + 18].classList.add('can-jump', 'remove+9') : selectedPiece;
        if (squares[selectedPiece].classList.contains('king')) {
            (selectedPiece % 8 !== 7 && board[selectedPiece - 7] === "") ?
            squares[selectedPiece - 7].classList.add('can-move') : selectedPiece;
            (selectedPiece % 8 !== 0 && board[selectedPiece - 9] === "") ?
            squares[selectedPiece - 9].classList.add('can-move') : selectedPiece;
            (selectedPiece % 8 !== 1 && selectedPiece % 8 !== 0 && board[selectedPiece - 18] === "" && board[selectedPiece - 9] === "W")?
            squares[selectedPiece - 18].classList.add('can-jump', 'remove-9') : selectedPiece;
            (selectedPiece % 8 !== 6 && selectedPiece % 8 !== 7 && board[selectedPiece - 14] === "" && board[selectedPiece - 7] === "W")?
            squares[selectedPiece - 14].classList.add('can-jump', 'remove-7') : selectedPiece;
            }
        }
    }
    if (color === "W") {
        if (selectedPiece !== "" && board[index] === "") {
            (selectedPiece % 8 !== 7 && board[selectedPiece - 7] === "")?
            squares[selectedPiece - 7].classList.add('can-move') : selectedPiece;
            (selectedPiece % 8 !== 0 && board[selectedPiece - 9] === "")?
            squares[selectedPiece - 9].classList.add('can-move') : selectedPiece;
            (selectedPiece % 8 !== 1 && selectedPiece % 8 !== 0 && board[selectedPiece - 18] === "" && board[selectedPiece - 9] === "B")?
            squares[selectedPiece - 18].classList.add('can-jump', 'remove-9') : selectedPiece;
            (selectedPiece % 8 !== 6 && selectedPiece % 8 !== 7 && board[selectedPiece - 14] === "" && board[selectedPiece - 7] === "B")?
            squares[selectedPiece - 14].classList.add('can-jump', 'remove-7') : selectedPiece;
        }
        if (squares[selectedPiece].classList.contains('king')) {
            (selectedPiece % 8 !==0 && board[selectedPiece + 7] === "")?
            squares[selectedPiece + 7].classList.add('can-move') : selectedPiece;
            (selectedPiece % 8 !==7 && board[selectedPiece + 9] ==="")?
            squares[selectedPiece + 9].classList.add('can-move') : selectedPiece;
            (selectedPiece % 8 !==1 && selectedPiece % 8 !== 0 && board[selectedPiece + 14] === "" && board[selectedPiece + 7] === "B")?
            squares[selectedPiece + 14].classList.add('can-jump', 'remove+7') : selectedPiece;
            (selectedPiece % 8 !== 6 && selectedPiece % 8 !== 7 && board[selectedPiece + 18] === "" && board[selectedPiece + 9] === "B")?
            squares[selectedPiece+18].classList.add('can-jump', 'remove+9') : selectedPiece;
        }
    
    }
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
    (turns >= 20)? winner = "tie" : winner = ""; // stalemate safety

    return winner;
}
