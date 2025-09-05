let valEl = document.getElementById("val");
let resEl = document.getElementById("res");
let historyEl = document.getElementById("history");
let historyPanel = document.getElementById("history-panel");
let historyToggle = document.getElementById("history-toggle");
let themeToggle = document.getElementById("theme-toggle");

// Load history from localStorage
let calcHistory = JSON.parse(localStorage.getItem("calcHistory") || "[]");
updateHistory();

// ------------------ Calculator Functions ------------------

// Clear display
function clearer() {
    valEl.value = "";
    resEl.innerText = "";
}

// Add number/operator
function adder(k) {
    let lastChar = valEl.value.slice(-1);
    if ("+-*/".includes(k) && "+-*/".includes(lastChar)) {
        valEl.value = valEl.value.slice(0, -1) + k;
    } else {
        valEl.value += k;
    }
}

// Backspace
function backspace() {
    valEl.value = valEl.value.slice(0, -1);
}

// Compute expression
function computeFinal() {
    try {
        let expr = valEl.value;
        if (!/^[0-9+\-*/.() ]+$/.test(expr)) {
            resEl.innerText = "Invalid Input";
            return;
        }
        let result = eval(expr);
        if (result === Infinity || result === -Infinity || isNaN(result)) {
            resEl.innerText = "Error";
        } else {
            resEl.innerText = "= " + result;
            saveHistory(expr + " = " + result);
        }
    } catch (e) {
        resEl.innerText = "Error";
    }
}

// ------------------ History Functions ------------------

// Save calculation to history
function saveHistory(entry) {
    calcHistory.unshift(entry); // latest first
    if (calcHistory.length > 20) calcHistory.pop(); // keep last 20
    localStorage.setItem("calcHistory", JSON.stringify(calcHistory));
    updateHistory();
}

// Update history panel
function updateHistory() {
    historyEl.innerHTML = "";
    calcHistory.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        li.onclick = () => {
            valEl.value = item.split('=')[0].trim();
            resEl.innerText = "";
        };
        historyEl.appendChild(li);
    });
}

// Toggle history panel
historyToggle.addEventListener("click", () => {
    if (historyPanel.style.right === "0px") {
        historyPanel.style.right = "-250px";
    } else {
        historyPanel.style.right = "0px";
    }
});

// ------------------ Theme Toggle ------------------
themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
});

// ------------------ Optional: Keyboard support ------------------
document.addEventListener("keydown", (e) => {
    if ((e.key >= '0' && e.key <= '9') || "+-*/.".includes(e.key)) {
        adder(e.key);
    } else if (e.key === "Enter") {
        computeFinal();
    } else if (e.key === "Backspace") {
        backspace();
    } else if (e.key === "Escape") {
        clearer();
    }
});
