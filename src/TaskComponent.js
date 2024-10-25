const taskFactory = () => {
  let taskCounter = 0;

  return function createTask(
    title,
    dueDate = null,
    priority = "low",
    description = "",
    completed = false,
    projectId = 1
  ) {
    if (!title) {
      throw new Error("Title is required");
    }

    taskCounter++;

    return {
      taskId: taskCounter,
      title,
      dueDate,
      priority,
      description,
      completed,
      projectId,

      getTaskData(id) {
        return {
          taskId: this.taskId,
          title: this.title,

        }
      },

      markAsCompleted() {
        this.completed = true;
      },

      updateDueDate(newDate) {
        this.dueDate = newDate;
      },
    };
  };
};

const Task = taskFactory();

export { Task };
