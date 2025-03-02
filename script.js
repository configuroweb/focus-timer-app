const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const timeInput = document.getElementById("time-input");
const progressCircle = document.querySelector(".progress");
const alertSound = document.getElementById("alert-sound");

let totalTime = 25 * 60; // Default time in seconds
let timeLeft = totalTime;
let timerInterval = null;
let isPaused = true;

// Update the timer display
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = String(minutes).padStart(2, "0");
    secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

// Update the circular progress
function updateProgress() {
    const offset = (1 - timeLeft / totalTime) * 565;
    progressCircle.style.strokeDashoffset = offset;
}

// Start the timer
function startTimer() {
    if (isPaused) {
        isPaused = false;
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
                updateProgress();
            } else {
                clearInterval(timerInterval);
                alertSound.play();
                alert("Time is up!");
            }
        }, 1000);
    }
}

// Pause the timer
function pauseTimer() {
    clearInterval(timerInterval);
    isPaused = true;
}

// Reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    isPaused = true;
    timeLeft = totalTime;
    updateDisplay();
    updateProgress();
}

// Set the timer based on user input
timeInput.addEventListener("input", () => {
    const inputMinutes = parseInt(timeInput.value);
    if (inputMinutes > 0 && inputMinutes <= 60) {
        totalTime = inputMinutes * 60;
        timeLeft = totalTime;
        updateDisplay();
    }
});

// Event listeners for buttons
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Initialize the app
updateDisplay();