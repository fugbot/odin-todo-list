const projectFactory = () => {
  let projectCounter = 0;

  return function createProject(title, tasks = [], projectId) {
    if (!title) {
      throw new Error("Title is required");
    }

    projectCounter++;

    return {
      projectId: projectCounter,
      title,
      tasks,

      addTask(task) {
        tasks.push(task);
        //todo: check if task already exists
      },

      removeTask(taskTitle) {
        tasks = tasks.filter((task) => task !== taskTitle);
      },
    };
  };
};

const Project = projectFactory();

export { Project };
