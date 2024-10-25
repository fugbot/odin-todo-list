import { Task } from "./TaskComponent.js";
import { Project } from "./ProjectComponent.js"

export { addNewProject, projectState, projectStorage };

const addProjectBtn = document.querySelector("#add-project");


function addNewProject() {
    //todo: logic
    
    //place input directly into html, set to hidden
    //if it's shown, do nothing
    //if it's hidden, open
    const projectInput = document.querySelector("#project-name-input")
    const projectName = projectInput.value.trim();
    console.log(projectName)
    
    //create new project object, add project to project array
    const newProject = Project(projectName);
    console.log(newProject);
    projectStorage.addProject(newProject);
    console.log(projectStorage.getAllProjects());

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

const projectState = {
    currentProjectId: null,

    setProjectId(id) {
        this.currentProjectId = id;
    },
    getProjectId(){
        return this.currentProjectId;
    }
}

const projectStorage = {
    projects: new Array(),
    addProject(project) {
        this.projects.push(project);
    },
    findProject(id) {
        return this.projects.find(project => project.projectId === id);
    },
    getAllProjects() {
        return Array.from(this.projects.values());
    }
} 





