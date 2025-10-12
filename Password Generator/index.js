// Dark/light mode toggle
const mode = document.querySelector("#modeChanger");
const headline = document.getElementById("headline1");
const body = document.querySelector("body");
const line = document.querySelector("#line");
const hr = document.querySelector("hr");
const headline2 = document.querySelector("#headline2");

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

// Password generation
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

// Display passwords
const displayPassword = () => {
  document.getElementById("Password1").textContent = generatePassword(13);
  document.getElementById("Password2").textContent = generatePassword(12);
};

document.getElementById("btn").addEventListener("click", displayPassword);

// Copy password functionality
document.querySelectorAll(".copyBtn").forEach(button => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-target");
    const password = document.getElementById(targetId).textContent;

    if (password) {
      navigator.clipboard.writeText(password)
        .then(() => {
          button.textContent = "Copied!";
          setTimeout(() => button.textContent = "Copy", 1500);
        });
    } else {
      alert("Generate the password first!");
    }
  });
});
