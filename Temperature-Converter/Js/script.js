function convertTemp(saveHistory = false) {
    const input = parseFloat(document.getElementById('inputValue').value);
    const from = document.getElementById('fromUnit').value;
    const to = document.getElementById('toUnit').value;
    const resultField = document.getElementById('result');
  
    if (isNaN(input)) {
      resultField.textContent = "Please enter a valid number.";
      return;
    }
  
    // Convert everything via Kelvin
    const toKelvin = {
      C: (v) => v + 273.15,
      F: (v) => (v - 32) * 5/9 + 273.15,
      K: (v) => v,
      R: (v) => v * 5/9
    };
  
    const fromKelvin = {
      C: (v) => v - 273.15,
      F: (v) => (v - 273.15) * 9/5 + 32,
      K: (v) => v,
      R: (v) => v * 9/5
    };
  
    const kelvinValue = toKelvin[from](input);
    const finalValue = fromKelvin[to](kelvinValue);
  
    resultField.textContent = `${input}°${from} = ${finalValue.toFixed(2)}°${to}`;
  
    // Save to history only when button pressed
    if (saveHistory) {
      saveToHistory(input, from, to, finalValue);
    }
  }
  
  // Real-time preview only (no save)
  document.getElementById('inputValue').addEventListener('input', () => convertTemp(false));
  document.getElementById('fromUnit').addEventListener('change', () => convertTemp(false));
  document.getElementById('toUnit').addEventListener('change', () => convertTemp(false));
  
  // Convert button explicitly saves history
  document.querySelector('button[onclick="convertTemp()"]').onclick = () => convertTemp(true);
  
  // Swap button
  document.getElementById('swapBtn').addEventListener('click', () => {
    const fromSelect = document.getElementById('fromUnit');
    const toSelect = document.getElementById('toUnit');
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    convertTemp(false);
  });
  
  // History
  function saveToHistory(input, from, to, output) {
    const record = {
      input: `${input}°${from}`,
      output: `${output.toFixed(2)}°${to}`,
      time: new Date().toLocaleString()
    };
  
    const history = JSON.parse(localStorage.getItem('tempHistory')) || [];
    history.unshift(record);
    localStorage.setItem('tempHistory', JSON.stringify(history));
    renderHistory();
  }
  
  function renderHistory() {
    const historyList = document.getElementById('historyList');
    const history = JSON.parse(localStorage.getItem('tempHistory')) || [];
    historyList.innerHTML = '';
  
    if (history.length === 0) {
      historyList.innerHTML = '<li>No history yet</li>';
      return;
    }
  
    history.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.time}: ${item.input} → ${item.output}`;
      historyList.appendChild(li);
    });
  }
  
  function clearHistory() {
    localStorage.removeItem('tempHistory');
    renderHistory();
  }
  
  document.getElementById('clearBtn').addEventListener('click', clearHistory);
  window.onload = renderHistory;
  