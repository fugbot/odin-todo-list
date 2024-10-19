const Task = () => {
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

// function Task() => {
//   title,
//   dueDate = null,
//   priority = "low",
//   description = "",
//   completed = false
//   //add project
//   //add incrementing taskid
// ) {
//   if (!title) {
//     throw new Error("Title is a required fields");
//   }

//   return {
//     title,
//     dueDate,
//     priority,
//     description,
//     completed,

//     // You can also add methods here if needed
//     markAsCompleted() {
//       this.completed = true;
//     },

//     updateDueDate(newDate) {
//       this.dueDate = newDate;
//     },
//   };
// }

export { Task };
