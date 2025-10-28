let valEl = document.getElementById("val");
let resEl = document.getElementById("res");

const OPERATORS = ['*', '+', '-', '/'];

function toDisplayChar(char) {
    if (char === '*') return '×';
    if (char === '/') return '÷';
    return char;
}

function isOperatorChar(char = '') {
    return OPERATORS.includes(char) || char === '×' || char === '÷';
}

function sanitizeExpression(expression) {
    return expression.replace(/×/g, '*').replace(/÷/g, '/');
}

function formatResult(value) {
    if (!Number.isFinite(value)) {
        return 'Error';
    }
    const rounded = Math.round(value * 100000000) / 100000000;
    return Number.isInteger(rounded) ? rounded.toString() : rounded.toString();
}

function clearer() {
    valEl.innerText = '';
    resEl.innerText = '0';
}

function backspace() {
    const current = valEl.innerText;
    if (!current) {
        return;
    }

    valEl.innerText = current.slice(0, -1);

    if (valEl.innerText === '') {
        resEl.innerText = '0';
        return;
    }

    compute(false);
}

function adder(input) {
    const displayChar = toDisplayChar(input);
    const lastChar = valEl.innerText[valEl.innerText.length - 1];

    if (isOperatorChar(input) && valEl.innerText === '' && input !== '-') {
        return;
    }

    if (isOperatorChar(input) && isOperatorChar(lastChar)) {
        return;
    }

    valEl.innerText += displayChar;

    if (OPERATORS.includes(input)) {
        compute(false);
    }
}

function compute(isFinalCalculation) {
    let expression = sanitizeExpression(valEl.innerText);

    if (!expression) {
        resEl.innerText = '0';
        return;
    }

    const lastChar = expression[expression.length - 1];
    let trailingOperator = '';

    if (OPERATORS.includes(lastChar)) {
        trailingOperator = lastChar;
        expression = expression.slice(0, -1);
    }

    if (!expression) {
        resEl.innerText = '0';
        if (!isFinalCalculation && trailingOperator) {
            valEl.innerText = toDisplayChar(trailingOperator);
        }
        return;
    }

    let operatorIndex = -1;
    for (let idx = 1; idx < expression.length; idx++) {
        if (OPERATORS.includes(expression[idx])) {
            operatorIndex = idx;
            break;
        }
    }

    if (operatorIndex === -1) {
        resEl.innerText = expression;
        if (isFinalCalculation) {
            valEl.innerText = expression;
        } else if (trailingOperator) {
            valEl.innerText = expression + toDisplayChar(trailingOperator);
        }
        return;
    }

    const part1 = parseFloat(expression.slice(0, operatorIndex));
    const part2 = parseFloat(expression.slice(operatorIndex + 1));

    if (Number.isNaN(part1) || Number.isNaN(part2)) {
        return;
    }

    const operator = expression[operatorIndex];
    let result;

    if (operator === '+') {
        result = part1 + part2;
    } else if (operator === '-') {
        result = part1 - part2;
    } else if (operator === '*') {
        result = part1 * part2;
    } else {
        if (part2 === 0) {
            resEl.innerText = 'Error';
            if (isFinalCalculation) {
                valEl.innerText = '';
            }
            return;
        }
        result = part1 / part2;
    }

    const formattedResult = formatResult(result);
    resEl.innerText = formattedResult;

    if (formattedResult === 'Error') {
        if (isFinalCalculation) {
            valEl.innerText = '';
        }
        return;
    }

    if (isFinalCalculation) {
        valEl.innerText = formattedResult;
    } else {
        valEl.innerText = formattedResult + (trailingOperator ? toDisplayChar(trailingOperator) : '');
    }
}