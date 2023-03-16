const addTaskbtn = document.querySelector("#add-task-btn");
const inputTask = document.querySelector("#enter-task");
const taskContainer = document.querySelector(".task-container");
const resetBtn = document.querySelector("#reset");
const taskDiv = document.querySelectorAll(".taskDiv");
const deleteTask = document.querySelector(".delete-task");


let uniqueId = 1;

function startNewList(){
    taskContainer.innerHTML = "";
    uniqueId = 0;
}

function fetchTask(uniqueId){
    const task = inputTask.value;
    
    const div = document.createElement("div");
    taskContainer.appendChild(div);
    div.setAttribute("id", uniqueId.toString())
    div.setAttribute("class","taskDiv")
    div.innerHTML = `
        <p class="task-para">${task}</p>
        <button class="delete-task">Delete</button>
    `;

}

deleteTask?.addEventListener("click",(e) =>{
    e.target.parentElement.remove();
})

addTaskbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    fetchTask(uniqueId);
    uniqueId++;
    inputTask.value = "";
});

resetBtn.addEventListener("click",startNewList);
