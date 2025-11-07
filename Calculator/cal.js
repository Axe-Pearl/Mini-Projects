let opEl = document.getElementById("operation");
let resEl = document.getElementById("result");

function clearer() {
  opEl.innerText = "";
  resEl.innerText = "";
}

function adder(k) {
  if (k === '=') {
    compute();
  } else {
    opEl.innerText += k;
  }
}

function compute() {
  try {
    let expression = opEl.innerText;
    let result = eval(expression);
    resEl.innerText = result;
  } catch (e) {
    resEl.innerText = "Error";
  }
}
