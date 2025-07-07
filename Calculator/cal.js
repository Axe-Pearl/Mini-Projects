let valEl = document.getElementById("val")
let resEl = document.getElementById("res")
function clearer(){
    valEl.innerText = ""
    resEl.innerText = ""
}
function adder(k){
    valEl.innerText += k
}

function calculate(expression) {
    expression = expression.replace(/\^/g, '**');
    
    try {
        return new Function('return ' + expression)();
    } catch (e) {
        return 'Error';
    }
}


function compute(is){
    let expr = valEl.innerText;
    
    if (!expr) return;
    
    if (is) {
        let result = calculate(expr);
        resEl.innerText = '= ' + result;
    }
}