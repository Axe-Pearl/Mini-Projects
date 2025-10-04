setInterval(() => {
    d = new Date();
    htime = d.getHours();
    mtime = d.getMinutes();
    stime = d.getSeconds();
    hrotation = 30*htime + mtime/2;
    mrotation = 6*mtime;
    srotation = 6*stime;

    hour.style.transform = `rotate(${hrotation}deg)`;
    minute.style.transform = `rotate(${mrotation}deg)`;
    second.style.transform = `rotate(${srotation}deg)`;

     // Digital clock
    const hStr = htime.toString().padStart(2, "0");
    const mStr = mtime.toString().padStart(2, "0");
    const sStr = stime.toString().padStart(2, "0");
    digitalClock.textContent = `${hStr}:${mStr}:${sStr}`;
}, 1000);