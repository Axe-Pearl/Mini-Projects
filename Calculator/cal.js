let valEl = document.getElementById("val")
let resEl = document.getElementById("res")
function clearer() {
    valEl.innerText = ""
    resEl.innerText = ""
}
function backspace() {
    let temp = valEl.innerText
    valEl.innerText = temp.slice(0, -1)
}
function adder(k) {
    valEl.innerText += k
    if (k == '*' || k == '+' || k == '-' || k == '/') {
        compute(0)
    }
}
function compute(is) {
    let temp = valEl.innerText, i
    let t = temp[temp.length - 1];
    for (i = 0; i < temp.length - 1; i++) {
        if ((temp[i] == '*' || temp[i] == '+' || temp[i] == '-' || temp[i] == '/') && i != 0) {
            break;
        }
    }
    if (i != temp.length - 1) {
        let part1 = parseFloat(temp.substring(0, i));
        let part2 = parseFloat(temp.substring(i + 1));
        let k5 = temp[i];
        if (k5 == '+') {
            resEl.innerText = (part1) + (part2);
        } else if (k5 == '-') {
            resEl.innerText = (part1) - (part2);
        } else if (k5 == '*') {
            resEl.innerText = (part1) * (part2);
        } else {
            resEl.innerText = (part1) / (part2);
        }
        let finalRes = resEl.innerText;
        if (is) {
            // Equals clicked: Move expression to history, Result to main
            resEl.innerText = temp;
            valEl.innerText = finalRes;
        } else {
            // Operator clicked: Continue calculation
            resEl.innerText = '= ' + finalRes;
            valEl.innerText = finalRes + t;
        }
    }
}