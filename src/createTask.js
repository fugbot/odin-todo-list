const input = document.getElementById("todo-input");
const date = document.querySelector("#due-date");

const defaultList = document.querySelector(".default");


function addTask(taskTitle) {
    const taskItem = document.createElement("li");
    
    //todo: fix checkbox
    const checkbox = addCheckbox();
    taskItem.appendChild(checkbox);
    const dueDate = addDueDate();
    taskItem.textContent = taskTitle + " " + dueDate;
    defaultList.appendChild(taskItem); 
}

function addDueDate(){
    const dueDate = date.value;
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

//placeholder tasks
addTask("get groceries");
addTask("walk the dog")

export default function addTaskToList(){
    const text = input.value.trim();
    addTask(text);
    addCheckbox();
    emptyInput();
}