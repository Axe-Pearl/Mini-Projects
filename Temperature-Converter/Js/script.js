console.log('Welcome to 🌡️ Temperature Converter');

const tempLoad = () => {
    let fa = document.getElementById('fa');
    fa.innerHTML = "&#xf2cb";
    fa.style.color = "#ffa41b";

    setTimeout(() => {
        fa.innerHTML = "&#xf2ca;";
        fa.style.color = "#ffa41b";
    }, 1000)

    setTimeout(() => {
        fa.innerHTML = "&#xf2c9;";
    }, 2000)

    setTimeout(() => {
        fa.innerHTML = "&#xf2c8;";
    }, 3000)

    setTimeout(() => {
        fa.innerHTML = "&#xf2c7;";
        fa.style.color = "#ff5151";
    }, 4000)
}

setInterval(() => {
    //define the variable fa in this scope to avoid the error of "fa is not defined"
    const fa =document.getElementById('fa');
    fa.style.color = "#ffa41b";
    tempLoad();
}, 5000);


tempLoad();

const calculateTemp = () => {
    const numberTemp = parseFloat(document.getElementById('temp').value);
    // console.log(numberTemp);

    const tempSelected = document.querySelector('#temp_diff');
    const valeTemp = tempSelected.options[tempSelected.selectedIndex].value;
    // console.log(valeTemp);


    // Convert temperature from Celcius to Fahrenheit
    const celTOfah = (cel) => {
        let fahrenheit = (cel * (9 / 5) + 32);
        //only show 2 decimal places
        return fahrenheit.toFixed(2); 
    }

    // Convert temperature from Fahrenheit to Celsius
    const fahTOcel = (fehr) => {
        let celsius = ((fehr - 32) * 5 / 9);
        //here also show only 2 decimal places
        return celsius.toFixed(2);  
    }

    let result;
    if (valeTemp == "cel") {
        result = celTOfah(numberTemp);
        document.getElementById('resultContainer').innerHTML = `= ${result}°Fahrenheit`;
    } else {
        result = fahTOcel(numberTemp);
        document.getElementById('resultContainer').innerHTML = `= ${result}°Celsius`;
    }

    setTimeout(() => {
        window.location.reload();
    }, 1500);
}

