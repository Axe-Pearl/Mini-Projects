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
const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[\W_]/.test(password)) strength++;

    if (strength <= 2) return { text: "Weak", color: "red" };
    else if (strength === 3 || strength === 4) return { text: "Medium", color: "orange" };
    else return { text: "Strong", color: "green" };
};


const displayPassword = () => {
  let dPassword1 = document.querySelector(".Password1");
  let dPassword2 = document.querySelector(".Password2");

  const pwd1 = generatePassword(13);
  const pwd2 = generatePassword(12);

  dPassword1.textContent = pwd1;
  dPassword2.textContent = pwd2;

  // Display strength
  const strength1 = getPasswordStrength(pwd1);
  const strength2 = getPasswordStrength(pwd2);

  const s1 = document.querySelector(".strength1");
  const s2 = document.querySelector(".strength2");

  s1.textContent = `Strength: ${strength1.text}`;
  s1.style.color = strength1.color;

  s2.textContent = `Strength: ${strength2.text}`;
  s2.style.color = strength2.color;
};

document.getElementById("btn").addEventListener("click", displayPassword);
