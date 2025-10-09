// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- Element Selection ---
    const hourHand = document.getElementById('hour');
    const minuteHand = document.getElementById('minute');
    const secondHand = document.getElementById('second');
    const digitalTime = document.getElementById('digital-time');
    const dateDisplay = document.getElementById('date-display');
    const timezoneSelector = document.getElementById('timezone-selector');
    const themeToggle = document.getElementById('theme-toggle');

    // --- Theme Toggle Logic ---
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });

    // --- Clock and Date Update Function ---
    function updateClocks() {
        const selectedTimezone = timezoneSelector.value;
        const now = new Date();

        // Use Intl.DateTimeFormat for robust timezone handling
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: selectedTimezone };
        const timeString = new Intl.DateTimeFormat('en-US', timeOptions).format(now);
        const [h, m, s] = timeString.split(':').map(Number);
        
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: selectedTimezone };
        const dateString = new Intl.DateTimeFormat('en-US', dateOptions).format(now);
        
        // Analog Clock Rotation
        const hrotation = 30 * h + m / 2;
        const mrotation = 6 * m;
        const srotation = 6 * s;

        hourHand.style.transform = `rotate(${hrotation}deg)`;
        minuteHand.style.transform = `rotate(${mrotation}deg)`;
        secondHand.style.transform = `rotate(${srotation}deg)`;
        
        // Digital Clock and Date Display
        digitalTime.textContent = timeString;
        dateDisplay.textContent = dateString;
    }

    // Update the clock immediately and then every second
    updateClocks();
    setInterval(updateClocks, 1000);

    // Update clocks when timezone changes
    timezoneSelector.addEventListener('change', updateClocks);


    // --- Stopwatch Logic ---
    const stopwatchDisplay = document.getElementById('stopwatch-display');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');

    let startTime;
    let elapsedTime = 0;
    let stopwatchInterval;

    function formatTime(ms) {
        const date = new Date(ms);
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
        return `${minutes}:${seconds}.${milliseconds}`;
    }

    function startStopwatch() {
        if (!stopwatchInterval) { // Prevent multiple intervals
            startTime = Date.now() - elapsedTime;
            stopwatchInterval = setInterval(() => {
                elapsedTime = Date.now() - startTime;
                stopwatchDisplay.textContent = formatTime(elapsedTime);
            }, 10); // Update every 10ms for smooth milliseconds
        }
    }

    function stopStopwatch() {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
    }

    function resetStopwatch() {
        stopStopwatch();
        elapsedTime = 0;
        stopwatchDisplay.textContent = '00:00:00.000';
    }

    startBtn.addEventListener('click', startStopwatch);
    stopBtn.addEventListener('click', stopStopwatch);
    resetBtn.addEventListener('click', resetStopwatch);
});