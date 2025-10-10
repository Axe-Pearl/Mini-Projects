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

let dPassword1 = document.querySelector(".Password1");
let dPassword2 = document.querySelector(".Password2");
let copyBtn1 = document.querySelector('#copy-btn1');
let copyBtn2 = document.querySelector('#copy-btn2');


function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied");
  })
}




const displayPassword = () => {
  dPassword1.textContent = generatePassword(13);
  dPassword2.textContent = generatePassword(12);
  copyBtn1.style.display = "flex";
  copyBtn2.style.display = "flex";
  copyBtn1.addEventListener("click", () => copyText(dPassword1.innerText));
  copyBtn2.addEventListener("click", () => copyText(dPassword2.innerText));
};

document.getElementById("btn").addEventListener("click", displayPassword);
