class Task {
    constructor (title, dueDate = null, description = "", priority = "normal", completed = false){
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        this.completed = completed;
    }

    toggleComplete(){
        this.completed = !this.completed;
    }
    
    updatePriority(newPriority){
        this.priority = newPriority;
    }
}

export {Task}
