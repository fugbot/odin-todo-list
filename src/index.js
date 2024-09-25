import _ from 'lodash';
import './style.css';
import addTaskToList from './createTask.js'
import { sub } from 'date-fns';
import Calendar from './images/calendar-range-outline.svg';
 
const tasklist = document.querySelector(".tasklists");
const taskInputDiv = document.querySelector(".taskInput");
const defaultList = document.querySelector(".default");

const taskItems = [];

const input = document.getElementById("todo-input");
const date = document.querySelector("#due-date");
const submitBtn = document.querySelector("#submit");

// const calendarSvg = new Image();
// calendarSvg.src = Calendar;
// taskInputDiv.appendChild(calendarSvg);

submitBtn.addEventListener("click", () => {
    addTaskToList();
})

input.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        addTaskToList();
    }
});

date.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        addTaskToList();
    }
});