let startTime = null;     // chosen start time (Date object)
let startedAt = null;     // when user clicked button

document.getElementById("startBtn").addEventListener("click", () => {
    let input = document.getElementById("timeInput").value.trim().toUpperCase();

    // Match "1 PM", "11 AM"
    let match = input.match(/^(\d{1,2})\s*(AM|PM)$/);
    if (!match) {
        alert("Please enter time like '1 PM' or '4 AM'");
        return;
    }

    let hour = parseInt(match[1]);
    let period = match[2];

    if (hour < 1 || hour > 12) {
        alert("Hour must be between 1 and 12");
        return;
    }

    // Convert to 24-hour format
    if (period === "PM" && hour !== 12) {
        hour += 12;
    }
    if (period === "AM" && hour === 12) {
        hour = 0;
    }

    // Build start time (today, chosen hour, minutes/seconds = 0)
    let now = new Date();
    startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 0, 0, 0);
    startedAt = Date.now(); // remember when we clicked
});

// Update clock hands every 50ms
setInterval(() => {
    if (!startTime || !startedAt) return; // wait until user sets

    let elapsed = Date.now() - startedAt; // real time passed
    let d = new Date(startTime.getTime() + elapsed); // simulated clock time

    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let ms = d.getMilliseconds();

    let hrotation = 30*h + m/2 + s/120;
    let mrotation = 6*m + s/10;
    let srotation = 6*s + (6*ms)/1000;

    document.getElementById("hour").style.transform = `rotate(${hrotation}deg)`;
    document.getElementById("minute").style.transform = `rotate(${mrotation}deg)`;
    document.getElementById("second").style.transform = `rotate(${srotation}deg)`;
}, 50);
