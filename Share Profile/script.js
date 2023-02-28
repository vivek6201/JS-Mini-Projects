const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".close-btn");
const shareBtn = document.querySelector("#share-btn");

shareBtn.addEventListener("click",() =>{
    modal.classList.add("modal-active");
    overlay.classList.add("overlay-active");
});

overlay.addEventListener("click",() =>{
    modal.classList.remove("modal-active");
    overlay.classList.remove("overlay-active");
});

closeBtn.addEventListener("click",() =>{
    modal.classList.remove("modal-active");
    overlay.classList.remove("overlay-active");
});


