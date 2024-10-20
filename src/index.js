import _, { forEach } from "lodash";
import "./style.css";
import { addTaskFromForm, addTaskFromForm2 } from "./createTask.js";
import { addNewProject } from "./createProject.js"
import { Task } from "./TaskComponent.js";
import { Project } from "./ProjectComponent.js"
//import addTaskToList from './taskHandler.js'
import { sub } from "date-fns";
import Calendar from "./images/calendar-range-outline.svg";

const tasklist = document.querySelector(".tasklists");
const taskInputDiv = document.querySelector(".taskInput");
const defaultList = document.querySelector(".default");

const taskItems = [];

const input = document.querySelector(".taskInput");
const date = document.querySelector("#due-date");
const submitBtn = document.querySelector("#submit");
const checkboxes = document.querySelectorAll("input[type=checkbox]");

// const calendarSvg = new Image();
// calendarSvg.src = Calendar;
// taskInputDiv.appendChild(calendarSvg);

submitBtn.addEventListener("click", () => {
  //addTaskFromForm();
  addTaskFromForm2();
});

input.addEventListener("keydown", function (e) {
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

const addProjectBtn = document.querySelector("#add-project");

addProjectBtn.addEventListener("click", () => {
  
  addNewProject();
  //const projectNameInput = document.querySelector("#project-name");
  
  
})
