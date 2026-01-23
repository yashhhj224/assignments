const todayDate = new Date().toISOString().split("T")[0];
document.getElementById("taskDueDate").setAttribute("min", todayDate);

const taskInput = document.getElementById("taskInput");
const taskDueDate = document.getElementById("taskDueDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filterBtn");
const taskStats = document.getElementById("taskStats");

let taskCollection = JSON.parse(localStorage.getItem("taskCollection")) || [];
let currentFilter = "all";

function createTaskObject(description, dueDate) {
    return {
        id: Date.now(),
        description,
        dueDate,
        completed: false
    };
}

function saveTasks() {
    localStorage.setItem("taskCollection", JSON.stringify(taskCollection));
}

function addTask() {
    const text = taskInput.value.trim();
    const date = taskDueDate.value;
    if (!text) return;

    taskCollection.push(createTaskObject(text, date));
    taskCollection.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    taskInput.value = "";
    taskDueDate.value = "";

    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    taskCollection = taskCollection.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function markTaskDone(id) {
    taskCollection = taskCollection.map(task =>
        task.id === id ? { ...task, completed: true } : task
    );
    saveTasks();
    renderTasks();
}

function filterTasks() {
    if (currentFilter === "pending") return taskCollection.filter(t => !t.completed);
    if (currentFilter === "completed") return taskCollection.filter(t => t.completed);
    return taskCollection.filter(t => !t.completed);
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
    date.textContent = task.dueDate ? "Due: " + task.dueDate : "No due date";

    const actions = document.createElement("div");
    actions.classList.add("taskActions");

    if (!task.completed) {
        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done";
        doneBtn.classList.add("doneBtn");
        doneBtn.addEventListener("click", () => markTaskDone(task.id));
        actions.append(doneBtn);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", () => deleteTask(task.id));
    actions.append(deleteBtn);

    item.append(name, date, actions);

    requestAnimationFrame(() => {
        if (name.scrollHeight > name.clientHeight + 1) {
            item.insertBefore(showMore, date);
            showMore.addEventListener("click", () => {
                const expanded = name.classList.contains("expandedText");
                name.classList.toggle("expandedText");
                showMore.textContent = expanded ? "Show More" : "Show Less";
            });
        }
    });

    return item;
}

function updateTaskStats() {
    const total = taskCollection.length;
    const completed = taskCollection.filter(t => t.completed).length;
    const pending = total - completed;
    taskStats.textContent = "Pending: " + pending + " | Completed: " + completed;
}

function renderTasks() {
    taskList.innerHTML = "";
    const tasksToShow = filterTasks();

    if (tasksToShow.length === 0) {
        const empty = document.createElement("p");
        empty.textContent = "No tasks to display.";
        empty.style.textAlign = "center";
        empty.style.color = "#6b7280";
        taskList.append(empty);
        updateTaskStats();
        return;
    }

    tasksToShow.map(generateTaskElement).forEach(el => taskList.appendChild(el));
    updateTaskStats();
}

addTaskBtn.addEventListener("click", addTask);

filterButtons.forEach(btn =>
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("activeFilter"));
        btn.classList.add("activeFilter");
        currentFilter = btn.dataset.filter;
        renderTasks();
    })
);

renderTasks();
