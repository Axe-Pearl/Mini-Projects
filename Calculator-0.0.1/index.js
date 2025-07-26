window.onload = function () {
    const display = document.getElementById("display");
    display.focus();
    window.appendToDisplay = function (input) {
        display.value += input;
    };
    document.addEventListener("click", () => display.focus());

 window.toggleTheme = function () {
    const body = document.body;
    const toggleBtn = document.getElementById("toggle");

    const isDark = body.classList.toggle("dark");
    body.classList.toggle("white", !isDark); 
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
};

    window.compute = function () {
        try{
            result = eval(display.value);
            result = Number(result).toPrecision(10);
            display.value = parseFloat(result);
        }
        catch (error) {
            console.error(error);
            display.value = "Error";
        };
    };

    window.clear_dis = function () {
        display.value = '';
    };

    window.dell = function(){
        display.value = display.value.slice(0,-1);
    };

    document.addEventListener("keydown",(e)=>{
        const all =/[0-9+\-*().]/;
        if(!(all.test(e.key))){e.preventDefault();}
        if(e.key==="Enter" || e.key==="="){
            e.preventDefault();
            compute();
        }
        
    });
    document.addEventListener("keydown",(e)=>{
        if(e.key=="Backspace"){
            e.preventDefault();
            dell();
        }
    });

    document.addEventListener("keydown",(e)=>{
        

        if(!(all.test(e))){e.preventDefault();} 
    });
};

