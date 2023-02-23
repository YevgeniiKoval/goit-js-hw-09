const startButton = document.querySelector("[data-start]");
const stopButton = document.querySelector("[data-stop]");


startButton.addEventListener("click", changeСolor);
stopButton.addEventListener("click", stopChangeColor);


let timerId = null;
stopButton.disabled = true;

function changeСolor(color) {
    timerId = setInterval(() => {
        const randomColor = getRandomHexColor()
        document.body.style.background = randomColor;
        startButton.disabled = true;
        stopButton.disabled = false;
        
    }, 500)
    
};


function stopChangeColor() {
    startButton.disabled = false;
    stopButton.disabled = true;
    clearInterval(timerId);
};



function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}