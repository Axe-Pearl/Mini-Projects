/* ==========================================================
   Meridian clock — dial construction + time-keeping
   ========================================================== */

(function buildDial() {
  const ticksEl = document.getElementById('ticks');
  const numeralsEl = document.getElementById('numerals');
  const roman = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];

  // 60 minute ticks, every 5th marked as an hour tick
  const tickFrag = document.createDocumentFragment();
  for (let i = 0; i < 60; i++) {
    const tick = document.createElement('div');
    tick.className = 'tick' + (i % 5 === 0 ? ' hour' : '');
    tick.style.transform = `rotate(${i * 6}deg)`;
    tickFrag.appendChild(tick);
  }
  ticksEl.appendChild(tickFrag);

  // 12 roman numerals, evenly spaced
  const numFrag = document.createDocumentFragment();
  roman.forEach((label, i) => {
    const num = document.createElement('div');
    num.className = 'numeral';
    num.style.setProperty('--ang', `${i * 30}deg`);
    num.textContent = label;
    numFrag.appendChild(num);
  });
  numeralsEl.appendChild(numFrag);
})();

(function runClock() {
  const hourHand = document.getElementById('hourHand');
  const minuteHand = document.getElementById('minuteHand');
  const secondHand = document.getElementById('secondHand');
  const digitalTime = document.getElementById('digitalTime');
  const digitalDate = document.getElementById('digitalDate');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    weekday: 'short', year: 'numeric', month: 'short', day: '2-digit'
  });

  function paintDigits(now) {
    digitalTime.textContent = now.toLocaleTimeString(undefined, { hour12: false });
    digitalDate.textContent = dateFormatter.format(now);
  }

  function tick() {
    const now = new Date();

    const ms = now.getMilliseconds();
    const seconds = now.getSeconds() + (prefersReducedMotion ? 0 : ms / 1000);
    const minutes = now.getMinutes() + seconds / 60;
    const hours = (now.getHours() % 12) + minutes / 60;

    hourHand.style.transform = `rotate(${hours * 30}deg)`;
    minuteHand.style.transform = `rotate(${minutes * 6}deg)`;
    secondHand.style.transform = `translateY(12%) rotate(${seconds * 6}deg)`;

    paintDigits(now);

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
