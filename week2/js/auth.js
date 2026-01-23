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
        alert("Password must be between 6 and 10 characters.");
        return;
    }

    localStorage.setItem("registeredUser", JSON.stringify({ username, password }));

    alert("Registration successful. Please login.");

    registerBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
};

document.getElementById("loginBtn").onclick = () => {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const stored = JSON.parse(localStorage.getItem("registeredUser"));

    if (!stored) {
        alert("No registered user found. Please register first.");
        return;
    }

    if (username === stored.username && password === stored.password) {
        localStorage.setItem("loggedInUser", username);   // session key
        window.location.href = "welcome.html";
    } else {
        alert("Incorrect username or password.");
    }
};
