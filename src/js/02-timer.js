import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';



const input = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const timerEl = document.querySelector(".timer");
const timerDays = document.querySelector("[data-days]");
const timerHours = document.querySelector("[data-hours]");
const timerMinutes = document.querySelector("[data-minutes]");
const timerSeconds = document.querySelector("[data-seconds]");

startButton.addEventListener("click", onButtonClick);
startButton.disabled = true;
let timeoutID = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};


function addLeadingZero(value) {
    return String(value).padStart(2, '0')
};


function onButtonClick() {
  timeoutID = setInterval(() => {
    updateTime()
  }, 1000)
  input.disabled = true
  startButton.disabled = true
};

function updateTime() {
    const currentTime = new Date()
    const selectedTime = new Date(input.value)
    const deltaTime = selectedTime - currentTime

    if (deltaTime < 0) {
        return
    }
    else {
        const { days, hours, minutes, seconds } = convertMs(deltaTime)

    timerDays.textContent = `${days}` 
    timerHours.textContent = `${hours}` 
    timerMinutes.textContent = `${minutes}` 
    timerSeconds.textContent = `${seconds}` 

    };
}