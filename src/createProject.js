import { Task } from "./TaskComponent.js";
import { Project } from "./ProjectComponent.js"

export { addNewProject, displayAllProjectTasks, projectState, projectStorage };

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
    projectItem.className = "project";
    projectItem.setAttribute("data-id", `${newProject.projectId}`)
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

function displayAllProjectTasks(){
    //console.log(projectState.getProjectId());
    const currentProject = projectStorage.findProject(Number(projectState.getProjectId()));
    const tasks = currentProject.getProjectTasks();
    console.log(tasks);

    const ul = document.querySelector("ul.default");
    ul.innerHTML = '';

    tasks.forEach((task) => {
        const fragment = document.createDocumentFragment();
        //task item wrapper
        const taskItem = document.createElement("li");
        const taskDiv = document.createElement("div");
        taskDiv.className = "task-item";
        taskDiv.setAttribute("data-id", `${task.taskId}`)
        taskItem.appendChild(taskDiv);

        //checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = `task`;
        checkbox.value = `task`;
        checkbox.setAttribute("data-id", `${task.taskId}`);
        fragment.appendChild(checkbox);

        //title
        const titleSpan = document.createElement("span");
        titleSpan.className = "title";
        titleSpan.setAttribute("data-id", `${task.taskId}`);
        titleSpan.textContent = task.title;
        fragment.appendChild(titleSpan);

        //date
        const dateSpan = document.createElement("span");
        dateSpan.className = "date";
        dateSpan.setAttribute("data-id", `${task.taskId}`);
        dateSpan.textContent = task.dueDate;
        fragment.appendChild(dateSpan);

        const descriptionSpan = document.createElement("span");
        descriptionSpan.className = "description";
        descriptionSpan.setAttribute("data-id", `${task.taskId}`);
        descriptionSpan.textContent = task.description;
        fragment.appendChild(descriptionSpan);

        const prioSelect = document.createElement("select");
        prioSelect.className = "priority";
        prioSelect.setAttribute("data-id", `${task.taskId}`);
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
        prioSelect.value = task.priority;
        prioSelect.appendChild(prioHighOption);
        fragment.appendChild(prioSelect);

        //edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit";
        editBtn.setAttribute("data-id", `${task.taskId}`);
        fragment.appendChild(editBtn);

        taskDiv.appendChild(fragment);
        taskItem.appendChild(taskDiv);
        ul.appendChild(taskItem);

    })

}




