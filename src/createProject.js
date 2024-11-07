import { Task } from "./TaskComponent.js";
import { Project } from "./ProjectComponent.js";
import { populateStorage } from "./checkLocalStorage.js";
import pencilSvg from "./images/pencil-outline.svg";
import trashSvg from "./images/trash-can-outline.svg";

export {
  addNewProject,
  displayAllProjects,
  displayAllProjectTasks,
  highlightCurrentProject,
  projectState,
  projectStorage,
  removeProject,
};

const addProjectBtn = document.querySelector("#add-project");

function addNewProject() {
  //place input directly into html, set to hidden
  //if it's shown, do nothing
  //if it's hidden, open
  const projectInput = document.querySelector("#project-name-input");
  const projectName = projectInput.value.trim();

  //create new project object, add project to project array
  const newProject = Project(projectName);
  projectStorage.addProject(newProject);

  //title taken from input
  //create new project component with title
  //add project to list
  const projectList = document.querySelector(".project-list");
  const projectItem = document.createElement("div");
  projectItem.className = "project";
  projectItem.setAttribute("data-id", `${newProject.projectId}`);
  projectItem.textContent = newProject.title;
  projectList.appendChild(projectItem);

  //add trashcan remove
  const removeBtn = document.createElement("button");
  const img = document.createElement("img");
  img.src = trashSvg;
  removeBtn.appendChild(img);
  removeBtn.className = "remove-project";
  removeBtn.setAttribute("data-id", `${newProject.projectId}`);
  projectItem.appendChild(removeBtn);

  //empty input, hide input again
  projectInput.value = "";
  projectInput.style.display = "none";

  populateStorage();
}

const projectState = {
  currentProjectId: null,

  setProjectId(id) {
    this.currentProjectId = id;
  },
  getProjectId() {
    return this.currentProjectId;
  },
};

const projectStorage = {
  projects: new Array(),
  addProject(project) {
    this.projects.push(project);
  },
  findProject(id) {
    return this.projects.find((project) => project.projectId === id);
  },
  getAllProjects() {
    return Array.from(this.projects.values());
  },
};

function displayAllProjects() {
  const projectListContainer = document.querySelector(".project-list");
  projectListContainer.innerHTML = "";

  const projects = projectStorage.getAllProjects();

  projects.forEach((project) => {
    const projectDiv = document.createElement("div");
    projectDiv.className = "project";
    projectDiv.setAttribute("data-id", `${project.projectId}`);
    projectDiv.textContent = `${project.title}`;
    projectListContainer.appendChild(projectDiv);

    if (project.projectId > 1) {
      const removeBtn = document.createElement("button");
      const img = document.createElement("img");
      img.src = trashSvg;
      removeBtn.appendChild(img);
      removeBtn.className = "remove-project";
      removeBtn.setAttribute("data-id", `${project.projectId}`);
      projectDiv.appendChild(removeBtn);
    }
  });
}

function displayAllProjectTasks() {
  const currentProject = projectStorage.findProject(
    Number(projectState.getProjectId()),
  );
  const tasks = currentProject.getProjectTasks();

  const ul = document.querySelector("ul.task-list");
  ul.innerHTML = "";

  tasks.forEach((task) => {
    const fragment = document.createDocumentFragment();
    //task item wrapper
    const taskItem = document.createElement("li");
    const taskDiv = document.createElement("div");
    taskDiv.className = "task-item";
    taskDiv.setAttribute("data-id", `${task.taskId}`);
    if (task.completed) {
      taskDiv.dataset.completed = true;
    }
    taskItem.appendChild(taskDiv);

    //checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = `task`;
    checkbox.value = `task`;
    checkbox.setAttribute("data-id", `${task.taskId}`);
    if (task.completed) {
      checkbox.checked = true;
      taskDiv.dataset.completed = true;
    }
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
    const img = document.createElement("img");
    img.src = pencilSvg;
    editBtn.appendChild(img);
    editBtn.className = "edit";
    editBtn.setAttribute("data-id", `${task.taskId}`);
    fragment.appendChild(editBtn);

    taskDiv.appendChild(fragment);
    taskItem.appendChild(taskDiv);
    ul.appendChild(taskItem);
  });
}

function removeProject() {
  console.log("clicked remove");
  const index = projectStorage.projects.findIndex(
    (x) => x.projectId === Number(projectState.getProjectId()),
  );
  if (window.confirm("Do you really want to delete this project?")) {
    console.log("project deleted");
    projectStorage.projects.splice(index, 1);
  }
  populateStorage();
  displayAllProjects();

  //todo: after deleting project
  //go back to inbox
  //display inbox tasks
}

function highlightCurrentProject() {
  const currentProjectId = Number(projectState.getProjectId());

  const projectList = document.querySelector("div.project-list");
  const projectItemDivs = projectList.children;
  Array.from(projectItemDivs).forEach((projectDiv) => {
    projectDiv.removeAttribute("data-selected");
  });
  const projectDiv = projectList.querySelector(
    `div[data-id="${currentProjectId}"]`,
  );
  projectDiv.dataset.selected = "true";
}
