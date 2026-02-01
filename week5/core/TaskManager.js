import TaskLinkedList from "./TaskLinkedList.js"
import TaskSort from "./TaskSort.js"
import Observer from "./Observer.js"

class TaskManager {
    constructor() {
        if (TaskManager.instance) return TaskManager.instance

        this.originalList = new TaskLinkedList()
        this.events = new Observer()
        this.sortMode = "original"

        this.loadStoredTasks()

        TaskManager.instance = this
    }

    loadStoredTasks() {
        const saved = JSON.parse(localStorage.getItem("taskCollection")) || []
        saved.forEach(task => this.originalList.add(task))
    }

    getOriginalArray() {
        return this.originalList.toArray()
    }

    getSortedByName() {
        return TaskSort.mergeSort(this.getOriginalArray(), TaskSort.compareByName)
    }

    getSortedByDate() {
        return TaskSort.mergeSort(this.getOriginalArray(), TaskSort.compareByDate)
    }

    getTasks() {
        if (this.sortMode === "name") return this.getSortedByName()
        if (this.sortMode === "date") return this.getSortedByDate()
        return this.getOriginalArray()
    }

    addTask(task) {
        this.originalList.add(task)
        this.save()
    }

    removeTask(id) {
        const arr = this.getOriginalArray().filter(t => t.id !== id);
        this.originalList.replaceDataArray(arr);
        this.save();
    }

    completeTask(id) {
        const arr = this.getOriginalArray().map(t =>
            t.id === id ? { ...t, completed: true } : t
        );
        this.originalList.replaceDataArray(arr);
        this.save();
    }

    changeSortMode(mode) {
        this.sortMode = mode
        this.events.notify(this.getTasks())
    }

    save() {
        localStorage.setItem("taskCollection", JSON.stringify(this.getOriginalArray()))
        this.events.notify(this.getTasks())
    }
}

export default TaskManager
