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
    dighour.innerText= `${htime < 10 ? `0${htime}` : htime}${" "}:`;
    digmin.innerText= `${mtime < 10 ? `0${mtime}`: mtime} ${" "}:`;
    digsec.innerText= `${stime < 10 ? `0${stime}` : stime} ${" "}`;
}, 1000);