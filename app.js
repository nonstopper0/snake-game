let container = document.querySelector('.game-container');
let boardSize = 20;
let running = false;
let outcome = "";
let runTime = 0;
let direction = 'down'
let snake = [[2, 2], [1, 4]]

document.addEventListener('keydown', keyPressed);

function main() {
    intialize()
    setInterval(() => {
        onLoop()
    },  1000 / 15)
}

function keyPressed(e) {
    e.keyCode === 37 && (direction = "left")
    e.keyCode === 39 && (direction = "right");
    e.keyCode === 38 && (direction = "up");
    e.keyCode === 40 && (direction = "down");
    console.log(direction);
}

// fill document with divs
function intialize() {
    for (let i = 0; i <= boardSize; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);
        for (let j = 0; j <= boardSize; j++) {
            let column = document.createElement('div');
            column.classList.add('column');
            column.id = `${i} ${j}`
            row.appendChild(column)
        }
    }
}

// called from start button
function start() {
    running = true;
}


function onLoop() {
    if (running) {
        runTime += 1;
        if (runTime % 5 === 0) {
            console.log(snake[0], snake[1]);

            for (let i = 0; i < snake.length; i++) {
                let remove = document.getElementById(`${snake[i][0]} ${snake[i][1]}`)
                remove.classList.remove('snake');
            }

            let newHead = snake[1];

            if (direction === "up") {
                newHead[0] = newHead[0] - 1 > -1 ? newHead[0] - 1 : newHead[0] = boardSize
            } else if (direction === "down") {
                newHead[0] = newHead[0] + 1 <= boardSize ? newHead[0] + 1 : newHead[0] = 0
            } else if (direction === "right") {
                newHead[1] = newHead[1] + 1 <= boardSize ? newHead[1] + 1 : newHead[1] = 0
            } else if (direction === "left") {
                newHead[1] = newHead[1] - 1 > -1 ? newHead[1] - 1 : newHead[1] = boardSize
            }

            for (let i = 0; i < snake.length; i++) {
                let fill = document.getElementById(`${snake[i][0]} ${snake[i][1]}`)
                fill.classList.add('snake');
            }
        }
    } 
}

main();
start();