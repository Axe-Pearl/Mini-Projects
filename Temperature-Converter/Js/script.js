console.log('Welcome to 🌡️ Temperature Converter');

// Animate thermometer icon
const tempLoad = () => {
    let fa = document.getElementById('fa');
    fa.innerHTML = "&#xf2cb";
    fa.style.color = "#ffa41b";

    setTimeout(() => { fa.innerHTML = "&#xf2ca;"; }, 1000);
    setTimeout(() => { fa.innerHTML = "&#xf2c9;"; }, 2000);
    setTimeout(() => { fa.innerHTML = "&#xf2c8;"; }, 3000);
    setTimeout(() => { fa.innerHTML = "&#xf2c7;"; fa.style.color = "#ff5151"; }, 4000);
};
setInterval(tempLoad, 5000);
tempLoad();

// Temperature calculation
const calculateTemp = (event) => {
    event.preventDefault(); // Prevent form submission/refresh

    const numberTemp = parseFloat(document.getElementById('temp').value);
    const unit = document.getElementById('temp_diff').value;
    let resultText = '';

    if (isNaN(numberTemp)) {
        document.getElementById('resultContainer').innerHTML = '⚠️ Please enter a valid number.';
        return;
    }

    let celsius, fahrenheit, kelvin;

    switch (unit) {
        case 'cel':
            fahrenheit = (numberTemp * 9 / 5) + 32;
            kelvin = numberTemp + 273.15;
            resultText = `${numberTemp}°C = ${fahrenheit.toFixed(2)}°F | ${kelvin.toFixed(2)}K`;
            break;
        case 'fah':
            celsius = (numberTemp - 32) * 5 / 9;
            kelvin = celsius + 273.15;
            resultText = `${numberTemp}°F = ${celsius.toFixed(2)}°C | ${kelvin.toFixed(2)}K`;
            break;
        case 'kel':
            celsius = numberTemp - 273.15;
            fahrenheit = (celsius * 9 / 5) + 32;
            resultText = `${numberTemp}K = ${celsius.toFixed(2)}°C | ${fahrenheit.toFixed(2)}°F`;
            break;
        default:
            resultText = 'Invalid selection.';
    }

    document.getElementById('resultContainer').innerHTML = `🌡️ ${resultText}`;
};

// Attach form submit event
document.getElementById('tempCalc').addEventListener('submit', calculateTemp);
