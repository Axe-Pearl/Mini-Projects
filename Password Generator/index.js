let mode = document.querySelector("#modeChanger");
let headline = document.getElementById("headline1");
let body = document.querySelector("body");
let line = document.querySelector("#line");
let hr = document.querySelector("hr");
let headline2 = document.querySelector("#headline2");

mode.addEventListener("change", () => {
  if (mode.checked) {
    headline.style.color = "#000000";
    body.style.backgroundColor = "#ECFDF5"
    line.style.color = "#6B7280"
    hr.style.color = "#E8E7E9"
    headline2.style.color = "#10B981"
    
    
  } else {
    headline2.style.color = "#55F991"
    headline.style.color = "aliceblue";
    body.style.backgroundColor = "#1F2937"
    hr.style.color = "#273549"
  }
});


const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const specialChars = "!@#$%^&*";

const generatePassword = (length) => {
  const allChars = `${lowercaseChars}${uppercaseChars}${numberChars}${specialChars}`;
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars.charAt(randomIndex);
  }
  return password;
};

const displayPassword = () => {
  const lengthInput = document.getElementById("passwordLength");
  let length = parseInt(lengthInput.value, 10);

  // Validation
  if (isNaN(length) || length < 4) {
    length = 4;
  } else if (length > 32) {
    length = 32;
  }

  let dPassword1 = document.querySelector(".Password1");
  let dPassword2 = document.querySelector(".Password2");

  dPassword1.textContent = generatePassword(length);
  dPassword2.textContent = generatePassword(length);
};

document.getElementById("btn").addEventListener("click", displayPassword);

const copyPassword = (selector) => {

  const text = document.querySelector(selector).textContent;

  if (!text) {
    alert("Generate a password first!");
    return;
  }

  navigator.clipboard.writeText(text);

  alert("Password copied!");
};

document
  .getElementById("copyBtn1")
  .addEventListener("click", () => copyPassword(".Password1"));

document
  .getElementById("copyBtn2")
  .addEventListener("click", () => copyPassword(".Password2"));
