const display = document.getElementById('display');
const hand = document.getElementById('hand');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 1000;
  let ms = Math.floor(diffInMs);

  let formattedHH = hh.toString().padStart(2, "0");
  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(3, "0");

  return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function () {
    elapsedTime = Date.now() - startTime;
    display.textContent = timeToString(elapsedTime);

    // rotate hand like a stopwatch (one revolution = 60 seconds)
    const seconds = (elapsedTime / 1000) % 60;
    const degrees = (seconds / 60) * 360;
    hand.style.transform = `rotate(${degrees}deg)`;
  }, 10);
  startBtn.disabled = true;
}

function pauseTimer() {
  clearInterval(timerInterval);
  startBtn.disabled = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  display.textContent = "00:00:00.000";
  elapsedTime = 0;
  laps.innerHTML = "";
  hand.style.transform = 'rotate(0deg)';
  startBtn.disabled = false;
}

function addLap() {
  if (elapsedTime === 0) return;
  const li = document.createElement('li');
  li.textContent = timeToString(elapsedTime);
  laps.appendChild(li);
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);