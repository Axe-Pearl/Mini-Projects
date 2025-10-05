const valEl = document.getElementById("val");
const resEl = document.getElementById("res");

function clearer() {
  valEl.innerText = "";
  resEl.innerText = "";
}

function adder(k) {
  valEl.innerText += k;
  if ("*+-/".includes(k)) compute(false);
}

function compute(final) {
  const exp = valEl.innerText;
  const t = exp.slice(-1);
  const match = exp.match(/([-]?\d+\.?\d*)([+\-*/])(\d+\.?\d*)$/);
  if (!match) return;

  const [, num1, op, num2] = match.map(x => isNaN(x) ? x : parseFloat(x));
  let result = 0;

  switch (op) {
    case '+': result = num1 + num2; break;
    case '-': result = num1 - num2; break;
    case '*': result = num1 * num2; break;
    case '/': result = num1 / num2; break;
  }

  resEl.innerText = `= ${result}`;
  if (!final) valEl.innerText = `${result}${t !== '=' ? t : ''}`;
}

function computeLog() {
  const val = parseFloat(valEl.innerText);
  if (isNaN(val)) {
    resEl.innerText = "Error: Enter a number";
    return;
  }
  const logValue = Math.log10(val);
  resEl.innerText = `log(${val}) = ${logValue.toFixed(4)}`;
  valEl.innerText = logValue;
}
