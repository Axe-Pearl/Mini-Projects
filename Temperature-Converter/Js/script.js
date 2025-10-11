console.log('Welcome to 🌡️ Temperature Converter');

// Animate temperature icon
const tempLoad = () => {
    const fa = document.getElementById('fa');
    fa.innerHTML = "&#xf2cb;";
    fa.style.color = "#ffa41b";

    setTimeout(() => { fa.innerHTML = "&#xf2ca;"; }, 1000);
    setTimeout(() => { fa.innerHTML = "&#xf2c9;"; }, 2000);
    setTimeout(() => { fa.innerHTML = "&#xf2c8;"; }, 3000);
    setTimeout(() => {
        fa.innerHTML = "&#xf2c7;";
        fa.style.color = "#ff5151";
    }, 4000);
};

// Repeat animation
setInterval(() => {
    const fa = document.getElementById('fa');
    fa.style.color = "#ffa41b";
    tempLoad();
}, 5000);

tempLoad();

// Temperature conversion logic
const calculateTemp = () => {
    const numberTemp = document.getElementById('temp').value.trim();
    const tempSelect = document.querySelector('#temp_diff');
    const valueTemp = tempSelect.options[tempSelect.selectedIndex].value;
    const resultDiv = document.getElementById('resultContainer');

    if (numberTemp === "" || isNaN(numberTemp)) {
        resultDiv.innerHTML = "⚠️ Please enter a valid number!";
        return;
    }

    const celToFah = (cel) => (cel * 9/5 + 32).toFixed(2);
    const fahToCel = (fah) => ((fah - 32) * 5/9).toFixed(2);

    let result;
    if (valueTemp === "cel") {
        result = celToFah(numberTemp);
        resultDiv.innerHTML = `= ${result}° Fahrenheit`;
    } else {
        result = fahToCel(numberTemp);
        resultDiv.innerHTML = `= ${result}° Celsius`;
    }

    // Optional input reset
    document.getElementById('temp').value = "";
};
