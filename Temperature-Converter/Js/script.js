console.log('Welcome to 🌡️ Temperature Converter');

// Declare 'fa' globally
const fa = document.getElementById('fa');

const tempLoad = () => {
    fa.innerHTML = "&#xf2cb;";
    fa.style.color = "#ffa41b";

    setTimeout(() => {
        fa.innerHTML = "&#xf2ca;";
        fa.style.color = "#ffa41b";
    }, 1000);

    setTimeout(() => {
        fa.innerHTML = "&#xf2c9;";
    }, 2000);

    setTimeout(() => {
        fa.innerHTML = "&#xf2c8;";
    }, 3000);

    setTimeout(() => {
        fa.innerHTML = "&#xf2c7;";
        fa.style.color = "#ff5151";
    }, 4000);
};

// Call every 5 seconds
setInterval(() => {
    fa.style.color = "#ffa41b";
    tempLoad();
}, 5000);

tempLoad(); // Initial call

const calculateTemp = () => {
    const numberTemp = parseFloat(document.getElementById('temp').value);
    const tempSelected = document.querySelector('#temp_diff');
    const valueTemp = tempSelected.options[tempSelected.selectedIndex].value;

    if (isNaN(numberTemp)) {
        document.getElementById('resultContainer').innerHTML = `❌ Please enter a valid number.`;
        return;
    }

    // Conversion logic
    const celToFah = (cel) => ((cel * 9/5) + 32).toFixed(2);
    const fahToCel = (fah) => ((fah - 32) * 5/9).toFixed(2);

    let result;
    if (valueTemp === "cel") {
        result = celToFah(numberTemp);
        document.getElementById('resultContainer').innerHTML = `= ${result}° Fahrenheit`;
    } else {
        result = fahToCel(numberTemp);
        document.getElementById('resultContainer').innerHTML = `= ${result}° Celsius`;
    }

    setTimeout(() => {
        window.location.reload();
    }, 1500);
};

// 🌙 Dark Mode Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    // Optional: Save preference
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// 🌅 Load Theme on Page Load
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
});
