document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selectors ---
    const passwordOutput = document.getElementById('passwordOutput');
    const copyBtn = document.getElementById('copyBtn');
    const generatePasswordBtn = document.getElementById('generatePasswordBtn');
    const generatePassphraseBtn = document.getElementById('generatePassphraseBtn');
    
    const lengthSlider = document.getElementById('lengthSlider');
    const lengthValue = document.getElementById('lengthValue');
    
    const includeUppercase = document.getElementById('includeUppercase');
    const includeLowercase = document.getElementById('includeLowercase');
    const includeNumbers = document.getElementById('includeNumbers');
    const includeSymbols = document.getElementById('includeSymbols');

    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    const crackTimeText = document.getElementById('crackTimeText');

    const charSets = {
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        numbers: "0123456789",
        symbols: "!@#$%^&*"
    };
    
    // --- Wordlist for Passphrase ---
    const wordList = ["Apple", "Banana", "River", "Mountain", "Ocean", "Forest", "Sunshine", "Moonlight", "Coffee", "Guitar", "Computer", "Journey", "Silence", "Whisper", "Velocity", "Galaxy"];

    // --- Main Functions ---

    function generatePassword() {
        let characterPool = "";
        if (includeUppercase.checked) characterPool += charSets.uppercase;
        if (includeLowercase.checked) characterPool += charSets.lowercase;
        if (includeNumbers.checked) characterPool += charSets.numbers;
        if (includeSymbols.checked) characterPool += charSets.symbols;

        if (characterPool === "") {
            passwordOutput.value = "Select at least one character set!";
            updateSecurityFeedback("");
            return;
        }

        let password = "";
        const length = lengthSlider.value;
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characterPool.length);
            password += characterPool.charAt(randomIndex);
        }

        passwordOutput.value = password;
        updateSecurityFeedback(password);
    }

    function generatePassphrase() {
        let passphrase = [];
        const length = 4; // Generate a 4-word passphrase
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * wordList.length);
            passphrase.push(wordList[randomIndex]);
        }
        const finalPassphrase = passphrase.join('-');
        passwordOutput.value = finalPassphrase;
        updateSecurityFeedback(finalPassphrase);
    }
    
    function updateSecurityFeedback(password) {
        if (!password) {
            strengthBar.style.width = '0%';
            strengthText.textContent = '';
            crackTimeText.textContent = '';
            return;
        }
        
        const result = zxcvbn(password);
        const strength = result.score; // Score from 0 (worst) to 4 (best)
        
        const strengthLevels = {
            0: { width: '10%', color: '#ef4444', text: 'Very Weak' },
            1: { width: '25%', color: '#f97316', text: 'Weak' },
            2: { width: '50%', color: '#facc15', text: 'Moderate' },
            3: { width: '75%', color: '#84cc16', text: 'Strong' },
            4: { width: '100%', color: '#22c55e', text: 'Very Strong' }
        };
        
        strengthBar.style.width = strengthLevels[strength].width;
        strengthBar.style.backgroundColor = strengthLevels[strength].color;
        strengthText.textContent = `Strength: ${strengthLevels[strength].text}`;
        crackTimeText.textContent = `Estimated time to crack: ${result.crack_times_display.offline_slow_hashing_1e4_per_second}`;
    }

    function copyToClipboard() {
        if (passwordOutput.value) {
            navigator.clipboard.writeText(passwordOutput.value)
                .then(() => {
                    copyBtn.textContent = '✅';
                    setTimeout(() => { copyBtn.textContent = '📋'; }, 2000);
                })
                .catch(err => alert("Failed to copy password."));
        }
    }

    // --- Event Listeners ---
    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
        generatePassword(); // Regenerate on slider change
    });
    
    // Regenerate password if any checkbox is changed
    document.querySelectorAll('.checkboxes input').forEach(checkbox => {
        checkbox.addEventListener('change', generatePassword);
    });

    generatePasswordBtn.addEventListener('click', generatePassword);
    generatePassphraseBtn.addEventListener('click', generatePassphrase);
    copyBtn.addEventListener('click', copyToClipboard);

    // Initial generation on page load
    generatePassword();
});