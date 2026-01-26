let employeeList = [];
let currentIndex = 0;
const card = document.getElementById("employeeCard");
const detailsPanel = document.getElementById("employeeDetailsPanel");

const loadEmployees = async () => {
    const response = await fetch("data/employees.json");
    const data = await response.json();
    employeeList = data.employees;
    renderEmployee();
};

const renderEmployee = () => {
    const emp = employeeList[currentIndex];
    document.getElementById("employeePhoto").src = emp.photo;
    document.getElementById("employeeName").textContent = emp.name;
    document.getElementById("employeeDesignation").textContent = emp.designation;
    document.getElementById("detailName").textContent = emp.name;
    document.getElementById("detailExperience").textContent = "Experience: " + emp.experience;
    document.getElementById("detailProject").textContent = "Project: " + emp.project;
};

document.getElementById("prevEmployee").onclick = () => {
    currentIndex = currentIndex === 0 ? employeeList.length - 1 : currentIndex - 1;
    renderEmployee();
};

document.getElementById("nextEmployee").onclick = () => {
    currentIndex = currentIndex === employeeList.length - 1 ? 0 : currentIndex + 1;
    renderEmployee();
};

const viewBtn = document.getElementById("viewDetailsBtn");

viewBtn.onclick = () => {
    const isOpen = !detailsPanel.classList.contains("hidden");

    card.classList.toggle("shiftLeft");
    detailsPanel.classList.toggle("hidden");

    if (isOpen) {
        viewBtn.textContent = "View Details";
    } else {
        viewBtn.textContent = "Back";
    }
};

loadEmployees();
