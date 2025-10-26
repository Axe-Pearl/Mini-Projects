function updateClock() {
  const d = new Date();
  const htime = d.getHours();
  const mtime = d.getMinutes();
  const stime = d.getSeconds();
  const ms = d.getMilliseconds();

  // continuous smooth second hand
  const srotation = 6 * (stime + ms / 1000);
  const mrotation = 6 * (mtime + stime / 60);
  const hrotation = 30 * (htime % 12 + mtime / 60);

  const hour = document.getElementById("hour");
  const minute = document.getElementById("minute");
  const second = document.getElementById("second");

  hour.style.transform = `rotate(${hrotation}deg)`;
  minute.style.transform = `rotate(${mrotation}deg)`;
  second.style.transform = `rotate(${srotation}deg)`;

  // Digital clock display
  const digital = document.getElementById("digitalClock");
  const formattedHours = htime.toString().padStart(2, "0");
  const formattedMinutes = mtime.toString().padStart(2, "0");
  const formattedSeconds = stime.toString().padStart(2, "0");

  digital.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// Run every frame for smooth movement
setInterval(updateClock, 50);
