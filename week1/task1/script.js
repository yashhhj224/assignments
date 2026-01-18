// Click Event
document.getElementById("clickBtn").addEventListener("click", function () {
    document.getElementById("clickMsg").innerText =
        "Button was clicked successfully!";
});

// Mouse Over Event
const box = document.getElementById("box");

box.addEventListener("mouseover", function () {
    box.style.backgroundColor = "#c6f6d5";
    box.innerText = "Mouse Over!";
});

// Mouse Out Event
box.addEventListener("mouseout", function () {
    box.style.backgroundColor = "#e0f2ff";
    box.innerText = "Hover or Double Click";
});

// Double Click Event
box.addEventListener("dblclick", function () {
    box.style.backgroundColor = "#fed7d7";
    box.innerText = "Double Clicked!";
});

// Keyup Event
document.getElementById("nameInput").addEventListener("keyup", function () {
    document.getElementById("output").innerText =
        "Hello, " + this.value;
});

// Focus Event
document.getElementById("nameInput").addEventListener("focus", function () {
    this.style.borderColor = "#667eea";
});

// Blur Event
document.getElementById("nameInput").addEventListener("blur", function () {
    this.style.borderColor = "#ccc";
});
