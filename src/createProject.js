import { Task } from "./TaskComponent.js";
import { Project } from "./ProjectComponent.js"

export { addNewProject };

const addProjectBtn = document.querySelector("#add-project");

export const defaultProject = Project("Inbox");


function addNewProject() {
    //todo: logic
    
    //place input directly into html, set to hidden
    //if it's shown, do nothing
    //if it's hidden, open
    const projectInput = document.querySelector("#project-name-input")
    const projectName = projectInput.value.trim();
    console.log(projectName)
    const newProject = Project(projectName);
    console.log(newProject);

    //title taken from input
    //create new project component with title
    //add project to list
    const projectList = document.querySelector(".project-list");
    const projectItem = document.createElement("div");
    projectItem.textContent = newProject.title;
    projectList.appendChild(projectItem);
    
    //empty input, hide input again
    projectInput.value = "";
    projectInput.style.display = "none";

    // projectNameInput.style.display = projectNameInput.style.display === 'none' ? 'block' : 'none';

    //const newProject = Project(title);
}

