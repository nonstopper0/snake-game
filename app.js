let container = document.querySelector('.game-container');
let boardSize = 20
let running = false;
let outcome = "";
let runTime = 0;
let currentPos = [14, 14]

function main() {
    intialize()
    setInterval(() => {
        onLoop()
    },  1000 / 30)
}

// fill document with divs
function intialize() {
    for (let i = 0; i < boardSize; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);
        for (let j = 0; j < boardSize; j++) {
            let column = document.createElement('div');
            column.classList.add('column');
            column.id = `${i} ${j}`
            row.appendChild(column)
        }
    }
}

function start() {
    running = true;
}


function onLoop() {
    if (running) {
        runTime += 1;
        if (runTime % 5 === 0) {

        }
    } 
}

main();