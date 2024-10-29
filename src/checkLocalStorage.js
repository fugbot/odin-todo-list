import {projectStorage} from "./createProject.js"
import {Project} from "./ProjectComponent.js"
import {Task} from "./TaskComponent.js"

export { recreateProjects, storageAvailable, populateStorage };

function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
}

function populateStorage(){
  localStorage.setItem("projects", JSON.stringify(projectStorage));
}

// if (storageAvailable("localStorage")) {
//   // Yippee! We can use localStorage awesomeness
//   console.log("yes local storage");
// } else {
//   // Too bad, no localStorage for us
//   console.log("no local storage");
// }


function recreateProjects(localProjectStorage) {
  const projectList = projectStorage;
  localProjectStorage.projects.forEach((project) => {
    const projectObj = Project(project.title);
    const projectTasks = project.tasks;
    projectTasks.forEach((task) => {
      const taskObj = Task(
        task.title,
        task.dueDate,
        task.priority,
        task.description,
        task.completed,
        task.projectId
      );
      projectObj.addTask(taskObj);
    })
    projectList.addProject(projectObj);
  })
  return projectList;
}
  