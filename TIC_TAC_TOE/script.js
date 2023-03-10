let displayCurrPlayer = document.querySelector(".currentPlayer p");
let boxes = document.querySelectorAll(".box");
let choosePlayerContainer = document.querySelector(".choosePlayer");
let newGameBtn = document.querySelector(".new-game-btn");
let overlay = document.querySelector(".overlay");
let selectedPlayer = document.querySelectorAll('input[name="selectedPlayer"]:checked');
let playBtn = document.querySelector(".next");

let currentPlayer = "";

function initializeGame(){
    choosePlayerContainer.classList.add("active");
    displayCurrPlayer.innerHTML = "";
    newGameBtn.classList.remove("hidden");
}

playBtn.addEventListener("click", ()=>{
    currentPlayer = selectedPlayer.value;
    console.log(currentPlayer);
    displayCurrPlayer.innerHTML = `Current Player - ${currentPlayer}`;
    choosePlayerContainer.classList.remove("active");
    newGameBtn.classList.add("hidden");
})

newGameBtn.addEventListener("click",initializeGame);