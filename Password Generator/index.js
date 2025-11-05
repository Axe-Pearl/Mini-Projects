let mode = document.querySelector("#modeChanger");
let headline = document.getElementById("headline1");
let headline2 = document.getElementById("headline2");
let body = document.querySelector("body");
let line = document.querySelector("#line");
let hr = document.querySelector("hr");

mode.addEventListener("change", () => {
  if (mode.checked) {
    body.classList.add("light-mode");
    headline.style.color = "#000000";
    body.style.backgroundColor = "#ECFDF5";
    line.style.color = "#6B7280";
    hr.style.color = "#E8E7E9";
    headline2.style.color = "#10B981";
  } else {
    body.classList.remove("light-mode");
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
  const length = parseInt(document.getElementById("lengthInput").value) || 12;
  document.querySelector(".Password1").textContent = generatePassword(length);
  document.querySelector(".Password2").textContent = generatePassword(length);
};

document.getElementById("btn").addEventListener("click", displayPassword);

// Copy functionality
document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetClass = btn.getAttribute("data-target");
    const text = document.querySelector(`.${targetClass}`).textContent;
    if (text.trim()) {
      navigator.clipboard.writeText(text);
      btn.textContent = "Copied!";
      setTimeout(() => (btn.textContent = "Copy"), 1500);
    }
  });
});
