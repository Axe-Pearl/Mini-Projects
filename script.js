const hourHand = document.getElementById('hour');
const minHand = document.getElementById('min');
const secHand = document.getElementById('sec');

function updateClock() {
    const now = new Date();

    // Get current time units
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    // Calculate degrees for rotation
    // (Value / Total) * 360 degrees
    const secDeg = ((seconds / 60) * 360);
    const minDeg = ((minutes / 60) * 360) + ((seconds/60)*6); // Add seconds for smooth movement
    const hourDeg = ((hours / 12) * 360) + ((minutes/60)*30); // Add minutes for smooth movement

    // Apply styles
    secHand.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
    minHand.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
    hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
}

// Run the function every 1000 milliseconds (1 second)
setInterval(updateClock, 1000);

// Run it once immediately so the clock doesn't wait 1 second to start
updateClock();