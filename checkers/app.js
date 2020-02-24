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
    for (i = 0; i < 25; i++) {
        if ((Math.floor(i/8) % 2 == 0) && i < 24) {
            if (i % 2 != 0) {
                div = document.createElement("div");
                outer = document.getElementById(squares[i].id);
                div.style.height = "45px";
                div.style.width = "45px";
                div.style.borderRadius = "50%";
                div.style.backgroundColor = "white";
                outer.append(div);
            }
        }
        else if ((Math.floor(i/8) % 2 != 0) && i < 24) {
            if (i % 2 == 0) {
                div = document.createElement("div");
                outer = document.getElementById(squares[i].id);
                div.style.height = "45px";
                div.style.width = "45px";
                div.style.borderRadius = "50%";
                div.style.backgroundColor = "white";
                outer.append(div);
            }
        }
    }
    for (i = 62; i > 39; i--) {
        if (Math.floor(i/8) % 2 == 0 && i > 37) {
            if (i % 2 != 0) {
                div = document.createElement("div");
                outer = document.getElementById(squares[i].id);
                div.style.height = "50px";
                div.style.width = "50px";
                div.style.borderRadius = "50%";
                div.style.backgroundColor = "black";
                outer.append(div);
              }
        }
        else if (Math.floor(i/8) % 2 != 0 && i > 37) {
            if (i % 2 == 0) {
                div = document.createElement("div");
                outer = document.getElementById(squares[i].id);
                div.style.height = "50px";
                div.style.width = "50px";
                div.style.borderRadius = "50%";
                div.style.backgroundColor = "black";
                outer.append(div);
            }
        }
  }


    render();
}

function render(id) {


    turnUpdate.textContent = `TURN: ${turn}`;
}

function takeTurn(e) {
    let target = e.target;
    let id = target.id;





}
