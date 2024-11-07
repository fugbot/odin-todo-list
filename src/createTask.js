import { Task } from "./TaskComponent.js";
import { Project } from "./ProjectComponent.js";
import { projectStorage, projectState } from "./createProject.js";
import { populateStorage } from "./checkLocalStorage.js";
import pencilSvg from "./images/pencil-outline.svg";

export {
  addTaskFromForm2,
  taskState,
  openEditModal,
  updateTask,
  updateTaskPriority,
  updateTaskStatus,
};

const taskListUl = document.querySelector(".task-list");
const input = document.getElementById("task-name");
const date = document.querySelector("#due-date");
const dialog = document.querySelector("dialog");

function addTaskFromForm2() {
  const currentProjectId = Number(projectState.getProjectId());
  const currentProject = projectStorage.findProject(currentProjectId);
  //const tasks = currentProject.getProjectTasks();

  const taskTitle = document.querySelector("#task-name").value.trim();
  const taskDate = document.querySelector("#due-date").value;

  //init task object, add to project array
  const newTask = Task(taskTitle, taskDate);
  newTask.projectId = currentProjectId;
  currentProject.addTask(newTask);
  const fragment = document.createDocumentFragment();

  //task item wrapper
  const taskItem = document.createElement("li");
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-item";
  taskDiv.setAttribute("data-id", `${newTask.taskId}`);
  taskItem.appendChild(taskDiv);

  //checkbox
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
  const img = document.createElement("img");
  img.src = pencilSvg;
  editBtn.appendChild(img);
  //editBtn.textContent = "Edit";
  //editBtn.innerHTML = pencilSvg;
  editBtn.className = "edit";
  editBtn.setAttribute("data-id", `${newTask.taskId}`);
  fragment.appendChild(editBtn);

  taskDiv.appendChild(fragment);

  taskListUl.appendChild(taskItem);
  emptyInput();

  populateStorage();
}

function emptyInput() {
  input.value = "";
  date.value = "";
}

const taskState = {
  currentTaskId: null,

  setTaskId(id) {
    this.currentTaskId = id;
  },

  getTaskId() {
    return this.currentTaskId;
  },
};

function openEditModal() {
  const dialog = document.querySelector("dialog");
  const taskId = Number(taskState.getTaskId());

  const projectId = Number(projectState.getProjectId());

  const currentProject = projectStorage.findProject(projectId);
  const currentTask = currentProject.findTask(taskId);

  dialog.showModal();

  //populate modal with task data
  const titleInput = document.querySelector("#edit-task-name");
  const descriptionInput = document.querySelector("#edit-description");
  const dateInput = document.querySelector("#edit-date");
  const prioSelect = document.querySelector("#edit-priority");

  titleInput.value = currentTask.title;
  descriptionInput.value = currentTask.description;
  dateInput.value = currentTask.dueDate;
  prioSelect.value = currentTask.priority;
}

function updateTask() {
  //getCurrentTaskProject()
  const taskId = Number(taskState.getTaskId());

  const projectId = Number(projectState.getProjectId());

  const currentProject = projectStorage.findProject(projectId);
  const currentTask = currentProject.findTask(taskId);

  const titleInput = document.querySelector("#edit-task-name");
  const descriptionInput = document.querySelector("#edit-description");
  const dateInput = document.querySelector("#edit-date");
  const prioSelect = document.querySelector("#edit-priority");
  currentTask.title = titleInput.value;
  currentTask.description = descriptionInput.value;
  currentTask.dueDate = dateInput.value;
  currentTask.priority = prioSelect.value;

  dialog.close();

  //alter task display
  const taskItem = document.querySelector(
    `.task-item[data-id="${currentTask.taskId}"]`,
  );
  taskItem.querySelector(".title").textContent = currentTask.title;
  taskItem.querySelector(".description").textContent = currentTask.description;
  taskItem.querySelector(".date").textContent = currentTask.dueDate;
  taskItem.querySelector(".priority").value = currentTask.priority;

  populateStorage();
}

function updateTaskStatus() {
  const taskId = Number(taskState.getTaskId());

  const projectId = Number(projectState.getProjectId());

  const currentProject = projectStorage.findProject(projectId);
  const currentTask = currentProject.findTask(taskId);

  currentTask.completed = !currentTask.completed;

  const taskItemDiv = document.querySelector(
    `[class="task-item"][data-id="${currentTask.taskId}"]`,
  );
  taskItemDiv.dataset.completed = currentTask.completed;
  populateStorage();
}

function updateTaskPriority(value) {
  const taskId = Number(taskState.getTaskId());

  const projectId = Number(projectState.getProjectId());

  const currentProject = projectStorage.findProject(projectId);
  const currentTask = currentProject.findTask(taskId);

  if (value === "low") {
    currentTask.priority = "low";
  } else if (value === "med") {
    console.log("medium");
    currentTask.priority = "medium";
  } else if (value === "high") {
    currentTask.priority = "high";
  }
}
