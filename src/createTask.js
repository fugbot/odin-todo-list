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
  console.log(newTask);

  //add all code here instead
  //task item wrapper
  const taskItem = document.createElement("li");
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-item";
  taskItem.appendChild(taskDiv);
  const fragment = document.createDocumentFragment();

  //todo: checkbox - if checked, completed boolean change
  //add value, id
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = `task`;
  checkbox.value = `task`;
  checkbox.setAttribute("data-id", `${newTask.taskId}`);
  fragment.appendChild(checkbox);

  //title
  const titleSpan = document.createElement("span");
  titleSpan.className = "title";
  titleSpan.setAttribute("data-id", `${newTask.taskId}`);
  titleSpan.textContent = newTask.title;
  fragment.appendChild(titleSpan);

  //date
  const dateSpan = document.createElement("span");
  dateSpan.className = "date";
  dateSpan.setAttribute("data-id", `${newTask.taskId}`);
  dateSpan.textContent = newTask.dueDate;
  fragment.appendChild(dateSpan);

  const descriptionSpan = document.createElement("span");
  descriptionSpan.className = "description";
  descriptionSpan.setAttribute("data-id", `${newTask.taskId}`);
  fragment.appendChild(descriptionSpan);

  const prioSelect = document.createElement("select");
  prioSelect.className = "priority";
  prioSelect.setAttribute("data-id", `${newTask.taskId}`);
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

  //edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit";
  editBtn.setAttribute("data-id", `${newTask.taskId}`);
  fragment.appendChild(editBtn);

  taskDiv.appendChild(fragment);

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

function emptyInput() {
  input.value = "";
  date.value = "";
}
