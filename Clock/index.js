setInterval(() => {
    let d = new Date();
    let htime = d.getHours();
    let mtime = d.getMinutes();
    let stime = d.getSeconds();
    let hrotation = 30*htime + mtime/2;
    let mrotation = 6*mtime;
    let srotation = 6*stime;

    document.getElementById("hour").style.transform = `rotate(${hrotation}deg)`;
    document.getElementById("minute").style.transform = `rotate(${mrotation}deg)`;
    document.getElementById("second").style.transform = `rotate(${srotation}deg)`;

    // Day and date
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const day = days[d.getDay()];
    const date = d.getDate(); // You can also add month/year if needed

    document.getElementById("day").innerText = day;
    document.getElementById("date").innerText = date;
}, 1000);
