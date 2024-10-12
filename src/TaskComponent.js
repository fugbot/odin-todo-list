class Task {
    constructor (title, description = "", dueDate = null, priority = "normal", completed = false){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
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
