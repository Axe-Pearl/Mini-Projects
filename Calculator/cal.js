let valEl = document.getElementById("val");
let resEl = document.getElementById("res");
let num1,num2;
let firstlen;
let flag=null;

function clearer(){
    valEl.innerText = ""
    resEl.innerText = ""
    flag=null;
}

function adder(k){
    if((k=='*' || k=='+' || k=='-' || k=='/') && flag==null){

        
        firstlen=valEl.innerText.length;
        if(firstlen==0){
            valEl.innerText="";
            flag=null;
            resEl.innerText="Wrong Input";
            return;
        }
        num1= parseFloat(valEl.innerText.substring(0,firstlen));
        flag=k;
    }
    else if((k=='*' || k=='+' || k=='-' || k=='/') && flag!=null){
            if((valEl.innerText.length-(firstlen + 1))==0){
                valEl.innerText="";
                flag=null;
                resEl.innerText="Wrong Input";
                return;
            }

            num2= parseFloat(valEl.innerText.substring(firstlen + 1, valEl.innerText.length));
            if(flag=='+'){
                valEl.innerText= (num1+num2);
            }   else if(flag=='-'){
                valEl.innerText= (num1-num2);
            }   else if(flag=='*'){
                valEl.innerText= (num1*num2);
            }   else if(flag=='/'){
                valEl.innerText= (num1/num2);
            }
            firstlen=valEl.innerText.length;
            num1 = parseFloat(valEl.innerText); 
            flag=k;

        
    }
    else if(k=='=' && flag!=null){
        if(firstlen==0 || (valEl.innerText.length-(firstlen + 1))==0){
            valEl.innerText="";
                flag=null;
                resEl.innerText="Wrong Input";
                return;
        }


        num2= parseFloat(valEl.innerText.substring(firstlen + 1, valEl.innerText.length));
            if(flag=='+'){
                valEl.innerText= (num1+num2);
                resEl.innerText=(num1+num2);
            }   else if(flag=='-'){
                valEl.innerText= (num1-num2);
                resEl.innerText=(num1-num2);
            }   else if(flag=='*'){
                valEl.innerText= (num1*num2);
                resEl.innerText=(num1*num2);
            }   else if(flag=='/'){
                valEl.innerText= (num1/num2);
                resEl.innerText=(num1/num2);
            }
         
        flag=null;
    }
    else if(k=='=' && flag==null){
        resEl.innerText=valEl.innerText;
    }

    if(k!='=')
        valEl.innerText+=k;
    
    
}

