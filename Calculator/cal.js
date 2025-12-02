let valEl = document.getElementById("val")
let resEl = document.getElementById("res")

let calculation = ""; // Internal string for eval

function updateDisplay() {
    // Replace * with ×, / with ÷ for display
    let displayString = calculation.replace(/\*/g, '×').replace(/\//g, '÷');
    valEl.innerText = displayString;
}

function clearer(){
    calculation = "";
    valEl.innerText = "";
    resEl.innerText = "0";
}

function backspace() {
    calculation = calculation.slice(0, -1);
    updateDisplay();
}

function adder(k){
    calculation += k;
    updateDisplay();
}

function compute(isFinal){
    if(!calculation) return;
    try {
        let result = eval(calculation);
        resEl.innerText = result;
        if(isFinal) {
            // Optional: reset calculation to result?
            // calculation = result.toString();
            // updateDisplay();
            // But usually we want to see the history until we type again.
        }
    } catch (e) {
        resEl.innerText = "Error";
    }
}