let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const minutes = this.minutes.value;
    this.reset();
    timer(minutes * 60);
});

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + (seconds * 1000);

    displayEndTime(then);
    displayTimeLeft(seconds);
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = (seconds % 60) <= 9 ? '0' + (seconds % 60) : (seconds % 60);
    const display = `${minutes}:${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours() > 12 ? end.getHours() - 12 : end.getHours();
    const minutes = end.getMinutes() <= 9 ? '0' + (end.getMinutes() % 60) : (end.getMinutes() % 60);
    endTime.textContent = `Be back at ${hours}:${minutes}`;
}
