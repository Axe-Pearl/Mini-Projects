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
  let lengthInput = document.querySelector("#passwordLength");
  let length = parseInt(lengthInput.value) || 12;
  
  if (length < 1) {
    alert("Password length must be at least 1");
    lengthInput.value = 12;
    length = 12;
  }
  if (length > 128) {
    alert("Password length cannot exceed 128 characters");
    lengthInput.value = 128;
    length = 128;
  }
  
  let dPassword1 = document.querySelector(".Password1");
  dPassword1.textContent = generatePassword(length);
  let dPassword2 = document.querySelector(".Password2");
  dPassword2.textContent = generatePassword(length);
};

document.getElementById("btn").addEventListener("click", displayPassword);
