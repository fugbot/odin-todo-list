const taskFactory = () => {
  let taskCounter = 0;

  return function createTask(
    title,
    dueDate = null,
    priority,
    description = "",
    completed = false,
    projectId = "inbox"
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
