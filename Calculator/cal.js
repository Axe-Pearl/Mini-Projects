let valEl = document.getElementById("val")
let resEl = document.getElementById("res")
function clearer(){
    valEl.innerText = ""
    resEl.innerText = "" + eval(temp);
}
function adder(k){
    valEl.innerText += k
    if(k=='*' || k=='+' || k=='-' || k=='/'){
        compute(0)
    }
}
function compute(is){
    let temp = valEl.innerText, i
    let t = temp[temp.length-1];
    for(i=0;i<temp.length-1;i++){
        if((temp[i]=='*' || temp[i]=='+' || temp[i]=='-' || temp[i]=='/') && i!=0){
            break;
        }
    }
    if(i!=temp.length-1){
        let part1 = parseFloat(temp.substring(0,i));
        let part2 = parseFloat(temp.substring(i+1));
        let k5 = temp[i];
        if(k5=='+'){
            resEl.innerText = (part1)+(part2);
        }else if(k5=='-'){
            resEl.innerText = (part1)-(part2);
        }else if(k5=='*'){
            resEl.innerText = (part1)*(part2);
        }else{
            resEl.innerText = (part1)/(part2);
        }
        resEl.innerText = '= ' + resEl.innerText
        if(!is){
            valEl.innerText = resEl.innerText + t
            if(valEl.innerText[0] == '='){
                valEl.innerText = valEl.innerText.substring(1)
            }
        } 
    }
}

//Instead of doing everything in compute, we can extract
function parseAndCalculate(expression) {
    let match = expression.match(/^(-?\d+(?:\.\d+)?)([+\-*/])(-?\d+(?:\.\d+)?)$/);
    if(!match) return null;

let part1 = parseFloat(match[1]);
    let operator = match[2];
    let parse2 = parseFloat(match[3]);

switch(operator) {
    case '+' :return part1 + part2;
    case '-': return part1 - part2;
    case '*': return part1 * part2;
    case '/' : return part2 ===0 ? 'Error' : part1 /part2;
}
}
