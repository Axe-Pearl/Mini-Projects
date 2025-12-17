const expEl = document.getElementById("expression");
const resEl = document.getElementById("result");

function add(value){
  expEl.textContent += value;
}

function clearAll(){
  expEl.textContent = "";
  resEl.textContent = "0";
}

function del(){
  expEl.textContent = expEl.textContent.slice(0, -1);
}

function calculate(){
  try{
    let expr = expEl.textContent
      .replace(/÷/g,'/')
      .replace(/×/g,'*')
      .replace(/sin\(/g,'Math.sin(')
      .replace(/cos\(/g,'Math.cos(')
      .replace(/tan\(/g,'Math.tan(')
      .replace(/ln\(/g,'Math.log(')
      .replace(/log\(/g,'Math.log10(');

    resEl.textContent = eval(expr);
  }catch{
    resEl.textContent = "Error";
  }
}
