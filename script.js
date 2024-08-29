// Light mode / dark mode toggle
let togglebtn = document.getElementById("toggle");
let body = document.getElementsByTagName('body')[0]; 

togglebtn.addEventListener('click', () => {
    if (body.classList.contains('light')) {
        body.classList.remove('light');
        body.classList.add('dark');
        togglebtn.innerText = "Light Mode";
    } else {
        body.classList.add('light');
        body.classList.remove('dark');
        togglebtn.innerText = "Dark Mode";
    }
});

// stopwatch
let startBtn = document.getElementById('start-btn');
let stopBtn = document.getElementById('stop-btn');
let resetBtn = document.getElementById('reset-btn');
let lapBtn = document.getElementById('lap-btn');
let output = document.getElementById('timer');
let lapReset = document.getElementById('lap-reset');
let lapsContainer = document.getElementById('laps').querySelector('ul');

let hours = 0, minutes = 0, seconds = 0;
let intervalId = null;

function updateDisplay() {
    output.innerHTML = `<div id="dot"></div>
                        <span>${hours.toString().padStart(2, '0')} : </span>
                        <span>${minutes.toString().padStart(2, '0')} : </span>
                        <span>${seconds.toString().padStart(2, '0')}</span>`;
};


startBtn.addEventListener('click', () => {
    if (intervalId === null) {
        intervalId = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
            updateDisplay();
        }, 1000);
    }
});

// Stop the stopwatch
stopBtn.addEventListener('click', () => {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
});

// Reset the stopwatch
resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
    hours = 0;
    minutes = 0;
    seconds = 0;
    updateDisplay();
});

// reset the lap container
lapReset.addEventListener('click',()=>{
    lapsContainer.innerHTML = '';
})


// Add a lap
lapBtn.addEventListener('click', () => {
    if (intervalId !== null) {  // Only add lap if the stopwatch is running
        let lapTime = `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
        let lapItem = document.createElement('li');
        lapItem.innerHTML = `<div class="number">#${lapsContainer.children.length + 1}</div>
                             <span class="timestamp">${lapTime}</span>`;
        lapsContainer.appendChild(lapItem);
    }
});

// Initialize the display
updateDisplay();
