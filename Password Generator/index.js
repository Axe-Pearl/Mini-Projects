let mode = document.querySelector("#modeChanger");
let headline = document.getElementById("headline1");
let body = document.querySelector("body");
let line = document.querySelector("#line");
let hr = document.querySelector("hr");
let headline2 = document.querySelector("#headline2");
let length_input_label = document.querySelector("#length-input label");
let length_input = document.querySelector("#length-input input");

mode.addEventListener("change", () => {
  if (mode.checked) {
    headline.style.color = "#000000";
    body.style.backgroundColor = "#ECFDF5";
    line.style.color = "#6B7280";
    hr.style.color = "#E8E7E9";
    headline2.style.color = "#10B981";
    length_input_label.style.color = "#000000";
    length_input.style.color = "#000000";
    length_input.style.backgroundColor = "#FFFFFF";
    
  } else {
    headline2.style.color = "#55F991";
    headline.style.color = "aliceblue";
    body.style.backgroundColor = "#1F2937";
    hr.style.color = "#273549";
    length_input_label.style.color = "#55F991";
    length_input.style.color = "#FFFFFF";
    length_input.style.backgroundColor = "#273549";
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
  let password_length = length_input.value;

  if (password_length <= +length_input.max && password_length >= +length_input.min) { //Converting max, min to Number with +
    let dPassword1 = document.querySelector(".Password1");
    dPassword1.textContent = generatePassword(password_length);
    let dPassword2 = document.querySelector(".Password2");
    dPassword2.textContent = generatePassword(password_length);
  }
  else {
    alert("Password length out of range (6 - 20)");
  }
};

document.getElementById("btn").addEventListener("click", displayPassword);
