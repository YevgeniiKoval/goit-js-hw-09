const startButton = document.querySelector("[data-start]");
const stopButton = document.querySelector("[data-stop]");


startButton.addEventListener("click", changeСolor);
stopButton.addEventListener("click", stopChangeColor);


let timerId = null;


function changeСolor(color) {
    timerId = setInterval(() => {
        const randomColor = getRandomHexColor()
        document.body.style.background = randomColor;
        startButton.setAttribute('disabled', true);
    }, 500)
    
};


function stopChangeColor() {
    startButton.removeAttribute('disabled');
    clearInterval(timerId);
};



function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}