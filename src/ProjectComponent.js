const projectFactory = () => {
  let projectCounter = 0;

  return function createProject(title, tasks = []) {
    if (!title) {
      throw new Error("Title is required");
    }

    projectCounter++;

    return {
      projectId: projectCounter,
      title,
      tasks,

      getProjectTasks(){
        return tasks;
      },

      findTask(id) {
        return tasks.find(task => task.taskId === id);
      },

      addTask(task) {
        tasks.push(task);
        //todo: check if task already exists
      },

      removeTask(taskId) {
        const initialLength = tasks.length;
        tasks = tasks.filter((task) => task.taskId !== taskId);
        return tasks.length !== initialLength; //checks to ensure task was removed
      },
    };
  };
};

const Project = projectFactory();

export { Project };
