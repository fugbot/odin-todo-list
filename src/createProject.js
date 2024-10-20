import { Task } from "./TaskComponent.js";
import { Project } from "./ProjectComponent.js"

export { addNewProject };

const addProjectBtn = document.querySelector("#add-project");


function addNewProject() {
    //todo: logic
    
    //place input directly into html, set to hidden
    //if it's shown, do nothing
    //if it's hidden, open
    
    const projectList = document.querySelector(".projects");

    const projectNameInput = document.querySelector("#project-name-input");
    projectNameInput.style.display = projectNameInput.style.display === 'none' ? 'block' : 'none';

    //const newProject = Project(title);
}