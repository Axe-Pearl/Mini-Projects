let mode = document.querySelector("#modeChanger");
let headline = document.getElementById("headline1");
let body = document.querySelector("body");
let line = document.querySelector("#line");
let hr = document.querySelector("hr");
let headline2 = document.querySelector("#headline2");

mode.addEventListener("change", () => {
  if (mode.checked) {
    headline.style.color = "#000000";
    body.style.backgroundColor = "#ECFDF5";
    line.style.color = "#6B7280";
    hr.style.color = "#E8E7E9";
    headline2.style.color = "#10B981";
  } else {
    headline2.style.color = "#55F991";
    headline.style.color = "aliceblue";
    body.style.backgroundColor = "#1F2937";
    hr.style.color = "#273549";
  }
});

const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const specialChars = "!@#$%^&*";

const generatePassword = (length, useLower, useUpper, useNumbers, useSymbols) => {
  let allChars = "";
  if (useLower) allChars += lowercaseChars;
  if (useUpper) allChars += uppercaseChars;
  if (useNumbers) allChars += numberChars;
  if (useSymbols) allChars += specialChars;

  if (allChars.length === 0) return "Select options!";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars.charAt(randomIndex);
  }
  return password;
};

// Password Strength Detector
const checkStrength = (password) => {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 2) return { text: "Weak", class: "weak" };
  if (strength === 3 || strength === 4) return { text: "Medium", class: "medium" };
  return { text: "Strong", class: "strong" };
};

const displayPassword = () => {
  let length = parseInt(document.getElementById("length").value);
  let useLower = document.getElementById("include-lower").checked;
  let useUpper = document.getElementById("include-upper").checked;
  let useNumbers = document.getElementById("include-numbers").checked;
  let useSymbols = document.getElementById("include-symbols").checked;

  let dPassword1 = document.querySelector(".Password1");
  let dPassword2 = document.querySelector(".Password2");
  let strength1 = document.querySelector(".strength1");
  let strength2 = document.querySelector(".strength2");

  let pass1 = generatePassword(length, useLower, useUpper, useNumbers, useSymbols);
  let pass2 = generatePassword(length, useLower, useUpper, useNumbers, useSymbols);

  dPassword1.textContent = pass1;
  dPassword2.textContent = pass2;

  let s1 = checkStrength(pass1);
  let s2 = checkStrength(pass2);

  strength1.textContent = `Strength: ${s1.text}`;
  strength2.textContent = `Strength: ${s2.text}`;

  strength1.className = `strength strength1 ${s1.class}`;
  strength2.className = `strength strength2 ${s2.class}`;
};

document.getElementById("btn").addEventListener("click", displayPassword);
