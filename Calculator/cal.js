/*
  Updates and improvements to the calculator:

  1. History navigation:
     - Added two buttons to move backward and forward through previous calculation results.
     - Users can easily review past entries.

  2. Delete functionality:
     - Added a DEL button to remove the last character from the display, improving usability.

  3. Memory functions:
     - Added memory buttons (M+, M–, MRC) to store a number, add/subtract it with the current display value.
     - Memory can be cleared by double-clicking the MRC button for quick reset.

  4. User interface improvements:
     - Updated several button texts to be more user-friendly and intuitive (e.g., "+", "-", "÷", "%").
     - Combined input and result displays into a single display, similar to a real calculator.
     - Added percentage (%) computation support.
     - Enhanced error handling: invalid operations show visual error (text turns red).

  Overall, these changes improve usability, functionality, and make the calculator more intuitive and feature-complete.
*/


let valEl = document.getElementById("val")

let history = ['']
let current_history_i = 0

let is_error = false
function clearer(){
    valEl.textContent = ""
}
function adder(k){
    if (is_error) {
        is_error = false
        valEl.style.removeProperty('color')
        valEl.textContent = k
    }
    else {
        valEl.textContent += k
    }

    history.push(valEl.textContent)
    current_history_i = history.length - 1

    if(k=='x' || k=='+' || k=='-' || k=='÷' || k=='%'){
        compute(0)
    }
}


// add a new percent to compute function and improve some error handling 
function compute(is){
    let temp = valEl.textContent, i
    let t = temp[temp.length-1];
    for(i=0;i<temp.length-1;i++){
        if((temp[i]=='x' || temp[i]=='+' || temp[i]=='-' || temp[i]=='÷' || temp[i]=='%') && i!=0){
            break;
        }
    }
    if(i!=temp.length-1){
        let part1 = parseFloat(temp.substring(0,i));
        let part2 = parseFloat(temp.substring(i+1));
        let k5 = temp[i];
        if(k5=='+'){
            valEl.textContent = (part1)+(part2);
        }else if(k5=='-'){
            valEl.textContent = (part1)-(part2);
        }else if(k5=='x'){
            valEl.textContent = (part1)*(part2);
        }else if(k5== '÷'){
            valEl.textContent = (part1)/(part2);
        }
        else {
            valEl.textContent = ((part1)*(part2)) / 100
        }
        valEl.textContent = valEl.textContent
        
        if (valEl.textContent !== 'NaN') {
            history.push(valEl.textContent)
            current_history_i = history.length - 1
        }
        else {
            throw_error('NaN')
        }
        
        
        if(!is){

            if (valEl.textContent !== 'NaN') {
                valEl.textContent = valEl.textContent + t
            }
            
            if(valEl.textContent[0] == '='){
                valEl.textContent = valEl.textContent.substring(1)
            }
        } 
    }
}


function remover() {

    if (is_error) {
        valEl.textContent = ''
        valEl.style.removeProperty('color')
        return
    }

    const update_value = valEl.textContent.substring(0, valEl.textContent.length - 1); 

    valEl.textContent = update_value
    
}

function history_back() {

    if (current_history_i === 0) return valEl.textContent = history[0];
    
    valEl.textContent = history[current_history_i]
    
    --current_history_i

}

function history_forward() {

    if (current_history_i + 1 === history.length) return;

    ++current_history_i
    valEl.textContent = history[current_history_i]

}

let memory;
let click_count = 0
let time_stamp_clear_count

function memory_save_remove() {

    if (valEl.textContent.startsWith('NaN') || /[x+\-÷]/.test(valEl.textContent)) return throw_error('Error')

    if (click_count >= 2) {
        memory = ''
        click_count = 0
        
        if (time_stamp_clear_count) clearTimeout(time_stamp_clear_count)
    }
    else {
        memory = valEl.textContent
        ++click_count

        valEl.textContent = ''


        time_stamp_clear_count = setTimeout(() => {
            click_count = 0
        }, 500);
    }

}

function memory_compute(mode) {

    if (valEl.textContent.startsWith('NaN') || !valEl.textContent || !memory || /[x+\-÷]/.test(valEl.textContent)) return throw_error('Error');


    if (mode === '+') {
        valEl.textContent = `${Number(valEl.textContent) + Number(memory)}`
    }
    else {
        valEl.textContent = `${Number(valEl.textContent) - Number(memory)}`
    }

}

// throw and display error with message ez

function throw_error(msg) {

    valEl.textContent = msg;
    valEl.style.color = '#cb1616'
    is_error = true;
    history = ['']
    current_history_i = 0

}