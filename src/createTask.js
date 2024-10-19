import { Task } from "./TaskComponent.js";

export { addTaskFromForm2 };

// const input = document.getElementById("task-name");
// const date = document.querySelector("#due-date");

// const defaultList = document.querySelector(".default");

const defaultList = document.querySelector(".default");
const input = document.getElementById("task-name");
const date = document.querySelector("#due-date");

// function createTask() {
//   return new Task(title, dueDate, priority, description, completed);
// }

function addTaskFromForm2() {
  const taskTitle = document.querySelector("#task-name").value.trim();
  const taskDate = document.querySelector("#due-date").value;

  const newTask = Task(taskTitle, taskDate);

  //add all code here instead
  //todo: make sure task id working first!
  const taskItem = document.createElement("li");
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-item";
  taskItem.appendChild(taskDiv);
  const fragment = document.createDocumentFragment();

  const titleSpan = document.createElement("span");
  titleSpan.textContent = newTask.taskTitle;
  taskItem.appendChild(titleSpan);

  //todo: toggle finished/not finished task
  // const toggleBtn = document.createElement("button");
  // toggleBtn.textContent = "Toggle Complete";
  // toggleBtn.className = "toggle-complete"
  // fragment.appendChild(toggleBtn);

  //todo: checkbox - if checked, completed boolean change
  //add value, id
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = `task`;
  checkbox.value = `task`;
  //checkbox.id = `checkbox ${task.title.trim()}`;
  fragment.appendChild(checkbox);

  const dateSpan = addDueDate(task);
  fragment.appendChild(dateSpan);

  // const descriptionSpan = document.createElement("span");
  // descriptionSpan.textContent = task.description;
  // fragment.appendChild(descriptionSpan);

  const prioSelect = document.createElement("select");
  prioSelect.className = "priority";
  const prioLowOption = document.createElement("option");
  prioLowOption.value = "low";
  prioLowOption.textContent = "Low";
  prioSelect.appendChild(prioLowOption);

  const prioMedOption = document.createElement("option");
  prioMedOption.value = "med";
  prioMedOption.textContent = "Medium";
  prioSelect.appendChild(prioMedOption);

  const prioHighOption = document.createElement("option");
  prioHighOption.value = "high";
  prioHighOption.textContent = "High";
  prioSelect.appendChild(prioHighOption);

  fragment.appendChild(prioSelect);

  taskItem.appendChild(fragment);
  //return taskItem;

  defaultList.appendChild(taskItem);
  emptyInput();
}

function addTaskFromInput() {
  const titleInput = document.querySelector("#task-name");
  const dateInput = document.querySelector("#due-date");

  const newTask = new Task(titleInput.value.trim(), dateInput.value);

  addTaskToList(newTask);
  emptyInput();
}

// function addTaskFromForm(task) {
//   const taskItem = document.createElement("li");
//   const fragment = document.createDocumentFragment();

//   //todo: toggle finished/not finished task
//   // const toggleBtn = document.createElement("button");
//   // toggleBtn.textContent = "Toggle Complete";
//   // toggleBtn.className = "toggle-complete"
//   // fragment.appendChild(toggleBtn);

//   const checkbox = addCheckbox(task);
//   fragment.appendChild(checkbox);

//   //const taskText = addTaskName(title);
//   // const titleSpan = document.createElement("span");
//   // titleSpan.textContent = task.title;
//   const titleSpan = addTaskName(task);
//   fragment.appendChild(titleSpan);

//   const dateSpan = addDueDate(task);
//   fragment.appendChild(dateSpan);

//   // const descriptionSpan = document.createElement("span");
//   // descriptionSpan.textContent = task.description;
//   // fragment.appendChild(descriptionSpan);

//   const prioSelect = document.createElement("select");
//   prioSelect.className = "priority";
//   const prioLowOption = document.createElement("option");
//   prioLowOption.value = "low";
//   prioLowOption.textContent = "Low";
//   prioSelect.appendChild(prioLowOption);

//   const prioMedOption = document.createElement("option");
//   prioMedOption.value = "med";
//   prioMedOption.textContent = "Medium";
//   prioSelect.appendChild(prioMedOption);

//   const prioHighOption = document.createElement("option");
//   prioHighOption.value = "high";
//   prioHighOption.textContent = "High";
//   prioSelect.appendChild(prioHighOption);

//   fragment.appendChild(prioSelect);

//   taskItem.appendChild(fragment);
//   //return taskItem;

//   defaultList.appendChild(taskItem);
//   emptyInput();
// }

// function addTaskFromInput() {
//   const titleInput = document.querySelector("#task-name");
//   const dateInput = document.querySelector("#due-date");

//   const newTask = new Task(titleInput.value.trim(), dateInput.value);

//   addTaskToList(newTask);
//   emptyInput();
// }

// function addDueDate(task) {
//   const dueDate = document.createElement("span");
//   dueDate.textContent = task.dueDate;
//   return dueDate;
// }

// function emptyInput() {
//   input.value = "";
//   date.value = "";
// }

// function saveChanges(task) {}
