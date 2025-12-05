let sec = 0;
let min = 0;
let interval = null;

function updateDisplay() {
    if (min === 0) {
        document.getElementById('safeTimerDisplay').innerHTML = sec + ' s';
    } else {
        document.getElementById('safeTimerDisplay').innerHTML = min + ' min ' + sec + ' s';
    }
}

function timer(action) {

    if (action === 'start') {
        clearInterval(interval);

        interval = setInterval(() => {
            sec++;
            if (sec === 60) {
                sec = 0;
                min++;
            }
            updateDisplay();
        }, 1000);
    }

    if (action === 'pause') {
        clearInterval(interval);
    }

    if (action === 'reset') {
        clearInterval(interval);
        sec = 0;
        min = 0;
        updateDisplay();
    }
}