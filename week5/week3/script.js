import TaskManager from "../core/TaskManager.js";
import "../core/AppBootstrap.js";

const todayDate = new Date().toISOString().split("T")[0];
document.getElementById("taskDueDate").setAttribute("min", todayDate);

const taskInput = document.getElementById("taskInput");
const taskDueDate = document.getElementById("taskDueDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filterBtn");
const sortButtons = document.querySelectorAll(".sortBtn");
const taskStats = document.getElementById("taskStats");

let currentFilter = "all";
let taskCollection = [];

function filterTasks(arr) {
    if (currentFilter === "all") return arr.filter(t => !t.completed);
    if (currentFilter === "pending") return arr.filter(t => !t.completed);
    if (currentFilter === "completed") return arr.filter(t => t.completed);
}

function generateTaskElement(task) {
    const item = document.createElement("li");
    item.classList.add("taskItem");

    const name = document.createElement("div");
    name.textContent = task.description;
    name.classList.add("taskName");

    const showMore = document.createElement("div");
    showMore.textContent = "Show More";
    showMore.classList.add("showMoreBtn");

    const date = document.createElement("div");
    date.classList.add("taskDueDateText");
    date.textContent = "Due: " + task.dueDate;

    const actions = document.createElement("div");
    actions.classList.add("taskActions");

    if (!task.completed) {
        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done";
        doneBtn.classList.add("doneBtn");
        doneBtn.onclick = () => markTaskDone(task.id);
        actions.append(doneBtn);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.onclick = () => deleteTask(task.id);
    actions.append(deleteBtn);

    item.append(name, date, actions);

    requestAnimationFrame(() => {
        if (name.scrollHeight > name.clientHeight + 1) {
            item.insertBefore(showMore, date);

            showMore.onclick = () => {
                const expanded = name.classList.contains("expandedText");
                name.classList.toggle("expandedText");
                showMore.textContent = expanded ? "Show More" : "Show Less";
            };
        }
    });

    return item;
}

function updateTaskStats() {
    const total = taskCollection.length;
    const completed = taskCollection.filter(t => t.completed).length;
    const pending = total - completed;
    taskStats.textContent = `Pending: ${pending} | Completed: ${completed}`;
}

function renderTasks() {
    taskCollection = window.taskManagerCore.getTasks();
    const filtered = filterTasks(taskCollection);

    taskList.innerHTML = "";

    if (!filtered.length) {
        const empty = document.createElement("p");
        empty.textContent = "No tasks to display.";
        empty.style.textAlign = "center";
        empty.style.color = "#6b7280";
        taskList.append(empty);
        updateTaskStats();
        return;
    }

    filtered.map(generateTaskElement).forEach(e => taskList.append(e));
    updateTaskStats();
}

function setupUI() {
    addTaskBtn.onclick = () => {
        const text = taskInput.value.trim();
        const date = taskDueDate.value;
        if (!text || !date) return;

        const newTask = { id: Date.now(), description: text, dueDate: date, completed: false };
        window.taskManagerCore.addTask(newTask);

        taskInput.value = "";
        taskDueDate.value = "";

        renderTasks();
    };

    filterButtons.forEach(btn => {
        btn.onclick = () => {
            filterButtons.forEach(b => b.classList.remove("activeFilter"));
            btn.classList.add("activeFilter");
            currentFilter = btn.dataset.filter;
            renderTasks();
        };
    });

    sortButtons.forEach(btn => {
        btn.onclick = () => {
            sortButtons.forEach(b => b.classList.remove("activeSort"));
            btn.classList.add("activeSort");
            window.taskManagerCore.changeSortMode(btn.dataset.sort);
            renderTasks();
        };
    });
}

function markTaskDone(id) {
    window.taskManagerCore.completeTask(id);
    renderTasks();
}

function deleteTask(id) {
    window.taskManagerCore.removeTask(id);
    renderTasks();
}

window.addEventListener("DOMContentLoaded", () => {
    window.taskManagerCore.events.subscribe(renderTasks);
    setupUI();
    renderTasks();
});
