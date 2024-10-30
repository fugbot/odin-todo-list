import _, { forEach } from "lodash";
import "./style.css";
import {
  addTaskFromForm2,
  taskState,
  openEditModal,
  updateTask,
  updateTaskStatus,
} from "./createTask.js";
import {
  addNewProject,
  displayAllProjects,
  displayAllProjectTasks,
  projectState,
  projectStorage,
} from "./createProject.js";
import { Task } from "./TaskComponent.js";
import { Project } from "./ProjectComponent.js";
import {
  storageAvailable,
  populateStorage,
  recreateProjects,
} from "./checkLocalStorage.js";
//import addTaskToList from './taskHandler.js'
import { sub } from "date-fns";

const tasklist = document.querySelector(".tasklists");

const taskInput = document.querySelector(".taskInput");
const date = document.querySelector("#due-date");
const submitBtn = document.querySelector("#submit");

function initDefaultPage() {
  const defaultProject = Project("Inbox");
  const defaultTask = Task(
    "Get Groceries",
    "2024-10-21",
    "low",
    "Apples, Bananas, Noodles",
  );

  projectStorage.addProject(defaultProject);
  projectState.setProjectId(defaultProject.projectId);

  document
    .querySelector(".project")
    .setAttribute("data-id", defaultProject.projectId);

  defaultProject.addTask(defaultTask);

  //default task
  document
    .querySelector(".tasklists .task-item")
    .setAttribute("data-id", defaultTask.taskId);
  document
    .querySelector(".tasklists input[name='task']")
    .setAttribute("data-id", defaultTask.taskId);
  document
    .querySelector(".tasklists .title")
    .setAttribute("data-id", defaultTask.taskId);
  document
    .querySelector(".tasklists .description")
    .setAttribute("data-id", defaultTask.taskId);
  document
    .querySelector(".tasklists .date")
    .setAttribute("data-id", defaultTask.taskId);
  document
    .querySelector(".tasklists .priority")
    .setAttribute("data-id", defaultTask.taskId);
  document
    .querySelector(".tasklists button.edit")
    .setAttribute("data-id", defaultTask.taskId);

  populateStorage();
}
document.addEventListener("DOMContentLoaded", () => {
  if (storageAvailable("localStorage")) {
    // Yippee! We can use localStorage awesomeness
    console.log("yes local storage");
    let projects;
    if (!localStorage.getItem("projects")) {
      initDefaultPage();
    } else {
      const localProjectStorage = JSON.parse(localStorage.getItem("projects"));
      projects = recreateProjects(localProjectStorage);

      displayAllProjects();
      //show inbox as default
      projectState.setProjectId(1);
      displayAllProjectTasks();
    }
  } else {
    // Too bad, no localStorage for us
    initDefaultPage();
    console.log("no local storage");
  }
});

submitBtn.addEventListener("click", () => {
  //addTaskFromForm();
  addTaskFromForm2();
});

taskInput.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    //checks whether the pressed key is "Enter"
    //addTaskFromForm();
    addTaskFromForm2();
  }
});

date.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    //checks whether the pressed key is "Enter"
    //addTaskFromForm();
  }
});

tasklist.addEventListener("change", function (e) {
  // But only alert for elements that have an alert-button class
  const checkbox = e.target.closest("input[type=checkbox]");
  let currentTaskId = null;
  if (checkbox) {
    e.preventDefault();

    currentTaskId = checkbox.getAttribute("data-id");
    taskState.setTaskId(currentTaskId);
    updateTaskStatus();
  }
});

//edit and save tasks
const editDialog = document.querySelector("dialog");

tasklist.addEventListener("click", (e) => {
  const editBtn = e.target.closest("button.edit");
  let currentTaskId = null;
  if (editBtn) {
    e.preventDefault();
    //editDialog.showModal();
    currentTaskId = editBtn.getAttribute("data-id");
    taskState.setTaskId(currentTaskId);
  }
});

editDialog.addEventListener("click", (e) => {
  const saveBtn = e.target.closest("button#edit-confirm");
  if (saveBtn) {
    e.preventDefault();
    updateTask();
  }
});

editDialog.addEventListener("click", (e) => {
  const exitBtn = e.target.closest(".close");
  if (exitBtn) {
    e.preventDefault();
    editDialog.close();
  }
});

//add projects
const addProjectBtn = document.querySelector("#add-project");

const projectNameInput = document.querySelector("#project-name-input");
addProjectBtn.addEventListener("click", () => {
  projectNameInput.style.display =
    projectNameInput.style.display === "none" ? "block" : "none";
});

projectNameInput.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    addNewProject();
  }
});

const projectContainer = document.querySelector(".sidebar");
projectContainer.addEventListener("click", (e) => {
  const projectBtn = e.target.closest(".project");
  let currentProjectId = null;
  if (projectBtn) {
    e.preventDefault();
    currentProjectId = projectBtn.getAttribute("data-id");
    projectState.setProjectId(currentProjectId);
    displayAllProjectTasks();
  }
});
