class Project {
    constructor (name){
        this.name = name;
        this.tasks = [];
    }

    addTask(task){
        this.tasks.push(task);
        //todo: check if task already exists
    }
    
    removeTask(taskTitle){
        this.tasks = this.tasks.filter(task => task !== taskTitle);
    }
}

export {Project}