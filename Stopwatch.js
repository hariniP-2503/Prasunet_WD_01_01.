let startTime = 0;
let currentTime = 0;
let lapTimes = [];
let timerInterval = null;

const displayElement = document.getElementById('display');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const lapButton = document.getElementById('lap-button');
const lapTimesElement = document.getElementById('lap-times');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);

function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 100);
    startButton.disabled = true;
    pauseButton.disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    pauseButton.disabled = true;
    startButton.disabled = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    startTime = 0;
    currentTime = 0;
    lapTimes = [];
    displayElement.textContent = '00:00:00';
    lapTimesElement.innerHTML = '';
    startButton.disabled = false;
    pauseButton.disabled = true;
    timerInterval = null;
}

function lapTimer() {
    const lapTime = currentTime;
    lapTimes.push(lapTime);
    const lapTimeElement = document.createElement('li');
    lapTimeElement.textContent = formatTime(lapTime);
    lapTimesElement.appendChild(lapTimeElement);
}

function updateTimer() {
    currentTime = new Date().getTime() - startTime;
    displayElement.textContent = formatTime(currentTime);
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(number, length = 2) {
    return String(number).padStart(length, '0');
}