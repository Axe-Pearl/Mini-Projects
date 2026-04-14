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
    fa.style.color = "#ffa41b";
    tempLoad();
}, 5000);

tempLoad();

const calculateTemp = () => {
    const input = document.getElementById('temp').value.trim();
    const resultContainer = document.getElementById('resultContainer');
    const unit = document.getElementById('temp_diff').value;

    // Reset UI
    resultContainer.innerHTML = "";
    resultContainer.style.color = "red";

    // 🔹 Validation helpers
    const showError = (msg) => {
        resultContainer.innerHTML = msg;
    };

    // 🔹 1. Empty check
    if (!input) return showError("⚠️ Please enter a temperature value.");

    // 🔹 2. Numeric check
    if (isNaN(input)) return showError("⚠️ Invalid input. Please enter a numeric value.");

    const temp = parseFloat(input);

    // 🔹 3. Absolute zero validation
    const isBelowAbsoluteZero =
        (unit === "cel" && temp < -273.15) ||
        (unit === "fah" && temp < -459.67);

    if (isBelowAbsoluteZero) {
        return showError(
            unit === "cel"
                ? "⚠️ Temperature cannot be below -273.15°C."
                : "⚠️ Temperature cannot be below -459.67°F."
        );
    }

    // 🔹 Conversion functions
    const convert = {
        cel: (t) => (t * 9 / 5 + 32).toFixed(2) + " °Fahrenheit",
        fah: (t) => ((t - 32) * 5 / 9).toFixed(2) + " °Celsius"
    };

    // 🔹 Final result (clean + scalable)
    const result = convert[unit](temp);

    resultContainer.style.color = "#00b894";
    resultContainer.innerHTML = `= ${result}`;
};



