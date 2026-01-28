const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");

document.getElementById("goRegister").onclick = () => {
    loginBox.classList.add("hidden");
    registerBox.classList.remove("hidden");
};

document.getElementById("goLogin").onclick = () => {
    registerBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
};

document.getElementById("registerBtn").onclick = () => {
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (username.length < 4 || username.length > 12) {
        alert("Username must be between 4 and 12 characters.");
        return;
    }

    if (password.length < 6 || password.length > 16) {
        alert("Password must be between 6 and 16 characters.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    for (let user of users) {
        if (user.username === username) {
            alert("Username already exists. Choose a different one.");
            return;
        }
    }

    users.push({ username, password });
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    alert("Registration successful. Please login.");
    registerBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
};

document.getElementById("loginBtn").onclick = () => {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    let found = false;

    for (let user of users) {
        if (user.username === username && user.password === password) {
            found = true;
            localStorage.setItem("loggedInUser", username);
            window.location.href = "welcome.html";
            break;
        }
    }

    if (!found) {
        alert("Incorrect username or password.");
    }
};
