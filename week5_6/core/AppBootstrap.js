import TaskManager from "./TaskManager.js"

const manager = new TaskManager()

window.addEventListener("DOMContentLoaded", () => {
    window.taskManagerCore = manager

    manager.events.subscribe(updatedList => {
        localStorage.setItem("taskCollection", JSON.stringify(updatedList))
    })
})
