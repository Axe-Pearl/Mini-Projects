setInterval(() => {
    const d = new Date();

    const htime = d.getHours();
    const mtime = d.getMinutes();
    const stime = d.getSeconds();

    const hrotation = 30 * htime + mtime / 2;
    const mrotation = 6 * mtime;
    const srotation = 6 * stime;

    hour.style.transform = `rotate(${hrotation}deg)`;
    minute.style.transform = `rotate(${mrotation}deg)`;
    second.style.transform = `rotate(${srotation}deg)`;

    const hours = String(htime).padStart(2, '0');
    const minutes = String(mtime).padStart(2, '0');
    const seconds = String(stime).padStart(2, '0');
    digitalClock.innerText = `${hours}:${minutes}:${seconds}`;

}, 1000);
