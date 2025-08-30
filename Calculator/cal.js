let valEl = document.getElementById("val");
let resEl = document.getElementById("res");

function clearer() {
    valEl.innerText = "";
    resEl.innerText = "";
}

function adder(k) {
    valEl.innerText += k;
    if (k === '*' || k === '+' || k === '-' || k === '/') {
        compute(0);
    }
}

function compute(is) {
    let temp = valEl.innerText;
    if (!temp) return;

    let i;
    let t = temp[temp.length - 1];

    for (i = 0; i < temp.length - 1; i++) {
        if ((temp[i] === '*' || temp[i] === '+' || temp[i] === '-' || temp[i] === '/') && i !== 0) {
            break;
        }
    }

    if (i !== temp.length - 1) {
        let part1 = parseFloat(temp.substring(0, i));
        let part2 = parseFloat(temp.substring(i + 1));
        let k5 = temp[i];

        let result;
        if (isNaN(part1) || isNaN(part2)) return;

        switch (k5) {
            case '+':
                result = part1 + part2;
                break;
            case '-':
                result = part1 - part2;
                break;
            case '*':
                result = part1 * part2;
                break;
            case '/':
                result = (part2 !== 0) ? part1 / part2 : "Error";
                break;
        }

        resEl.innerText = '= ' + result;

        if (!is && result !== "Error") {
            valEl.innerText = result + t;
        }
    }
}

// New delete (backspace) function
function deleter() {
    valEl.innerText = valEl.innerText.slice(0, -1);
}
