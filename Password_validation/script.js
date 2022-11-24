const email = document.getElementById("email");
const pass = document.getElementById("pass");
const cpass = document.getElementById("cpass");
const submit = document.getElementById("submit");

const c1 = document.getElementById("case1");
const c2 = document.getElementById("case2");
const c3 = document.getElementById("case3");
const c4 = document.getElementById("case4");
const c5 = document.getElementById("case5");

var flag1 = 0;
var flag2 = 0;
var flag3 = 0;
var flag4 = 0;
var flag5 = 0;

function validate() {

    if(pass.value.match(/[0-9]/)) {
        c2.style.color = "green";
        flag1 = 1;
    }
    else {
        c2.style.color = "gray";
    }

    if(pass.value.match(/[a-z]/)) {
        c4.style.color = "green";
        flag2 = 1;
    }
    else {
        c4.style.color = "gray";
    }

    if(pass.value.match(/[A-Z]/)) {
        c3.style.color = "green";
        flag3 = 1;
    }
    else {
        c3.style.color = "gray";
    }

    if(pass.value.match(/[!\@\#\$\%\^\&\*\(\)\<\>\?\{\}\.|,]/)) {
        c1.style.color = "green";
        flag4 = 1;
    }
    else {
        c1.style.color = "gray";
    }

    if(pass.value.length >= 8) {
        c5.style.color = "green";
        flag5 = 1;
    }
    else {
        c5.style.color = "gray";
    }

    if((email.value.length!=0) && (pass.value.length!=0) && (cpass.value.length!=0) && (email.value.match(/[@]/))) {
        if((flag1 == 1) && (flag2 == 1) && (flag3 == 1) && (flag4 == 1) && (flag5 == 1)) {
            submit.removeAttribute ("disabled");
        }        
    }
}

function check() {
    if(pass.value != cpass.value) {
        alert("Password didn't match!");
    }
    else {
        alert("Welcome to the dashboard!");
    }
}