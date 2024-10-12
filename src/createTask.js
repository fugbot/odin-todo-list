import {Task} from './TaskComponent.js'

// const input = document.getElementById("task-name");
// const date = document.querySelector("#due-date");

// const defaultList = document.querySelector(".default");

const defaultList = document.querySelector(".default");
const input = document.getElementById("task-name");
const date = document.querySelector("#due-date");



 function addTaskToList(task) {
    const taskItem = document.createElement("li");
    const fragment = document.createDocumentFragment();
    
    //todo: toggle finished/not finished task
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle Complete";
    toggleBtn.className = "toggle-complete"
    fragment.appendChild(toggleBtn);

    // const checkbox = addCheckbox();
    // fragment.appendChild(checkbox);
    
    //const taskText = addTaskName(title);
    // const titleSpan = document.createElement("span");
    // titleSpan.textContent = task.title;
    const titleSpan = addTaskName(task);
    fragment.appendChild(titleSpan);


    const dateSpan = addDueDate(task);
    fragment.appendChild(dateSpan);

    // const descriptionSpan = document.createElement("span");
    // descriptionSpan.textContent = task.description;
    // fragment.appendChild(descriptionSpan);


    // const prioSpan = document.createElement("span");
    // prioSpan.textContent = task.priority;
    // fragment.appendChild(prioSpan);
    
    
    
    
    taskItem.appendChild(fragment);
    //return taskItem;

    defaultList.appendChild(taskItem); 
    emptyInput(); 
}

export default function addTaskFromInput() {
    const titleInput = document.querySelector("#task-name");
    const dateInput = document.querySelector("#due-date");

    const newTask = new Task(
        titleInput.value.trim(), dateInput.value
    )

    addTaskToList(newTask);
    emptyInput();
}

function addTaskName(task){
    const titleSpan = document.createElement("span");
    if(task === undefined){
        titleSpan.textContent = task.title;
    } else{
        titleSpan.textContent = task.title;
    }
    return titleSpan;
}

function addDueDate(task){
    const dueDate = document.createElement("span");
    dueDate.textContent = task.dueDate;
    return dueDate;
}

function emptyInput(){
    input.value = "";
    date.value= "";
}

function addCheckbox(){
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    // checkbox.name = "name";
    // checkbox.value = "value";
    //checkbox.id = "id";
    return checkbox;
}

// export default function addTaskToList(title) {
//     const task = document.createElement("li");
//     const fragment = document.createDocumentFragment();
    
//     const checkbox = addCheckbox();
//     const taskText = addTaskName(title);
//     const dueDate = addDueDate();
    
//     fragment.appendChild(checkbox);
//     fragment.appendChild(taskText);
//     fragment.appendChild(dueDate);
    
//     task.appendChild(fragment);

//     defaultList.appendChild(task); 
//     emptyInput(); 
// }

// function addTaskName(text){
//     const taskName = document.createElement("p");
//     if(text === undefined){
//         taskName.textContent = input.value.trim();
//     } else{
//         taskName.textContent = text;
//     }
//     return taskName;
// }

// function addDueDate(){
//     const dueDate = document.createElement("p");
//     dueDate.textContent = date.value;
//     return dueDate;
// }

// function emptyInput(){
//     input.value = "";
//     date.value= "";
// }

// function addCheckbox(){
//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     // checkbox.name = "name";
//     // checkbox.value = "value";
//     //checkbox.id = "id";
//     return checkbox;
// }

// function addDefaultTasks(name){
//     addTaskToList(name);
// }

// addDefaultTasks("get groceries");
// addDefaultTasks("walk the dog");

// // export default function addTaskToList(){
// //     const text = input.value.trim();
// //     addTask(text);
// //     //addCheckbox();
// //     emptyInput();
// // }