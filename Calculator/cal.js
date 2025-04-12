class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
        this.history = [];
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.resetScreen = false;
    }

    delete() {
        if (this.currentOperand.length === 1 || 
            (this.currentOperand.length === 2 && this.currentOperand.startsWith('-'))) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.resetScreen) {
            this.currentOperand = '';
            this.resetScreen = false;
        }
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }

        // Add to history
        const historyEntry = `${this.previousOperand} ${this.operation} ${this.currentOperand} = ${computation}`;
        this.history.push(historyEntry);
        
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.resetScreen = true;
    }

    getPercentage() {
        this.currentOperand = parseFloat(this.currentOperand) / 100;
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

// DOM Elements
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-action]');
const equalsButton = document.querySelector('[data-action="equals"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const clearButton = document.querySelector('[data-action="clear"]');
const percentageButton = document.querySelector('[data-action="percentage"]');
const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');
const scientificToggle = document.getElementById('scientific-toggle');
const themeToggle = document.getElementById('theme-toggle');
const historyToggle = document.getElementById('history-toggle');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Event Listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        
        if (action === 'clear') {
            calculator.clear();
        } else if (action === 'delete') {
            calculator.delete();
        } else if (action === 'percentage') {
            calculator.getPercentage();
        } else if (action === 'equals') {
            calculator.compute();
        } else {
            calculator.chooseOperation(button.innerText);
        }
        
        calculator.updateDisplay();
    });
});

// Advanced Features
scientificToggle.addEventListener('click', () => {
    alert('Scientific mode coming soon!');
});

let currentTheme = 0;
const themes = [
    { primary: '#6c5ce7', secondary: '#a29bfe', accent: '#fd79a8', glow: 'rgba(172, 255, 252, 0.8)' },
    { primary: '#00b894', secondary: '#55efc4', accent: '#ffeaa7', glow: 'rgba(85, 239, 196, 0.8)' },
    { primary: '#e84393', secondary: '#fd79a8', accent: '#fdcb6e', glow: 'rgba(253, 121, 168, 0.8)' },
    { primary: '#0984e3', secondary: '#74b9ff', accent: '#a29bfe', glow: 'rgba(116, 185, 255, 0.8)' }
];

themeToggle.addEventListener('click', () => {
    currentTheme = (currentTheme + 1) % themes.length;
    const theme = themes[currentTheme];
    
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--secondary-color', theme.secondary);
    document.documentElement.style.setProperty('--accent-color', theme.accent);
    document.documentElement.style.setProperty('--glow-color', theme.glow);
});

historyToggle.addEventListener('click', () => {
    if (calculator.history.length === 0) {
        alert('No history yet! Perform some calculations first.');
    } else {
        alert('Calculation History:\n\n' + calculator.history.join('\n'));
    }
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if ((e.key >= 0 && e.key <= 9) || e.key === '.') {
        calculator.appendNumber(e.key);
        calculator.updateDisplay();
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '%') {
        let operation;
        switch (e.key) {
            case '*': operation = '×'; break;
            case '/': operation = '÷'; break;
            default: operation = e.key;
        }
        calculator.chooseOperation(operation);
        calculator.updateDisplay();
    } else if (e.key === 'Enter' || e.key === '=') {
        calculator.compute();
        calculator.updateDisplay();
    } else if (e.key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    } else if (e.key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
    }
});