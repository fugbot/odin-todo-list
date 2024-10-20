const taskFactory = () => {
  let taskCounter = 0;

  return function createTask(
    title,
    priority,
    dueDate = null,
    description = "",
    completed = false,
    projectId
  ) {
    if (!title) {
      throw new Error("Title is required");
    }

    taskCounter++;

    return {
      taskId: taskCounter,
      title,
      priority,
      dueDate,
      description,
      completed,
      projectId,

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
