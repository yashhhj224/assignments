let list = document.getElementById("list");
let count = document.getElementById("count");
let title = document.getElementById("title");
let itemNumber = 3;

// Change text
function changeText() {
    title.innerText = "DOM Updated Successfully!";
}

// Change color using classList
function changeColor() {
    title.style.color =
        title.style.color === "crimson" ? "#000" : "crimson";
}

// Hide / Show title
function toggleTitle() {
    title.style.display =
        title.style.display === "none" ? "block" : "none";
}

// Add item
function addItem() {
    let li = document.createElement("li");
    li.innerText = "Item " + itemNumber++;
    list.appendChild(li);
    updateCount();
}

// Remove last item
function removeItem() {
    if (list.lastElementChild) {
        list.lastElementChild.remove();
        updateCount();
    }
}

// Clear all items
function clearList() {
    list.innerHTML = "";
    updateCount();
}

// Update counter
function updateCount() {
    count.innerText = list.children.length;
}
