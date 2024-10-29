import _, { forEach } from "lodash";
import "./style.css";
import { addTaskFromForm2, taskState, openEditModal, updateTask } from "./createTask.js";
import { addNewProject, displayAllProjects, displayAllProjectTasks, projectState, projectStorage } from "./createProject.js"
import { Task } from "./TaskComponent.js";
import { Project } from "./ProjectComponent.js"
import { storageAvailable,populateStorage, recreateProjects } from "./checkLocalStorage.js"
//import addTaskToList from './taskHandler.js'
import { sub } from "date-fns";
import Calendar from "./images/calendar-range-outline.svg";



const tasklist = document.querySelector(".tasklists");

const taskInput = document.querySelector(".taskInput");
const date = document.querySelector("#due-date");
const submitBtn = document.querySelector("#submit");


function initDefaultPage() {
  // if (storageAvailable("localStorage")) {
    //   // Yippee! We can use localStorage awesomeness
    //   console.log("yes local storage");
    // } else {
      //   // Too bad, no localStorage for us
      //   console.log("no local storage");
      // }
      
  const defaultProject = Project("Inbox");
  const defaultTask = Task("Get Groceries");
  
  projectStorage.addProject(defaultProject);
  projectState.setProjectId(defaultProject.projectId);
  console.log(defaultProject.projectId);
  document.querySelector(".project").setAttribute("data-id", defaultProject.projectId);
  
  defaultProject.addTask(defaultTask);
  
  //default task
  document.querySelector(".tasklists .task-item").setAttribute("data-id", defaultTask.taskId);
  document.querySelector(".tasklists input[name='task']").setAttribute("data-id", defaultTask.taskId);
  document.querySelector(".tasklists .title").setAttribute("data-id", defaultTask.taskId);
  document.querySelector(".tasklists .description").setAttribute("data-id", defaultTask.taskId);
  document.querySelector(".tasklists .date").setAttribute("data-id", defaultTask.taskId);
  document.querySelector(".tasklists .priority").setAttribute("data-id", defaultTask.taskId);
  document.querySelector(".tasklists button.edit").setAttribute("data-id", defaultTask.taskId);
  
  console.log(defaultProject);
  populateStorage();
  
}
document.addEventListener("DOMContentLoaded", () => {
  let projects;
  if(!localStorage.getItem("projects")){
    initDefaultPage(); //default init page
  }else{
    //setDefaultProjects(); //add existing projects/tasks
    //setDefaultTasks();
    const localProjectStorage = JSON.parse(localStorage.getItem("projects"));
    projects = recreateProjects(localProjectStorage);
    //localStorage.setItem("projectStorage", JSON.stringify(projectStorage));
    
    displayAllProjects();
    //show inbox as default
    projectState.setProjectId(1);
    displayAllProjectTasks();
  }
})




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
  if (e.target.querySelectorAll("input[type=checkbox]")) {
    console.log("completed task");
  }
});

//edit and save tasks
const editDialog = document.querySelector("dialog");

tasklist.addEventListener("click", (e) => {
  const editBtn = e.target.closest("button.edit");
  let currentTaskId = null;
  let currentProjectId = null;
  if (editBtn) {
    e.preventDefault()
    //editDialog.showModal();
    currentTaskId = editBtn.getAttribute("data-id");
    console.log("event listener: " + currentTaskId);
    taskState.setTaskId(currentTaskId);
     
    openEditModal();
  }
})

editDialog.addEventListener("click", (e) => {
  const saveBtn = e.target.closest("button#edit-confirm");
  if (saveBtn) {
    e.preventDefault()
    // //editDialog.showModal();
    // currentTaskId = editBtn.getAttribute("data-id");
    // console.log("event listener: " + currentTaskId);
    // taskState.setTaskId(currentTaskId);
     
    // openEditModal();
    console.log("Saved button pressed");
    updateTask();
  }
})


//add projects
const addProjectBtn = document.querySelector("#add-project");

const projectNameInput = document.querySelector("#project-name-input");
addProjectBtn.addEventListener("click", () => {
    projectNameInput.style.display = projectNameInput.style.display === 'none' ? 'block' : 'none'; 
})

projectNameInput.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    addNewProject();
  }
})

const projectContainer = document.querySelector(".sidebar");
projectContainer.addEventListener("click", (e) => {
  const projectBtn = e.target.closest(".project");
  //let currentTaskId = null;
  let currentProjectId = null;
  if (projectBtn) {
    e.preventDefault()
    
    currentProjectId = projectBtn.getAttribute("data-id");
    console.log("event listener: " + currentProjectId);
    projectState.setProjectId(currentProjectId);
     
    displayAllProjectTasks();
  }
})
