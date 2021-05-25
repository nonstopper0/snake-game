let container = document.querySelector('.game-container');
let boardSize = 20;
let running = false;
let outcome = "";
let runTime = 0;
let direction = 'down'
let snake = [[2, 2], [2, 2], [2, 2]]

document.addEventListener('keydown', keyPressed);

function main() {
    intialize()
    setInterval(() => {
        onLoop()
    },  1000 / 15)
}

function keyPressed(e) {
    e.keyCode === 37 && direction != "right" && (direction = "left")
    e.keyCode === 39 && direction != "left" && (direction = "right");
    e.keyCode === 38 && direction != "down" && (direction = "up");
    e.keyCode === 40 && direction != "up" && (direction = "down");
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

function getNewHeadPos() {
    // for some reason if i call just snake[0] here, It acts as if i am directly mutating snake. 
    // This is basically just doing the exact same variable grab as newHead = snake[0] but instead im writing it in a different way, and somehow it behaves differently. Weirdest JS bug I have ever encountered.
    let newHead = [snake[0][0], snake[0][1]];
    console.log(newHead)
    if (direction === "up") {
        newHead[0] = newHead[0] - 1 > -1 ? newHead[0] - 1 : newHead[0] = boardSize
    } else if (direction === "down") {
        newHead[0] = newHead[0] + 1 <= boardSize ? newHead[0] + 1 : newHead[0] = 0
    } else if (direction === "right") {
        newHead[1] = newHead[1] + 1 <= boardSize ? newHead[1] + 1 : newHead[1] = 0
    } else if (direction === "left") {
        newHead[1] = newHead[1] - 1 > -1 ? newHead[1] - 1 : newHead[1] = boardSize
    }   

    return newHead
}


function onLoop() {
    if (running) {
        runTime += 1;
        if (runTime % 5 === 0) {
            
            // remove old snake array
            for (let i = 0; i < snake.length; i++) {
                let remove = document.getElementById(`${snake[i][0]} ${snake[i][1]}`)
                remove.classList.remove('snake');
            }

            snake.unshift(getNewHeadPos());
            snake.pop();

            //draw new snake array
            for (let i = 0; i < snake.length; i++) {
                let fill = document.getElementById(`${snake[i][0]} ${snake[i][1]}`)
                fill.classList.add('snake');
            }
        }
    } 
}

main();
start();