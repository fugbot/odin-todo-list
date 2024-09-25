const input = document.getElementById("todo-input");
const date = document.querySelector("#due-date");

const defaultList = document.querySelector(".default");

export default function addTaskToList(title) {
    const task = document.createElement("li");
    const fragment = document.createDocumentFragment();
    
    const checkbox = addCheckbox();
    const taskText = addTaskName(title);
    const dueDate = addDueDate();
    
    fragment.appendChild(checkbox);
    fragment.appendChild(taskText);
    fragment.appendChild(dueDate);
    
    task.appendChild(fragment);

    defaultList.appendChild(task); 
    emptyInput(); 
}

function addTaskName(text){
    const taskName = document.createElement("p");
    if(text === undefined){
        taskName.textContent = input.value.trim();
    } else{
        taskName.textContent = text;
    }
    return taskName;
}

function addDueDate(){
    const dueDate = document.createElement("p");
    dueDate.textContent = date.value;
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

function addDefaultTasks(name){
    addTaskToList(name);
}

addDefaultTasks("get groceries");
addDefaultTasks("walk the dog");

// export default function addTaskToList(){
//     const text = input.value.trim();
//     addTask(text);
//     //addCheckbox();
//     emptyInput();
// }