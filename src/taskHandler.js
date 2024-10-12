import _ from 'lodash';
import './style.css';
//import addTaskToList from './createTask.js'

const defaultList = document.querySelector(".default");
const input = document.getElementById("task-name");
const date = document.querySelector("#due-date");

export class Task {
    constructor (title, dueDate = null, description = "", priority = "normal", completed = false){
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        this.completed = completed;
    }

    toggleComplete(){
        this.completed = !this.completed;
    }
    
    updatePriority(newPriority){
        this.priority = newPriority;
    }
}

 function addTaskToList(task) {
    const taskItem = document.createElement("li");
    const fragment = document.createDocumentFragment();
    
    //const checkbox = addCheckbox();
    //fragment.appendChild(checkbox);
    
    //const taskText = addTaskName(title);
    // const titleSpan = document.createElement("span");
    // titleSpan.textContent = task.title;
    const titleSpan = addTaskName(task);
    fragment.appendChild(titleSpan);

    //todo: fix date!
    const dateSpan = addDueDate(task);
    // const dateSpan = document.createAttribute("span");
    // dateSpan.textContent = task.dueDate;
    fragment.appendChild(dateSpan);

    // const descriptionSpan = document.createElement("span");
    // descriptionSpan.textContent = task.description;
    // fragment.appendChild(descriptionSpan);


    // const prioSpan = document.createElement("span");
    // prioSpan.textContent = task.priority;
    // fragment.appendChild(prioSpan);
    
    // const toggleBtn = document.createElement("button");
    // toggleBtn.textContent = "Toggle Complete";
    // toggleBtn.className = "toggle-complete"
    // fragment.appendChild(toggleBtn);
    
    
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
    dueDate.textContent = task.date;
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