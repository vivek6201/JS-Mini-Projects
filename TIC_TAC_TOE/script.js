let displayCurrPlayer = document.querySelector(".currentPlayer p");
let boxes = document.querySelectorAll(".box");
let choosePlayerContainer = document.querySelector(".choosePlayer");
let newGameBtn = document.querySelector(".new-game-btn");
// let overlay = document.querySelector(".overlay");
let playBtn = document.querySelector(".next");

let currentPlayer = "";
let gameGrid = ["", "", "", "", "", "", "", "", ""];

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initializeGame() {
    choosePlayerContainer.classList.add("active");
    displayCurrPlayer.innerHTML = "";
    newGameBtn.classList.remove("hidden");
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    boxes.forEach((box) => {
        box.innerHTML = "";
        box.style.pointerEvents = "auto";
        box.classList.remove("win");
    })
}

playBtn.addEventListener("click", () => {
    currentPlayer = document.querySelector('.radio-player:checked').value;
    console.log(typeof (currentPlayer));
    displayCurrPlayer.innerHTML = `Current Player - ${currentPlayer}`;
    choosePlayerContainer.classList.remove("active");
    newGameBtn.classList.add("hidden");
})

function swapTurn() {
    return currentPlayer === "X" ? "O" : "X";
}

function checkEndGame() {
    let answer = "";

    winningPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            if (gameGrid[position[0]] === "X") {
                answer = "X";
                displayCurrPlayer.innerHTML = `Player X WON`;
            }
            else {
                answer = "O";
                displayCurrPlayer.innerHTML = `Player O WON`;
            }

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }


    })

    if (answer !== "") {
        newGameBtn.classList.remove("hidden");
    }

    let fillCount = 0;
    gameGrid.forEach((grid) => {
        if (grid !== "") {
            fillCount++;
        }
    })

    if (fillCount === gameGrid.length && answer === "") {
        displayCurrPlayer.innerHTML = "Game tied";
        newGameBtn.classList.remove("hidden");
    }

}

newGameBtn.addEventListener("click", initializeGame);

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (currentPlayer === "") return;
        if (gameGrid[index] === "") {
            box.innerHTML = currentPlayer;
            gameGrid[index] = currentPlayer;
            boxes[index].style.pointerEvents = "none";
            currentPlayer = swapTurn();
            displayCurrPlayer.innerHTML = `Current Player - ${currentPlayer}`;
            checkEndGame();
        }
    })
})